// @ts-check
// tslint:disable:object-literal-sort-keys no-console

const readdirSync = require("fs").readdirSync;
const resolve = require("path").resolve;

const ProvidePlugin = require("webpack").ProvidePlugin;
const IgnorePlugin = require("webpack").IgnorePlugin;
const WebpackShellPlugin = require("./shell");

const ForkTsCheckerWebpackPlugin = require("fork-ts-checker-webpack-plugin");

/**
 * @typedef {import("../../src/context/CompilationPhase").CompilationPhase} CompilationPhase
 * @typedef {import("next-server/next-config").WebpackConfiguration} WebpackConfiguration
 * @typedef {import("next-server/next-config").WebpackOptions} WebpackOptions
 */

/**
 * @param {CompilationPhase} _
 */
module.exports = function(_) {
  /**
   * @param {WebpackConfiguration} config
   * @param {WebpackOptions} options
   */
  const nested = (config, options) => {
    // typecheck code on the server
    if (options.isServer) {
      config.plugins.push(new ForkTsCheckerWebpackPlugin());
    }

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

    // run linting on the server
    if (options.isServer) {
      config.plugins.push(new WebpackShellPlugin({onBuildStart: ["yarn run --silent lint"]}));
    }

    // all files from src/assets/generated might be missing
    // so we need to craft a special IgnorePlugin instance that ignores
    // all the non-existing ones.

    // first find all the existing ones and turn them into a regex
    /** @type {string[]} */
    let files = [];
    try {
      files = readdirSync(resolve(__dirname, "..", "..", "src", "assets", "generated"));

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
  };
  return nested;
};
