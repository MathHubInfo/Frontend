const webpack = require("webpack");
const merge = require("webpack-merge");

const resolve = require("path").resolve;

const LicenseInfoWebpackPlugin = require("license-info-webpack-plugin").default;
const UglifyJsPlugin = require("uglifyjs-webpack-plugin");
const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin");
const ImageminPlugin = require("imagemin-webpack-plugin").default;
const CleanWebpackPlugin = require("clean-webpack-plugin");

const common = require("./build/common");
const env = require("./build/env");

module.exports = merge(common, {
    mode: "production",

    optimization: {
        minimizer: [
            // keep license info in output
            new UglifyJsPlugin({
                sourceMap: false, 
                uglifyOptions: {
                    output: {
                        comments: /^\**!|@preserve|@license|@cc_on/
                    }
                }
            }), 

            // make all the css smaller
            new OptimizeCSSAssetsPlugin({})
        ]
    },

    plugins: [
        // Cleanup the dist folder automatically
        new CleanWebpackPlugin([resolve(__dirname, "dist")]), 

        // define production variables
        new webpack.DefinePlugin({
            'process.env': Object.assign(env, {
                'NODE_ENV': JSON.stringify('production'), 
                'BABEL_ENV': JSON.stringify('production')
            }),
        }), 

        // licensing stuff
        new LicenseInfoWebpackPlugin({
            glob: '{LICENSE,license,License}*'
        }),

        // and minimize images
        new ImageminPlugin()
    ]
});