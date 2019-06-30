// tslint:disable:export-name

import App, { AppProps, Container, DefaultAppIProps, NextAppContext } from "next/app";
import Router from "next/router";
import React from "react";

import MHAppContext, { IMHAppContext } from "../src/lib/components/MHAppContext";

import { negotiateLanguage, initLocaleSupport, setLocale, supportedLocales as knownLanguages } from "../src/locales";

import getContext from "../src/context";
import { IMathHubRuntimeConfig } from "../src/types/config";

import LayoutRoutingIndicator from "../src/theming/Layout/LayoutRoutingIndicator";
import ImplicitParameters from "../src/utils/ImplicitParameters";

type IMHAppProps = IMHAppOwnProps & DefaultAppIProps & AppProps;

interface IMHAppOwnProps {
    initialLanguage: string;
    initialRuntimeConfig?: IMathHubRuntimeConfig;
}

export default class MHApp extends App<IMHAppOwnProps> {
    static async getInitialProps(context: NextAppContext): Promise<IMHAppProps> {
        const { Component, router } = context;

        const [
            pageProps,
            initialRuntimeConfig,
            initialLanguage,
        ] = await Promise.all([
            MHApp.getPageProps(context),
            MHApp.getRuntimeConfig(context),
            MHApp.getInitialLanguage(context),
        ]);

        return { Component, router, pageProps, initialLanguage, initialRuntimeConfig };
    }

    /**
     * Loads the properties for the current page, if any
     */
    static async getPageProps({ Component, ctx }: NextAppContext) {
        let pageProps = {};
        if (Component.getInitialProps)
            pageProps = await Component.getInitialProps(ctx);

        return pageProps;
    }

    /**
     * Loads the runtime config if not on the server
     */
    static async getRuntimeConfig(
        _: NextAppContext,
    ) {
        if (!process.browser)
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

    /**
     * Initializes and loads the initial language
     */
    static async getInitialLanguage(context: NextAppContext): Promise<string> {
        const selection = negotiateLanguage(context.ctx);

        await initLocaleSupport();
        await setLocale(selection);

        return selection;
    }

    state: IMHAppContext & { languageLoaded: boolean } = {
        routing: false,
        languageLoaded: !process.browser,
        runtimeConfig: this.props.initialRuntimeConfig,
        activeLanguage: this.props.initialLanguage,
        knownLanguages,

        // client-side only function to change the active language
        changeLanguage: async (lang: string): Promise<void> => {
            // load the locale data
            await setLocale(lang);

            // update the dom + url
            document.getElementsByTagName("html")[0].setAttribute("lang", lang);
            await ImplicitParameters.replaceRouterParameters({lang});

            // tell the state about having changed language
            this.setState({activeLanguage: lang});
        },
    };

    async componentDidMount() {
        Router.events.on("routeChangeStart", this.handleRoutingStart);
        Router.events.on("routeChangeComplete", this.handleRoutingEnd);
        Router.events.on("routeChangeError", this.handleRoutingEnd);

        // if we still need to load languages
        // load them and only render after
        if (!this.state.languageLoaded)
            // tslint:disable-next-line: no-floating-promises
            setLocale(this.state.activeLanguage).then(_ => this.setState({languageLoaded: true}));

        // if we do not have the runtime configuration, start loading it
        if (!this.props.initialRuntimeConfig)
            this.setState({ runtimeConfig: await MHApp.loadRuntimeConfig() });
    }

    componentWillUnmount() {
        Router.events.off("routeChangeStart", this.handleRoutingStart);
        Router.events.off("routeChangeComplete", this.handleRoutingEnd);
        Router.events.off("routeChangeError", this.handleRoutingEnd);
    }

    render() {
        const { Component, pageProps } = this.props;
        const { activeLanguage, changeLanguage, routing, languageLoaded, runtimeConfig } = this.state;

        return (
            <Container>
                <MHAppContext.Provider
                    value={{ routing, runtimeConfig, activeLanguage, knownLanguages, changeLanguage }}
                >
                    {routing && <LayoutRoutingIndicator />}
                    {languageLoaded && <Component {...pageProps} />}
                </MHAppContext.Provider>
            </Container>
        );
    }

    private readonly handleRoutingStart = () => this.setState({ routing: true });
    private readonly handleRoutingEnd = () => this.setState({ routing: false });
}

