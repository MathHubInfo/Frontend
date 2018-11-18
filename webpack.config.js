const webpack = require("webpack");
const merge = require("webpack-merge");

const WebpackShellPlugin = require('./build/shell');

const common = require("./build/common");
const env = require("./build/env");

module.exports = merge(common, {
    // heya we're developing, so be friendly and stuff
    mode: 'development',
    devtool: 'eval-source-map',

    // for development, we need rules for linting
    // and for source maps
    module: {
        rules: [
            // source-maps only for development
            {
                test: /\.js$/,
                enforce: 'pre', 
                use: [ 'source-map-loader' ]
            }
        ]
    },

    // add a server for development
    devServer: {
        contentBase: false, 
        publicPath: "/",
        
        // if using BrowserRouter
        historyApiFallback: env.BROWSER_ROUTER !== '""',

        watchOptions: {
            aggregateTimeout: 1000,
            ignored: /node_modules/,
        },

        // hot reloading
        hot: true, 
        inline: true, 

        // fewer logging
        clientLogLevel: "error", 
        noInfo: false,
    }, 

    plugins: [
        new WebpackShellPlugin({
            onBuildStart: ["node_modules/.bin/tslint -c tslint.json -p tsconfig.json"]
        }),

        new webpack.DefinePlugin({
            'process.env': env,
        }), 
        
        // for development and hot reloading
        new webpack.HotModuleReplacementPlugin(), 
        new webpack.NamedModulesPlugin()
    ]
});