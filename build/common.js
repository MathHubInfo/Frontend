/**
 * Webpack Configuration shared by development and production targets
 */

const HtmlWebpackPlugin = require("html-webpack-plugin");
const TsconfigPathsPlugin = require("tsconfig-paths-webpack-plugin");
const ExtractCssChunks = require("extract-css-chunks-webpack-plugin");

const resolve = require("path").resolve;

const env = require("./env");

module.exports = {
    // input / output
    entry: ['babel-polyfill', './src/index.tsx'],
    output: {
        filename: '[name].js',
        chunkFilename: '[name]-[hash].chunk.js',
        path: resolve(__dirname, "..", "dist"),
        publicPath: env.BROWSER_ROUTER !== '""' ? JSON.parse(env.BROWSER_ROUTER) : undefined,
    },
    

    // load js, typescript and babel
    resolve: {
        extensions: ['.ts', '.tsx', '.js', '.jsx', '.json', '.html'], 

        plugins: [
            new TsconfigPathsPlugin(),
        ]
    },
    module: {
        rules: [

            {
                test: /\.tsx?$/, 
                use: [ 'awesome-typescript-loader' ],
            },

            {
                test: /\.(html)$/,
                use: [ 'html-loader' ],
            }, 

            {
                test: /\.css$/,
                use: [
                    ExtractCssChunks.loader,
                    'css-loader'
                ]
            },

            {
                test: /\.(txt)$/,
                loader: [ 'raw-loader' ],
            }, 

            {
                test: /\.(png|jpg|svg|gif|woff|woff2|eot|ttf)$/,
                use: [{
                    loader: 'url-loader',
                    options: {
                        limit: 8192
                    }
                }]
            }
        ]
    }, 

    // lots of chunk optimistations
    optimization: {
        runtimeChunk: true, 
        splitChunks: {
            chunks: 'all'
        }
    }, 
    
    plugins: [
        // generate index.html
        new HtmlWebpackPlugin({
            template: 'src/index.html',
        }),

        // CSS Extraction Plugin
        new ExtractCssChunks({
            filename: '[name].[hash].css',
            chunkFilename: '[id].[hash].css',
        }),
    ]
};