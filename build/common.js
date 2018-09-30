import HtmlWebpackPlugin from 'html-webpack-plugin'
import TsconfigPathsPlugin from 'tsconfig-paths-webpack-plugin'
import HardSourceWebpackPlugin from 'hard-source-webpack-plugin';

import { resolve } from 'path'

export const root = resolve(__dirname, '..')
export const dist = resolve(root, 'dist')


// environment variables
export const env = (function(user){
    const _env = {
        'MATHHUB_VERSION': JSON.stringify(require("../package.json").version),
        'MATHHUB_BUILD_TIME': JSON.stringify((new Date()).getTime()),
    }
    
    for (var key in user){
        if (user.hasOwnProperty(key)) {
            _env[key] = JSON.stringify(
                user[key](process.env[key]).toString()
            );
        }
    }

    return _env;
})(require("./env"));

export const common = {
    // input / output
    entry: ['babel-polyfill', './src/index.tsx'],
    output: {
        filename: '[name].js',
        chunkFilename: '[name]-[hash].chunk.js',
        path: dist
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
            template: 'src/index.html'
        }),
        
        /*
        new HardSourceWebpackPlugin({
            configHash: function(webpackConfig) {
                let hash = [
                    webpackConfig, 
                    require('../tsconfig.json'),
                    JSON.parse(require('fs').readFileSync(resolve(root, '.babelrc'))),
                    require('../tslint.json'),
                    require('../package.json').browserslist
                ].map(o => require('node-object-hash')({sort: false}).hash(o)).join('-');
                
                // and then also all our user-environment
                for(var key in require('./env')){
                    hash += '-' + (process.env[key] || '');
                }
                return require('crypto').createHash('md5').update(hash).digest('hex');
            }
        })*/
    ]
};