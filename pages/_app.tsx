// tslint:disable:export-name no-submodule-imports no-implicit-dependencies

import App, { AppContext } from "next/app";
import dynamic from "next/dynamic";
import { default as Router } from "next/router";
import React from "react";
import MHAppContext, { IMHAppContext } from "../src/lib/components/MHAppContext";
import { initLocaleSupport, negotiateLanguage, setLocale, supportedLocales as knownLanguages } from "../src/locales";
import ImplicitParameters from "../src/utils/ImplicitParameters";

// true global css
import "semantic-ui-css/semantic.min.css";

// tgview only css
import "tgview/src/css/styles.css";
import "vis/dist/vis.min.css";
import "jqueryui/jquery-ui.min.css";
import "jstree/dist/themes/default/style.css";

const LayoutRoutingIndicator = dynamic(() => import("../src/theming/Layout/LayoutRoutingIndicator"));

interface IMHAppOwnProps {
    initialLanguage: string;
    initialConfig: {};
}

export default class MHApp extends App<IMHAppOwnProps> {
    static async getInitialProps(context: AppContext) {
        const [
            pageProps,
            initialLanguage,
        ] = await Promise.all([
            MHApp.getPageProps(context),
            MHApp.getInitialLanguage(context),
        ]);

        return { pageProps, initialLanguage };
    }

    /**
     * Loads the properties for the current page, if any
     */
    static async getPageProps({ Component, ctx }: AppContext) {
        let pageProps = {};
        if (Component.getInitialProps)
            pageProps = await Component.getInitialProps(ctx);

        return pageProps;
    }

    /**
     * Initializes and loads the initial language
     */
    static async getInitialLanguage(context: AppContext): Promise<string> {
        const selection = negotiateLanguage(context.ctx);

        await initLocaleSupport();
        await setLocale(selection);

        return selection;
    }

    state: IMHAppContext & { languageLoaded: boolean } = {
        routing: false,
        languageLoaded: !process.browser,
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
    }

    componentWillUnmount() {
        Router.events.off("routeChangeStart", this.handleRoutingStart);
        Router.events.off("routeChangeComplete", this.handleRoutingEnd);
        Router.events.off("routeChangeError", this.handleRoutingEnd);
    }

    render() {
        const { Component, pageProps } = this.props;
        const { activeLanguage, changeLanguage, routing, languageLoaded } = this.state;

        return (
            <MHAppContext.Provider
                value={{ routing, activeLanguage, knownLanguages, changeLanguage }}
            >
                {routing && <LayoutRoutingIndicator />}
                {languageLoaded && <Component {...pageProps} />}
            </MHAppContext.Provider>
        );
    }

    private readonly handleRoutingStart = () => this.setState({ routing: true });
    private readonly handleRoutingEnd = () => this.setState({ routing: false });
}

