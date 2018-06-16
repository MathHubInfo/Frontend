import {common, env, root } from "./common"

import webpack from "webpack"

import { resolve } from 'path'

export default {
    ...common, 

    // heya we're developing, so be friendly and stuff
    mode: 'development',
    devtool: 'eval-source-map',

    module: {
        ...common.module, 

        rules: [
            ...common.module.rules,

            // tslint only for development
            {
                test: /\.tsx?$/, 
                enforce: 'pre',
                use: [{
                    loader: 'tslint-loader', 
                    options: {
                        configFile: resolve(root, 'tslint.json'), 
                        tsConfigFile: resolve(root, 'tsconfig.json'),
                        typeCheck: true,
                        failOnHint: true,
                    }
                }]
            },

            {
                test: /\.js$/,
                enforce: 'pre', 
                use: [ 'source-map-loader' ]
            }
        ], 
    },

    // add a server for development
    devServer: {
        contentBase: false, 
        publicPath: "/",
        
        // hot reloading
        hot: true, 
        inline: true, 

        // fewer logging
        clientLogLevel: "error", 
        noInfo: true
    }, 

    plugins: [
        ...common.plugins, 

        new webpack.DefinePlugin({
            'process.env': {
                ...env
            },
        }), 
        
        // for development and hot reloading
        new webpack.HotModuleReplacementPlugin(), 
        new webpack.NamedModulesPlugin()
    ]
}