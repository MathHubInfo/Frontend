const webpack = require("webpack");

const HtmlWebpackPlugin = require('html-webpack-plugin');
const TsconfigPathsPlugin = require('tsconfig-paths-webpack-plugin');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

const path = require("path");

module.exports = {
    // input / output
    entry: ["react", "babel-polyfill", "./src/index.tsx"],
    output: {
        filename: "[name].js",
        chunkFilename: '[name]-[hash].chunk.js',
        path: __dirname + "/dist"
    },
    
    // for debugging this is insanely useful
    devtool: "source-map",
    

    // load js, typescript and babel
    resolve: {
        extensions: [".ts", ".tsx", ".js", ".jsx", ".json", ".html"], 

        plugins: [
            new TsconfigPathsPlugin(),
        ]
    },
    module: {
        rules: [
            {
                test: /\.tsx?$/, 
                use: [ 'awesome-typescript-loader' ]
            },

            {
                test: /\.(html)$/,
                use: {
                    loader: 'html-loader',
                }
            }, 

            {
                test: /\.css$/,
                use: [ 'style-loader', 'css-loader' ]
            },

            {
                test: /\.(png|jpg|svg|gif|woff|woff2|eot|ttf)$/,
                use: [ 'url-loader' ]
            }, 
            

            { enforce: "pre", test: /\.js$/, loader: "source-map-loader" }
        ]
    }, 
    
    // run in devlopment by default
    mode: 'development', 
    optimization: {
        splitChunks: {
            chunks: 'all'
        }
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
        // generate index.html
        new HtmlWebpackPlugin({
            template: 'src/index.html'
        }), 

        // and allow lots of hot reloading
        new webpack.HotModuleReplacementPlugin(), 
        new webpack.NamedModulesPlugin()
    ]
};
