import {common, env} from "./common"

import webpack from "webpack"

import LicenseInfoWebpackPlugin from "license-info-webpack-plugin"
import UglifyJsPlugin from "uglifyjs-webpack-plugin"

import ExtractCssChunks from 'extract-css-chunks-webpack-plugin';
import OptimizeCSSAssetsPlugin from 'optimize-css-assets-webpack-plugin';
import ImageminPlugin from 'imagemin-webpack-plugin';


export default {
    ...common, 

    mode: 'production', 

    optimization: {
        ...common.optimization, 

        minimizer: [
            new UglifyJsPlugin({
                sourceMap: false, 
                uglifyOptions: {
                    output: {
                        comments: /^\**!|@preserve|@license|@cc_on/
                    }
                }
            }), 
            new OptimizeCSSAssetsPlugin({})
        ]
    }, 

    module: {
        ...common.module, 

        rules: [
            ...common.module.rules,

            {
                test: /\.css$/,
                use: [ ExtractCssChunks.loader, 'css-loader' ],
            },
        ]
    },

    plugins: [
        ...common.plugins, 

        // CSS Extraction Plugin
        new ExtractCssChunks({
            filename: '[name].[hash].css',
            chunkFilename: '[id].[hash].css',
        }),

        // we are in production
        new webpack.DefinePlugin({
            'process.env': {
                ...env,
                'NODE_ENV': JSON.stringify('production'), 
                'BABEL_ENV': JSON.stringify('production')
            },
        }), 

        new LicenseInfoWebpackPlugin({
            glob: '{LICENSE,license,License}*'
        }),

        new ImageminPlugin()
    ]
}