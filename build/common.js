/**
 * Webpack Configuration shared by development and production targets
 */

const HtmlWebpackPlugin = require("html-webpack-plugin");
const TsconfigPathsPlugin = require("tsconfig-paths-webpack-plugin");
const ExtractCssChunks = require("extract-css-chunks-webpack-plugin");

const resolve = require("path").resolve;

const env = require("./env");

const nodeModulesTest = (m) => new RegExp(`/node_modules/${m}[\\/]`, '');

module.exports = {
    // input / output
    entry: ['babel-polyfill', './src/index.tsx'],
    output: {
        filename: '[name].js',
        chunkFilename: '[name]-[contenthash].chunk.js',
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
            chunks: 'all',
            minChunks: 1, 
            cacheGroups: {
                default: false,

                // semantic-ui-react: every folder under dist/es is it's own submodule
                semanticUIReact: {
                    test: nodeModulesTest('semantic-ui-react'),
                    priority: -5,
                    name: function(mod) {
                        const subFolder = mod.resource.match(/\/semantic-ui-react\/dist\/es\/([^\/]*)/);
                        return `semantic-ui-react-${subFolder[1]}`;
                    }
                },

                // all other modules: enforce a module based on the folder
                nodeModules: {
                    test: /\/node_modules\//,
                    enforce: true,
                    priority: -10,
                    name: function(mod) {
                        if (!mod.resource) return;
                        const modName = mod.resource.match(/\/node_modules\/([^\/]*)/);
                        return `modules-${modName[1]}`;
                    }
                },

                // assets: each asset is a single chunk
                assets: {
                    test: /\/assets\//,
                    priority: -15,
                    name: function (mod) {
                        if (!mod.resource) return;
                        let assetName = mod.resource.match(/\/assets\/(.*)/);
                        assetName = assetName[1].replace('/', '-').replace('.', '-');
                        return `asset-${assetName}`;
                    }
                },

                // src: each file is a single chunk
                src: {
                    test: /\/src\//,
                    priority: -15,
                    name: function (mod) {
                        if (!mod.resource) return;
                        let srcName = mod.resource.match(/\/src\/(.*)/);
                        srcName = srcName[1].replace('/', '-').replace('.', '-');
                        return `src-${srcName}`;
                    }
                }
                
            }
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