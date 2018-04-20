import config from "./common"

import webpack from "webpack"

export default {
    ...config, 

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
        ...config.plugins, 
        
        // for development and hot reloading
        new webpack.HotModuleReplacementPlugin(), 
        new webpack.NamedModulesPlugin()
    ]
}