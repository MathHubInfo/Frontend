import { resolve } from "url";

import { IMathHubConfig, urls } from "../Context/config";

import config from "./config";

export default async function (urlPrefix = ""): Promise<IMathHubConfig> {
    // create a configuration and update it for the base URL prefix
    const userConfig = await config();
    userConfig.MMT_URL = resolve(urlPrefix, userConfig.MMT_URL);
    userConfig.NEWS_URL = resolve(urlPrefix, userConfig.NEWS_URL);
    userConfig.GLOSSARY_URL = resolve(urlPrefix, userConfig.GLOSSARY_URL);

    // and return the urls for the client
    return {
        client: await config(),
        urls,
    };
}
