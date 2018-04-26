import {common, env} from "./common"

import webpack from "webpack"

export default {
    ...common, 

    // heya we're developing
    mode: 'development', 

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