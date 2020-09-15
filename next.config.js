// @ts-check

// This file is the main configuration of the MathHub nextjs app. 
// It's read only once, and directly from within node. 
// For this reason we can't use "import" statements, as node doesn't natively support them.

const { resolve } = require("path");
const { readdirSync } = require("fs");
const { ProvidePlugin, IgnorePlugin } = require("webpack");
const gitRevSync = require("git-rev-sync");


/** @type{import("./src/types/config").IMathHubConfig} */
const config = {
  "MATHHUB_VERSION": mathhubversion(),

  // read the rest of the environment variables from the real environment
  // TODO: Consider moving these directly into NEXT_PUBLIC_ so that they're easier to setup
  ...readenv([
    "LIBRARY_URL",
    "NEWS_URL",
    "GLOSSARY_URL",
    "TRANSLATION_URL",
    "ADMIN_URL",
    "RUNTIME_CONFIG_URL",
    "UPSTREAM_BASE_URL",
  ])
}

module.exports = {
  poweredByHeader: false,
  webpack,
  env: {MATHHUB_CONFIG: config},
};

/**
 * Makes a Regexp for source files inside path to be optional. 
 * Assumes a subdirectory of source and does not support ".."s. 
 * To be used by IgnorePlugin. 
 * 
 * @param  {...string} path 
 * @returns {RegExp}
 */
function optionalRegex(...path) {
  // Construct a regex of the path that matches the path
  // But does not match the existing files in that path. 

  /** pathRegexp is a version of the path to be used inside a regex */
  const pathRegexp = (["", ...path, ""]).join("\\/");

  /**
   * All the files in the path that do exist
   * @type {string[]}
   */
  let files = [];
  try {
    files = readdirSync(resolve(__dirname, "src", ...path));
  } catch (e) { }

  // escape special characters and build a look-around regex
  let filesRegex = files.map(f => f.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")).join("|");
  filesRegex = filesRegex !== "" ? `((?!${filesRegex}))[^\/]+$` : "[^\/]+$";

  return new RegExp(pathRegexp + filesRegex);
}


/**
 * webpack updates the webpack configuration
 * @param {import("webpack").Configuration} config 
 * @param {*} options 
 * @return {import("webpack").Configuration}
 */
function webpack(config, options) {
  // add rules for txt
  config.module.rules.push({
    test: /\.txt$/i,
    use: {
      loader: "raw-loader",
    },
  });

  // all files from src/assets/generated might be missing
  // so we need to craft a special IgnorePlugin instance that ignores all the non-existing ones. 
  config.plugins.push(new IgnorePlugin(optionalRegex("assets", "generated")));

  // when we are not on the server, we need to provide jquery
  if (!options.isServer) {
    config.plugins.push(new ProvidePlugin({ "$": "jQuery", "jQuery": "jquery" }));
  }

  return config;
}

/**
 * Build version information about this version of MathHub. 
 * 
 * @returns {import("./src/types/config").IMathHubVersion}
 */
function mathhubversion() {
  const pkg = require("./package.json").version; // TODO: Use readfile

  const root = resolve(__dirname, "..");

  /** @type {import("./src/types/config").IMathHubVersion["git"] | undefined} */
  let git = undefined;

  try {
    const gitHash = gitRevSync.long(root);
    if (!gitHash) {
      throw new Error("no git hash");
    }

    git = { hash: gitHash };

    try {
      const branch = gitRevSync.branch(root);
      git.branch = branch ? (branch + "") : undefined;
    } catch (f) { }

    try {
      git.dirty = gitRevSync.isDirty();
    } catch (f) { }

    try {
      git.time = gitRevSync.date().getTime();
    } catch (f) { }
  } catch (e) { }

  return {
    semantic: pkg,
    configTime: new Date().getTime(),
    git: git,
  };
}

/**
 * Readenv reads variables from the environment and returns a dictionary containing them. 
 * 
 * @param {string[]} variables
 * @return {Object.<string, string>}
 */
function readenv(variables) {
  /** @type Object.<string, string> */
  const dict = {};
  variables.forEach(v => dict[v] = process.env[v] || undefined);
  return dict;
}
