// tslint:disable:export-name

import App, { AppProps, Container, DefaultAppIProps, NextAppContext } from "next/app";
import Router from "next/router";
import React from "react";
import intl from "react-intl-universal";
import Intl from "intl";

import MHAppContext, { IMHAppContext } from "../src/lib/components/MHAppContext";
import MHLink from "../src/lib/components/MHLink";

import getContext from "../src/context";
import CompilationPhase from "../src/context/CompilationPhase";
import { IMathHubRuntimeConfig } from "../src/types/config";

import LayoutRoutingIndicator from "../src/theming/Layout/LayoutRoutingIndicator";


// For Node.js, common locales should be added in the application
global.Intl = Intl;
await import("intl/locale-data/jsonp/en.js");
await import("intl/locale-data/jsonp/de.js");

type IMHAppProps = IMHAppOwnProps & DefaultAppIProps & AppProps;

interface IMHAppOwnProps {
    clientNeedsProps: boolean;
    initialRuntimeConfig?: IMathHubRuntimeConfig;
}
const SUPPOER_LOCALES = [
    {
        name: "English",
        value: "en",
    },
    {
        name: "Deutsch",
        value: "de",
    },
];

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
        const currentLocale = SUPPOER_LOCALES[0].value;
        await intl.init({
            currentLocale,
            locales: {
                [currentLocale]: import(`../src/locales/${currentLocale}`),
            },
        });

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
    };

    async componentDidMount() {
        Router.events.on("routeChangeStart", this.handleRoutingStart);
        Router.events.on("routeChangeComplete", this.handleRoutingEnd);
        Router.events.on("routeChangeError", this.handleRoutingEnd);

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

    render() {
        const { Component, pageProps } = this.props;
        const { routing, initialPropsFix, runtimeConfig } = this.state;

        return (
            <Container>
                <MHAppContext.Provider value={{ routing, runtimeConfig }}>
                    {routing && <LayoutRoutingIndicator />}
                    {!initialPropsFix && <Component {...pageProps} />}
                </MHAppContext.Provider>
            </Container>
        );
    }

    private readonly handleRoutingStart = () => this.setState({ routing: true });
    private readonly handleRoutingEnd = () => this.setState({ routing: false });
}

