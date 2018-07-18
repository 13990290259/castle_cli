const webpack = require('webpack');
const path = require('path')
// const vueLoaderConfig = require('./vue-loader.conf')
const VueLoaderPlugin = require('vue-loader/lib/plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')

function resolve(dir) {
    return path.join(__dirname, '..', dir)
}


module.exports = {
    entry: {
        'app': './src/main.ts'
    },
    resolve: {
        extensions: [' ', '.ts', '.vue', '.json', '.js', '.scss', '.css'],
        alias: {
            vue$: 'vue/dist/vue.esm.js',
            '@': resolve('src'),
            src: resolve('src'),
            assets: resolve('src/assets'),
        }
    },
    output: {
        path: path.resolve('dist'),
        filename: "[name].js",
        chunkCallbackName: "chunk[id].js",
        publicPath: "/"
    },
    watchOptions: {
        ignored: /node_modules/,
        aggregateTimeout: 300,
        poll: 1300
    },
    plugins: [
        new webpack.ProvidePlugin({
            jQuery: 'jquery',
            "windows.jQuery": 'jquery',
        }),
        new VueLoaderPlugin(),
    ],
    module: {
        rules: [{
                test: /\.ts$/,
                loader: 'tslint-loader',
                enforce: 'pre',
                exclude: /node_modules/,
                options: {
                    appendTsSuffixTo: [/\.vue$/]
                }
            },
            {
                test: /\.vue$/,
                loader: 'vue-loader',
                // options: vueLoaderConfig
            },
            {
                test: /\.css$/,
                use: [
                    process.env.NODE_ENV !== 'production' ?
                    'vue-style-loader' :
                    MiniCssExtractPlugin.loader,
                    'css-loader'
                ]
            },
            {
                test: /\.tsx?$/,
                use: [
                    // {
                    //     loader: 'babel-loader'
                    // },
                    {
                        loader: 'ts-loader',
                        options: {
                            appendTsSuffixTo: [/\.vue$/]
                        }
                    }
                ],
                exclude: /node_modules/
            },
            // {
            //     test: /\.js$/,
            //     loader: 'babel-loader',
            //     include: [resolve('src'), resolve('test')]
            // },
            {
                test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
                loader: 'url-loader',
                options: {
                    limit: 10000,
                    name: 'img/[name].[hash:7].[ext]'
                }
            },
            {
                test: /\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/,
                loader: 'url-loader',
                options: {
                    limit: 10000,
                    name: 'media/[name].[hash:7].[ext]'
                }
            },
            {
                test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
                loader: 'url-loader',
                options: {
                    limit: 10000,
                    name: 'fonts/[name].[hash:7].[ext]'
                }
            }
        ]
    }
    // devServer: {
    //     inline:true,
    //     compress:true,
    //     host:'0.0.0.0',
    //     port:8085,
    //     historyApiFallback:true,
    // }
}