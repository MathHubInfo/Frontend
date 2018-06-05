
import webpack from 'webpack'

import HtmlWebpackPlugin from 'html-webpack-plugin'
import TsconfigPathsPlugin from 'tsconfig-paths-webpack-plugin'
import CleanWebpackPlugin from 'clean-webpack-plugin'

import { resolve } from 'path'

const root = resolve(__dirname, '..')
const dist = resolve(root, 'dist')


// environment variables
export const env = {
    'MMT_URL': JSON.stringify(process.env['MMT_URL']),
    'MOCK_MMT': JSON.stringify(process.env['MOCK_MMT'])
}

export const common = {
    // input / output
    entry: ['babel-polyfill', './src/index.tsx'],
    output: {
        filename: '[name].js',
        chunkFilename: '[name]-[hash].chunk.js',
        path: dist
    },
    
    // for debugging this is insanely useful
    devtool: 'source-map',
    

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
                test: /\.tsx?$/, 
                use: [ 'awesome-typescript-loader' ],
            },

            {
                test: /\.(html)$/,
                use: [ 'html-loader' ],
            }, 

            {
                test: /\.(txt)$/,
                loader: [ 'raw-loader' ],
            }, 

            {
                test: /\.css$/,
                use: [ 'style-loader', 'css-loader' ],
            },

            {
                test: /\.(png|jpg|svg|gif|woff|woff2|eot|ttf)$/,
                use: [ 'url-loader' ],
            }, 
            

            {
                test: /\.js$/,
                enforce: 'pre', 
                use: [ 'source-map-loader' ]
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
        // Cleanup the dist folder automatically
        new CleanWebpackPlugin([dist], {root: root}), 

        // generate index.html
        new HtmlWebpackPlugin({
            template: 'src/index.html'
        }), 

        // and allow lots of hot reloading
        new webpack.HotModuleReplacementPlugin(), 
        new webpack.NamedModulesPlugin()
    ]
};