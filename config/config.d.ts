import { NextConfig } from "next";

export interface IDefaultConfig {
    defaultConfig: Mandatory<NextConfig>;
}

export interface IWebPackShellPluginOptions {
    onBuildStart?: string | string[];
    onBuildEnd?: string | string[];
    onBuildExit?: string | string[];

    dev: boolean;
    verbose: boolean;
    safe: boolean;

    [key: string]: string | string[] | boolean | undefined;
}

export interface IScript {
    command: string;
    args: string[];
}

export interface IOptionsInternal extends IWebPackShellPluginOptions {
    onBuildStart: string[];
    onBuildEnd: string[];
    onBuildExit: string[];
}
