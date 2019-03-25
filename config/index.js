// @ts-check
// tslint:disable:object-literal-sort-keys no-console

const constants = require("next/constants");

const withCSS = require("@zeit/next-css");
const withTypescript = require("@zeit/next-typescript");

const env = require("./env");
const webpack = require("./webpack");

/**
 * @typedef {import("./config.d").IDefaultConfig} IDefaultConfig
 * @typedef {import("next").NextConfig} NextConfig
 * @typedef {import("../src/context/CompilationPhase").CompilationPhase} CompilationPhase
 */

/**
 * Generates a next configuration
 * @param {string} phaseStr
 * @param {IDefaultConfig} _
 * @returns {NextConfig}
 */
module.exports = function makeConfig(phaseStr, _) {
    const phase = fromString(phaseStr);
    const [publicRuntimeConfig, serverRuntimeConfig] = env(phase, process.env);

    return withTypescript(
        withCSS(
            {
                poweredByHeader: false,
                webpack: webpack(phase),
                publicRuntimeConfig,
                serverRuntimeConfig,
            },
        ),
    );
};

/**
 * Turns the current phase into an enum
 * @param {string} phase Phase to convert
 * @returns {CompilationPhase}
 */
function fromString(phase) {
    switch (phase) {
        case constants.PHASE_EXPORT:
            return 0;
        case constants.PHASE_PRODUCTION_BUILD:
            return 1;
        case constants.PHASE_PRODUCTION_SERVER:
            return 2;
        case constants.PHASE_DEVELOPMENT_SERVER:
            return 3;
        default:
            throw new Error("Unknown compilation phase " + phase);
    }
}
