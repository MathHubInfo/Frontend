import App, { AppContext } from "next/app";
import dynamic from "next/dynamic";
import { default as Router } from "next/router";
import React from "react";

import { LocaleContext } from "../src/locales/WithTranslate";
import { Locale, defaultLocale, makeLocale } from "../src/locales";

import Error from "./404";

// true global css
import "semantic-ui-css/semantic.min.css";

// tgview only css
import "tgview/src/css/styles.css";
import "vis/dist/vis.min.css";
import "jqueryui/jquery-ui.min.css";
import "jstree/dist/themes/default/style.css";
import { loadLocaleData } from "../src/locales/loadData";

const LayoutRoutingIndicator = dynamic(() => import("../src/theming/Layout/LayoutRoutingIndicator"));

interface IMHAppProps extends LocaleProps {
    initialConfig: unknown;
}

interface LocaleProps {
    locale: Locale | undefined;
    localeData: Record<string, string>;
}

interface IMHAppState {
    routing: boolean; // true when navigating between pages
}

export default class MHApp extends App<IMHAppProps> {
    /**
     * Load initial properties (including language) for the provided page
     */
    static async getInitialProps(context: AppContext) {
        const [origProps, { localeData, locale }] = await Promise.all([
            App.getInitialProps(context),
            MHApp.getLocale(context),
        ]);

        // if urlLocale is undefined, we return an HTTP 404!
        // this only happens when the client requests an unknown language!
        if (locale === undefined && context.ctx.res) {
            context.ctx.res.statusCode = 404;
        }

        return { ...origProps, locale, localeData };
    }

    /**
     * Load the properties for the component of the provided page
     */
    static async getProps({ Component, ctx }: AppContext): Promise<unknown> {
        if (!Component.getInitialProps) return {};
        return Component.getInitialProps(ctx);
    }

    /**
     * Initializes and loads the initial language
     */
    static async getLocale({ router: { locale: detectedLocale } }: AppContext): Promise<LocaleProps> {
        const locale = makeLocale(detectedLocale);
        const localeData = await loadLocaleData(locale || defaultLocale);
        return { locale, localeData };
    }

    state: IMHAppState = {
        routing: false,
    };

    async componentDidMount() {
        Router.events.on("routeChangeStart", this.handleRoutingStart);
        Router.events.on("routeChangeComplete", this.handleRoutingEnd);
        Router.events.on("routeChangeError", this.handleRoutingEnd);
    }

    componentWillUnmount() {
        Router.events.off("routeChangeStart", this.handleRoutingStart);
        Router.events.off("routeChangeComplete", this.handleRoutingEnd);
        Router.events.off("routeChangeError", this.handleRoutingEnd);
    }

    componentDidUpdate() {
        document.getElementsByTagName("html")[0].setAttribute("lang", this.props.locale || defaultLocale);
    }

    render() {
        let { locale, Component, pageProps } = this.props;
        const { localeData } = this.props;
        const { routing } = this.state;

        // if the user did not provide a locale, render the error component!
        // with the default locale!
        if (locale === undefined) {
            locale = defaultLocale;
            Component = Error;
            pageProps = {};
        }

        return (
            <LocaleContext.Provider value={{ locale, localeData }}>
                {routing && <LayoutRoutingIndicator />}
                <Component {...pageProps} />
            </LocaleContext.Provider>
        );
    }

    private readonly handleRoutingStart = () => this.setState({ routing: true });
    private readonly handleRoutingEnd = () => this.setState({ routing: false });
}
