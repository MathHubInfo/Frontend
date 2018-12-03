import Axios from "axios";

import { IMathHubClientConfig } from "../Context/config";

const defaultConfig: IMathHubClientConfig = {
    MMT_URL: process.env.MMT_URL || "",
    NEWS_URL: process.env.NEWS_URL || "",
    GLOSSARY_URL: process.env.GLOSSARY_URL || "",
    BROWSER_ROUTER: process.env.BROWSER_ROUTER || "",
    SERVER_ROUTER: process.env.SERVER_ROUTER || "",
    SHOW_RIBBON: process.env.SHOW_RIBBON === "beta" ? "beta" : undefined,
};

export default async function (configURL?: string): Promise<IMathHubClientConfig> {
    // load runtime configuration from the given url
    let runtime: {[key: string]: string} = {};
    try {
        if (configURL)
            runtime = (await Axios.get<{[key: string]: string}>(configURL)).data;
    } catch (e) {}

    // make the actual configuration
    const actual: Partial<IMathHubClientConfig> = {};
    (Object.keys(defaultConfig) as Array<keyof IMathHubClientConfig>) // cast is runtime safe
        .forEach(k => {
            actual[k] = runtime.hasOwnProperty(k) ? runtime[k] : defaultConfig[k];
        });

    return actual as IMathHubClientConfig;
}
