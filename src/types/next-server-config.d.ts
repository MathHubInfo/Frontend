import { IMathHubServerConfig, IMathHubPublicConfig } from "./config";

declare module "next-server/config" {
    export interface RuntimeConfig {
        serverRuntimeConfig?: IMathHubServerConfig;
        publicRuntimeConfig: IMathHubPublicConfig;
    }
}