// @ts-check
// tslint:disable:object-literal-sort-keys no-console no-empty

const withCSS = require("@zeit/next-css");

const resolve = require("path").resolve;
const gitRevSync = require("git-rev-sync");

const readdirSync = require("fs").readdirSync;
const ProvidePlugin = require("webpack").ProvidePlugin;
const IgnorePlugin = require("webpack").IgnorePlugin;

/**
 * @typedef {import("./src/types/config").IMathHubConfig} IMathHubConfig
 * @typedef {import("./src/types/config").IMathHubVersion} IMathHubVersion
 */


module.exports = withCSS({
    poweredByHeader: false,

    webpack: (config, options) => {

      // add rules for txt
      config.module.rules.push({
        test: /\.txt$/i,
        use: {
          loader: "raw-loader",
        },
      });
  
      config.module.rules.push({
        test: /\.(gif|png|svg|eot|otf|ttf|woff|woff2)$/i,
        use: {
          loader: "url-loader",
          options: {
            limit: 8192,
            publicPath: "./",
            outputPath: "static/css/",
            name: "[name].[ext]",
          },
        },
      });
  
      // all files from src/assets/generated might be missing
      // so we need to craft a special IgnorePlugin instance that ignores
      // all the non-existing ones.
  
      // first find all the existing ones and turn them into a regex
      /** @type {string[]} */
      let files = [];
      try {
        files = readdirSync(resolve(__dirname, "src", "assets", "generated"));
  
      // tslint:disable-next-line:no-empty
      } catch (e) {}
  
      const filesRegex = files
        .map(f => f.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"))
        .join("|");
  
      // then place them into the look-around regex
      // \/assets\/generated\/((?!file1.txt|file2.txt|...))[^\/]+$
      // (we omit the look-around if no files exist)
      const regex = filesRegex !== ""
        ? `\\/assets\\/generated\\/((?!${filesRegex}))[^\/]+$` : "\\/assets\\/generated\\/[^\/]+$";
      config.plugins.push(new IgnorePlugin(new RegExp(regex)));
  
      // when we are not on the server, we need to provide jquery
      if (!options.isServer) {
        config.plugins.push(new ProvidePlugin({"$": "jQuery", "jQuery": "jquery"}));
      }
  
      return config;
    },

    // MATHHUB_CONFIG
    env: {
        MATHHUB_CONFIG: {
            // dynamically generate the version string
            // based on the environment
            MATHHUB_VERSION: (function () {
                const pkg = require("./package.json").version;
            
                const root = resolve(__dirname, "..");
            
                /** @type {IMathHubVersion["git"] | undefined} */
                let git = undefined;
            
                try {
                    const gitHash = gitRevSync.long(root);
                    if (!gitHash) {
                        throw new Error("no git hash");
                    }
            
                    git = { hash: gitHash };
            
                    try {
                        /** @type {unknown} */
                        const branch = gitRevSync.branch(root);
                        git.branch = branch ? (branch + "") : undefined;
                    } catch (f) {}
            
                    try {
                        git.dirty = gitRevSync.isDirty();
                    } catch (f) {}
            
                    try {
                        git.time = gitRevSync.date().getTime();
                    } catch (f) {}
                } catch (e) {}
            
                return {
                    semantic: pkg,
                    configTime: new Date().getTime(),
                    git: git,
                };
            })(),

            // environment variables to read from the actual environment
            // along with appropriate defaults
            LIBRARY_URL: process.env.LIBRARY_URL || undefined,
            NEWS_URL: process.env.NEWS_URL || undefined,
            GLOSSARY_URL: process.env.GLOSSARY_URL || undefined,
            TRANSLATION_URL: process.env.TRANSLATION_URL || undefined,
            ADMIN_URL: process.env.ADMIN_URL || undefined,
            RUNTIME_CONFIG_URL: process.env.RUNTIME_CONFIG_URL || undefined,
            UPSTREAM_BASE_URL: process.env.UPSTREAM_BASE_URL || undefined,
        }
    },
});