// @ts-check

// tslint:disable:object-literal-sort-keys no-console

const spawn = require("child_process").spawn;

/**
 * @license
 * Adapted from https://github.com/1337programming/webpack-shell-plugin/blob/master/src/webpack-shell-plugin.js
 *
 *
 * which is licensed under
 *
 *  The MIT License (MIT)
 *  Copyright (c) 2016
 *
 *  Permission is hereby granted, free of charge, to any person obtaining a copy
 *  of this software and associated documentation files (the "Software"), to deal
 *  in the Software without restriction, including without limitation the rights
 *  to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 *  copies of the Software, and to permit persons to whom the Software is
 *  furnished to do so, subject to the following conditions:
 *
 *  The above copyright notice and this permission notice shall be included in all
 *  copies or substantial portions of the Software.
 *
 *  THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 *  IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 *  FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 *  AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 *  LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 *  OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 *  SOFTWARE.
 */

/**
 * @typedef {import("../config.d").IWebPackShellPluginOptions} IWebPackShellPluginOptions
 * @typedef {import("../config.d").IOptionsInternal} IOptionsInternal
 * @typedef {import("../config.d").IScript} IScript
 * @typedef {import("webpack").Compiler} Compiler
 */

/**
 * Creates a new WebpackShellPlugin
 * @param {Partial<IWebPackShellPluginOptions>} options
 * @this {WebpackShellPlugin}
 */
function WebpackShellPlugin(options) {
    this.options = WebpackShellPlugin.makeOptions(options);
    this.shouldExit = false;
}

/**
 * @param {Compiler} compiler Compiler to run the plugin on
 */
WebpackShellPlugin.prototype.apply = function(compiler) {
    /**
     * @param {string[]} scripts
     * @param {() => void} next
     */
    const runScripts = (scripts, next) => {
        if (scripts.length === 0) {
            next();
        } else { this.handleScript(scripts[0], () => runScripts(scripts.slice(1), next)); }
    };

    compiler.hooks.compile.tap("WebpackShellPlugin", () => {
        if (this.options.onBuildStart.length) {
            console.log("Executing pre-build scripts");
            runScripts(this.options.onBuildStart, () => {
                if (this.options.dev) { this.options.onBuildStart = []; }
            });
        }
    });

    compiler.hooks.afterEmit.tapAsync("WebpackShellPlugin", (_, next) => {
        if (this.options.onBuildEnd.length) {
            console.log("Executing post-build scripts");
            runScripts(this.options.onBuildEnd, () => {
                if (this.options.dev) { this.options.onBuildEnd = []; }
                next();
            });
        } else {
            next();
        }
    });

    compiler.hooks.done.tapAsync("WebpackShellPlugin", (_, next) => {
        if (this.options.onBuildExit.length) {
            runScripts(this.options.onBuildExit, next);
        } else {
            next();
        }
    });
};

/**
 * @param {{} | null} error Error that occured (if any)
 */
WebpackShellPlugin.prototype.puts = function(error) {
    if (error && this.shouldExit) { throw error; }
    this.shouldExit = false;
};

/**
 * @param {string} script
 * @param {() => void} [next] callback function
 */
WebpackShellPlugin.prototype.handleScript = function(script, next) {
    /**
     * @param {{} | null} error
     */
    const theNext = (error) => {
        this.puts(error);
        if (typeof next === "function") { next(); }
    };

    const { command, args } = WebpackShellPlugin.serializeScript(script);
    const proc = spawn(command, args, { stdio: "inherit" });
    proc.on("close", theNext);
};

/**
 * @param {Partial<IWebPackShellPluginOptions>} options
 * @returns {IOptionsInternal}
 */
WebpackShellPlugin.makeOptions = function(options) {
    if (typeof options.onBuildStart === "string") {
        options.onBuildStart = options.onBuildStart.split("&&");
    }
    if (typeof options.onBuildEnd === "string") {
        options.onBuildEnd = options.onBuildEnd.split("&&");
    }
    if (typeof options.onBuildExit === "string") {
        options.onBuildExit = options.onBuildExit.split("&&");
    }

    /** @type {IOptionsInternal} */
    const defaults = {...WebpackShellPlugin.defaultOptions};
    Object.keys(defaults).forEach(key => {
        if (options.hasOwnProperty(key)) {
            defaults[key] = options[key];
        }
    });

    return defaults;
};

/** @type {IOptionsInternal} */
WebpackShellPlugin.defaultOptions = {
    onBuildExit: [],
    onBuildEnd: [],
    onBuildStart: [],

    dev: false,
    verbose: false,
    safe: false,
};

/**
 * Serializes a script
 * @param {string} script
 * @returns {IScript}
 */
WebpackShellPlugin.serializeScript = function(script) {
    const split = script.split(" ");

    return { command: split.shift() || "", args: split };
};

module.exports = WebpackShellPlugin;
