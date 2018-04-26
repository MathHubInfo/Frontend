import {common, env} from "./common"

import webpack from "webpack"

import LicenseInfoWebpackPlugin from "license-info-webpack-plugin"
import UglifyJsPlugin from "uglifyjs-webpack-plugin"

export default {
    ...common, 

    mode: 'production', 

    optimization: {
        ...common.optimization, 

        minimizer: [
            new UglifyJsPlugin({
                sourceMap: true, 
                uglifyOptions: {
                    output: {
                        comments: /^\**!|@preserve|@license|@cc_on/
                    }
                }
            })
        ]
    }, 

    plugins: [
        ...common.plugins, 

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
    ]
}