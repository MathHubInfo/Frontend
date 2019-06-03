// tslint:disable:export-name

import App, { AppProps, Container, DefaultAppIProps, NextAppContext } from "next/app";
import Router from "next/router";
import React from "react";

import MHAppContext, { IMHAppContext } from "../src/lib/components/MHAppContext";
import MHLink from "../src/lib/components/MHLink";

import intl from "react-intl-universal";
import getContext from "../src/context";
import CompilationPhase from "../src/context/CompilationPhase";
import { IMathHubRuntimeConfig } from "../src/types/config";

import LayoutRoutingIndicator from "../src/theming/Layout/LayoutRoutingIndicator";


type IMHAppProps = IMHAppOwnProps & DefaultAppIProps & AppProps;

const knownLanguages = ["en", "de"];

interface IMHAppOwnProps {
    clientNeedsProps: boolean;
    initialRuntimeConfig?: IMathHubRuntimeConfig;
}

export default class MHApp extends App<IMHAppOwnProps> {
    static async getInitialProps(context: NextAppContext): Promise<IMHAppProps> {
        const { Component, router } = context;
        const { config: { compilationPhase } } = getContext();

        // Check if we are running inside of an export
        const isExport = (!process.browser && compilationPhase === CompilationPhase.EXPORT);

        const [
            { pageProps, clientNeedsProps },
            initialRuntimeConfig,
        ] = await Promise.all([
            MHApp.getPageProps(isExport, context),
            MHApp.getRuntimeConfig(isExport, context),
        ]);

        return { Component, router, pageProps, clientNeedsProps, initialRuntimeConfig };
    }

    /**
     * Loads the properties for the current page, if any
     * @param isExport Running during a `next export`
     */
    static async getPageProps(
        isExport: boolean,
        { Component, ctx }: NextAppContext,
    ): Promise<{ pageProps: {}; clientNeedsProps: boolean }> {
        let pageProps = {};
        let clientNeedsProps = false;

        if (isExport)
            clientNeedsProps = !!Component.getInitialProps;
        else if (Component.getInitialProps)
            pageProps = await Component.getInitialProps(ctx);

        return { pageProps, clientNeedsProps };
    }

    static async getRuntimeConfig(
        isExport: boolean,
        _: NextAppContext,
    ) {
        if (!process.browser && !isExport)
            return MHApp.loadRuntimeConfig();

        return undefined;
    }

    /**
     * Loads the runtime configuration url
     */
    static async loadRuntimeConfig(): Promise<IMathHubRuntimeConfig | undefined> {
        const { httpClient, config: { configURL } } = getContext();
        if (configURL)
            return httpClient.getIfOK(configURL, { resolve: true, ignoreError: true });

        return undefined;
    }

    state: IMHAppContext & { initialPropsFix: boolean } = {
        routing: this.props.clientNeedsProps,
        initialPropsFix: this.props.clientNeedsProps,
        runtimeConfig: this.props.initialRuntimeConfig,
        activeLanguage: "en",
        changeLanguage: this.loadLocales.bind(this),
    };

    async componentDidMount() {
        Router.events.on("routeChangeStart", this.handleRoutingStart);
        Router.events.on("routeChangeComplete", this.handleRoutingEnd);
        Router.events.on("routeChangeError", this.handleRoutingEnd);

        // load the language file
        this.state.activeLanguage === undefined ?
            this.loadLocales("en") : await this.loadLocales(this.state.activeLanguage);

        // if we do not have the runtime configuration, start loading it
        if (!this.props.initialRuntimeConfig)
            this.setState({ runtimeConfig: await MHApp.loadRuntimeConfig() });

        // if we still need the properties of the client, we need to reload
        if (this.props.clientNeedsProps) {
            await Router.replace(MHLink.rewrite(Router.pathname + location.search));
            this.setState({ initialPropsFix: false });
            this.handleRoutingEnd();

            return;
        }
    }

    componentWillUnmount() {
        Router.events.off("routeChangeStart", this.handleRoutingStart);
        Router.events.off("routeChangeComplete", this.handleRoutingEnd);
        Router.events.off("routeChangeError", this.handleRoutingEnd);
    }

    async loadLocales(currentLocale: string) {
        const res = await import(`../src/locales/${currentLocale}.json`);
        // init method will load CLDR locale data according to currentLocale
        await intl.init({
            currentLocale,
            locales: {
                [currentLocale]: res,
            },
        });
        this.setState({activeLanguage: currentLocale});
    }

    render() {
        const { Component, pageProps } = this.props;
        const { activeLanguage, changeLanguage, routing, initialPropsFix, runtimeConfig } = this.state;

        return (
            <Container>
                <MHAppContext.Provider
                    value={{ routing, runtimeConfig, activeLanguage, knownLanguages, changeLanguage }}
                >
                    {routing && <LayoutRoutingIndicator />}
                    {!initialPropsFix && <Component {...pageProps} />}
                </MHAppContext.Provider>
            </Container>
        );
    }

    private readonly handleRoutingStart = () => this.setState({ routing: true });
    private readonly handleRoutingEnd = () => this.setState({ routing: false });
}

