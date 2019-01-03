import {default as runtimeConfig } from "next/config";
import { resolve as resolveURL } from "url";

import { IMathHubPublicConfig, IMathHubServerConfig } from "../types/config";

import Lazy from "../utils/Lazy";

import GlossaryClient from "./GlossaryClient";
import HTTPClient from "./HTTPClient";
import { LibraryClient } from "./LibraryClient";
import MockClient from "./LibraryClient/MockClient";
import RestClient from "./LibraryClient/RestClient";
import NewsClient from "./NewsClient";
import TranslationClient from "./TranslationClient";


/**
 * Configuration used by MathHub
 */
export interface IContext {
    // the configuration that induced this context
    config: IMathHubPublicConfig;

    // client to make http requests
    httpClient: HTTPClient;

    // client to fetch library data with
    libraryClient: LibraryClient;

    // client to fetch news data with
    newsClient: NewsClient;

    // client to fetch data from
    glossaryClient: GlossaryClient;

    // client to translate text with
    translationClient: TranslationClient;
}

const iResolve = process.browser ?
    (url: string) => url :
    (url: string, server?: IMathHubServerConfig) => (server && resolveURL(server.upstreamRequestBase, url));

const getContext = Lazy(() => {
    // get the public configuration
    const rtConfig = runtimeConfig();
    if (!rtConfig.publicRuntimeConfig) throw new Error("Unable to load configuration");
    const config: IMathHubPublicConfig = rtConfig.publicRuntimeConfig;

    // alias to easily resolve a url both from the server
    // and from the client
    const rs = (url: string) => iResolve(url, rtConfig.serverRuntimeConfig) || url;
    const resolve = (url: string | undefined) => (typeof url === "string") ? rs(url) : undefined;

    // make a new httpClient for pooling requests
    // on the server side, this should only have a single request
    // on the client, this may have as many requests as possible
    const httpClient = new HTTPClient(rs);

    // a client to retrieve all the libraries from MMT
    const libraryClient = config.libraryURL ?
        new RestClient(rs(config.libraryURL), httpClient) :
        new MockClient();

    // a client to receive all the news
    const newsClient = new NewsClient(resolve(config.newsURL), httpClient);

    // a client to receive the glossary
    const glossaryClient = new GlossaryClient(resolve(config.glossaryURL), httpClient);

    // a client to translate text
    const translationClient = new TranslationClient(resolve(config.translationURL), httpClient);

    // and all of the config
    return {
        config,
        httpClient,
        libraryClient,
        newsClient,
        glossaryClient,
        translationClient,
    };
});

// tslint:disable-next-line:export-name
export default getContext;
