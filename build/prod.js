import config from "./common"

import webpack from "webpack"

import LicenseInfoWebpackPlugin from "license-info-webpack-plugin"
import UglifyJsPlugin from "uglifyjs-webpack-plugin"

export default {
    ...config, 

    mode: 'production', 

    optimization: {
        ...config.optimization, 

        minimizer: [
            new UglifyJsPlugin({
                sourceMap: true, 
                uglifyOptions: {
                    output: {
                        comments: /^\**!|@preserve|@license|@cc_on/
                    }
                }
            })
        ], 

        splitChunks: {
            ...config.optimization.splitChunks,

            // do not name chunks in production
            name: false
        }
    }, 

    plugins: [
        ...config.plugins, 

        new webpack.DefinePlugin({
            'process.env':{
                'NODE_ENV': JSON.stringify('production'), 
                'BABEL_ENV': JSON.stringify('production')
            },
        }), 

        new LicenseInfoWebpackPlugin({
            glob: '{LICENSE,license,License}*'
        }),
    ]
}