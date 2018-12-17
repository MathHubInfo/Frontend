import "next-server/next-config";
import { utils } from "./lib";
import webpack = require("webpack");
import { IMathHubPublicConfig, IMathHubServerConfig } from "next-server/config";
declare module "next-server/next-config" {
    export type WebpackConfiguration = utils.Mandatory<webpack.Configuration>;
    export interface WebpackOptions {
        // the build id used as a unique identifier between builds
        buildID: string;
        
        // shows if the compilation is done in development mode
        dev: boolean;

        // shows if the resulting configuration will be used for server side (true), or client size compilation (false).
        isServer: boolean
        
        // Holds loader objects Next.js uses internally, so that you can use them in custom configuration 
        defaultLoaders: {
            babel: {},
            hotSelfAccept: {},
    
            // we might have more custom options
            [key: string]: {}
        }
    };

    /** configuration for Next */
    export interface NextConfig {
        webpack?(config: WebpackConfiguration, options: IWebpackOptions): WebpackConfiguration
        publicRuntimeConfig?: IMathHubPublicConfig,
        serverRuntimeConfig?: IMathHubServerConfig
    };
}