declare module "@zeit/next-css" {
    import { NextConfig } from "next";
    function ApplyNextCSS(config: NextConfig): NextConfig;
    export = ApplyNextCSS;
}
