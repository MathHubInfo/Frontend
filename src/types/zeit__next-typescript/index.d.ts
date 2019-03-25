declare module "@zeit/next-typescript" {
    import { NextConfig } from "next";
    function ApplyNextTypescript(config: NextConfig): NextConfig;
    export = ApplyNextTypescript;
}
