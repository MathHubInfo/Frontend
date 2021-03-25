import App, { AppContext } from "next/app";
import { default as Router } from "next/router";
import React from "react";

import { LocaleContext } from "../src/locales/WithTranslate";
import { Locale, defaultLocale, makeLocale } from "../src/locales";

import Error from "./404";

import { loadLocaleData } from "../src/locales/loadData";
import NProgress from "../src/components/NProgress";

// true global css, only semantic ui css!
import "semantic-ui-css/semantic.min.css";

// tgview only css
// TODO: Consider removing this!
import "tgview/src/css/styles.css";
import "vis/dist/vis.min.css";
import "jqueryui/jquery-ui.min.css";
import "jstree/dist/themes/default/style.css";
import { URLContext } from "../src/locales/WithURL";

interface IMHAppProps extends LocaleProps {
    url: string; // the full url of the current page!
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
        const [origProps, { localeData, locale }, url] = await Promise.all([
            App.getInitialProps(context),
            MHApp.getLocale(context),
            MHApp.getURL(context),
        ]);

        // if urlLocale is undefined, we return an HTTP 404!
        // this only happens when the client requests an unknown language!
        if (locale === undefined && context.ctx.res) {
            context.ctx.res.statusCode = 404;
        }

        return { ...origProps, locale, localeData, url };
    }

    static async getURL({ ctx: { req }, router: { asPath } }: AppContext): Promise<string> {
        if (!req) return window.location.href; // client side!

        const { host } = req.headers;
        return "http://" + (host || "localhost") + asPath;
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

    render() {
        let { locale, Component, pageProps } = this.props;
        const { url, localeData } = this.props;
        const { routing } = this.state;

        // if the user did not provide a locale, render the error component!
        // with the default locale!
        if (locale === undefined) {
            locale = defaultLocale;
            Component = Error;
            pageProps = {};
        }

        return (
            <URLContext.Provider value={url}>
                <LocaleContext.Provider value={{ locale, localeData }}>
                    {routing && <NProgress />}
                    <Component {...pageProps} />
                </LocaleContext.Provider>
            </URLContext.Provider>
        );
    }

    private readonly handleRoutingStart = () => this.setState({ routing: true });
    private readonly handleRoutingEnd = () => this.setState({ routing: false });
}
