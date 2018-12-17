import { resolve } from "url";

import { IMathHubConfig, urls } from "../Context/config";

import config from "./config";

export default async function (urlPrefix = ""): Promise<IMathHubConfig> {
    // create a configuration and update it for the base URL prefix
    const client = await config();
    client.MMT_URL = resolve(urlPrefix, client.MMT_URL);
    client.NEWS_URL = resolve(urlPrefix, client.NEWS_URL);
    client.GLOSSARY_URL = resolve(urlPrefix, client.GLOSSARY_URL);

    // and return the urls for the client
    return { client, urls };
}
