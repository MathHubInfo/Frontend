// @ts-check
// tslint:disable:object-literal-sort-keys no-console no-empty

const resolve = require("path").resolve;
const gitRevSync = require("git-rev-sync");

/**
 * @typedef {import("../src/context/CompilationPhase").CompilationPhase} CompilationPhase
 * @typedef {import("../src/types/config").IMathHubPublicConfig} IMathHubPublicConfig
 * @typedef {import("../src/types/config").IMathHubVersion} IMathHubVersion
 * @typedef {import("../src/types/config").IMathHubServerConfig} IMathHubServerConfig
 */

/**
 * Builds configuration for server and client
 * @param {CompilationPhase} phase Current Phase of the Compilation
 * @param {NodeJS.ProcessEnv} env The environment variables of the process
 * @returns {[IMathHubPublicConfig, IMathHubServerConfig]}
 */
module.exports = function(phase, env) {
    return [
        {
            version: getVersionInfo(),
            compilationPhase: phase,
            libraryURL: env.MMT_URL || undefined,
            newsURL: env.NEWS_URL || undefined,
            glossaryURL: env.GLOSSARY_URL || undefined,
            translationURL: env.TRANSLATION_URL || undefined,
            adminURL: env.ADMIN_URL || undefined,
            theme: env.MATHHUB_THEME || "plain",
            configURL: env.RUNTIME_CONFIG_URL || undefined,
        },
        {
            upstreamRequestBase: env.UPSTREAM_BASE_URL || "",
        },
    ];
};

/**
 * Get the current version information
 * @returns {IMathHubVersion}
 */
function getVersionInfo() {
    const pkg = require("../package.json").version;

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
            git.branch = gitRevSync.branch(root);
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
}
