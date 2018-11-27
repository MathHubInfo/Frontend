/**
 * Adapted from https://github.com/1337programming/webpack-shell-plugin/blob/master/src/webpack-shell-plugin.js
 * 
 * 
 * which is licensed under
 * 
 * The MIT License (MIT)
 Copyright (c) 2016 
 
 Permission is hereby granted, free of charge, to any person obtaining a copy
 of this software and associated documentation files (the "Software"), to deal
 in the Software without restriction, including without limitation the rights
 to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 copies of the Software, and to permit persons to whom the Software is
 furnished to do so, subject to the following conditions:
 
 The above copyright notice and this permission notice shall be included in all
 copies or substantial portions of the Software.
 
 THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
 */

const spawn = require('child_process').spawn;
const exec = require('child_process').exec;
const os = require('os');

const defaultOptions = {
  onBuildStart: [],
  onBuildEnd: [],
  onBuildExit: [],
  dev: false,
  verbose: false,
  safe: false
};

function WebpackShellPlugin(options) {
    this.options = this.validateInput(this.mergeOptions(options, defaultOptions));
    this.shouldExit = true;
}

WebpackShellPlugin.prototype.puts = function (error, stdout, stderr) {
    if (error && this.shouldExit) {
        throw error;
    }
    this.shouldExit = false;
};

WebpackShellPlugin.prototype.spreadStdoutAndStdErr = function (proc) {
    proc.stdout.pipe(process.stdout);
    proc.stderr.pipe(process.stdout);
};

WebpackShellPlugin.prototype.serializeScript = function (script) {
    if (typeof script === 'string') {
        const split = script.split(' ');
        return { command: split.shift(), args: split };
    }
    return {command: script.command, args: script.args};
};

WebpackShellPlugin.prototype.handleScript = function (script, next) {
    const theNext = (error, stdout, stderr) => {
        this.puts(error, stdout, stderr);
        if (typeof next === "function") {
            next();
        }
    }

    if (os.platform() === 'win32' || this.options.safe) {
        this.spreadStdoutAndStdErr(exec(script, theNext));
    } else {
        const { command, args } = this.serializeScript(script);
        const proc = spawn(command, args, { stdio: 'inherit' });
        proc.on('close', theNext);
    }
};

WebpackShellPlugin.prototype.validateInput = function (options) {
    if (typeof options.onBuildStart === 'string') {
        options.onBuildStart = options.onBuildStart.split('&&');
    }
    if (typeof options.onBuildEnd === 'string') {
        options.onBuildEnd = options.onBuildEnd.split('&&');
    }
    if (typeof options.onBuildExit === 'string') {
        options.onBuildExit = options.onBuildExit.split('&&');
    }
    return options;
};

WebpackShellPlugin.prototype.mergeOptions = function (options, defaults) {
    for (const key in defaults) {
        if (options.hasOwnProperty(key)) {
            defaults[key] = options[key];
        }
    }
    return defaults;
};

WebpackShellPlugin.prototype.apply = function (compiler) {

    const runScripts = (scripts, next) => {
        if(scripts.length === 0){
            next();
        } else {
            this.handleScript(scripts[0], () => runScripts(scripts.slice(1), next));
        }
    }

    compiler.hooks.compile.tap('WebpackShellPlugin', (compilation) => {
        if (this.options.onBuildStart.length) {
            console.log('Executing pre-build scripts');
            runScripts(this.options.onBuildStart, () => {
                if (this.options.dev) {
                    this.options.onBuildStart = [];
                }
            });
        }
    });

    compiler.hooks.afterEmit.tapAsync('WebpackShellPlugin', (compilation, next) => {
        if (this.options.onBuildEnd.length) {
            console.log('Executing post-build scripts');
            runScripts(this.options.onBuildEnd, () => {
                if (this.options.dev) {
                    this.options.onBuildEnd = [];
                }
                next();
            });

        } else {
            next();
        }
    });

    compiler.hooks.done.tapAsync('WebpackShellPlugin', (stats, next) => {

        if (this.options.onBuildExit.length) {
            runScripts(this.options.onBuildExit, next);
        } else {
            next();
        }
    });
};

module.exports = WebpackShellPlugin;