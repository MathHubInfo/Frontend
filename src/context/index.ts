import { IMathHubConfig } from "../types/config";

import Lazy from "../utils/Lazy";

import GlossaryClient from "./GlossaryClient";
import HTTPClient from "./HTTPClient";
import { LibraryClient } from "./LibraryClient";
import MockClient from "./LibraryClient/MockClient";
import RestClient from "./LibraryClient/RestClient";
import NewsClient from "./NewsClient";
import TranslationClient from "./TranslationClient";
import AdminClient from "./AdminClient";
import { resolveURL } from "../utils/resolve";

/**
 * Configuration used by MathHub
 */
export interface IContext {
    // the configuration that induced this context
    config: IMathHubConfig;

    // client to make http requests
    httpClient: HTTPClient;

    // client to fetch library data with
    libraryClient: LibraryClient;

    // client to fetch news data with
    newsClient: NewsClient;

    // client to fetch data from
    glossaryClient: GlossaryClient;

    // client to fetch admin data from
    adminClient?: AdminClient;

    // client to translate text with
    translationClient: TranslationClient;
}

// the MathHub Configuration
const MATHHUB_CONFIG = (process.env.MATHHUB_CONFIG as unknown) as IMathHubConfig;

/**
 * Resolves a local URL
 * @param url URL to resolve
 */
function rs(url: string): string {
    if (process.browser) return url;

    return resolveURL(MATHHUB_CONFIG.UPSTREAM_BASE_URL || "", url) || url;
}

const getMathHubConfig = Lazy(() => {
    // load the mathhub config
    const mhconfig = MATHHUB_CONFIG;

    // alias to easily resolve a url both from the server
    // and from the client
    const resolve = (url: string | undefined) => (typeof url === "string" ? rs(url) : undefined);

    // make a new httpClient for pooling requests
    // on the server side, this should only have a single request
    // on the client, this may have as many requests as possible
    const httpClient = new HTTPClient(rs);

    // a client to retrieve all the libraries from MMT
    const libraryClient = mhconfig.LIBRARY_URL
        ? new RestClient(rs(mhconfig.LIBRARY_URL), httpClient)
        : new MockClient();

    // a client to receive all the news
    const newsClient = new NewsClient(resolve(mhconfig.NEWS_URL), httpClient);

    // a client to receive the glossary
    const glossaryClient = new GlossaryClient(resolve(mhconfig.GLOSSARY_URL), httpClient);

    // an admin client to interact with admin resources
    const adminClient = process.browser ? new AdminClient(resolve(mhconfig.ADMIN_URL), httpClient) : undefined;

    // a client to translate text
    const translationClient = new TranslationClient(resolve(mhconfig.TRANSLATION_URL), httpClient);

    // and all of the config
    return {
        config: mhconfig,
        httpClient,
        libraryClient,
        newsClient,
        glossaryClient,
        adminClient,
        translationClient,
    };
});

export default getMathHubConfig;
