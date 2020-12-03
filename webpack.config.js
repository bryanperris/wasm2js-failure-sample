const path = require('path');
const webpack = require('webpack');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const WasmPackPlugin = require("@wasm-tool/wasm-pack-plugin");
const WebpackShellPlugin = require('webpack-synchronizable-shell-plugin');

module.exports = (env, args) => {

const isProduction = args.mode === 'production';

const dist = path.resolve(__dirname, 'dist');

return {
    entry: './src/index.ts',
    mode: "web",
    module: {
        rules: [
            {
                test: /\.(ts|tsx)?$/,
                use: [
                    { loader: 'ts-loader'}
                ],
                exclude: [],
            }
        ]
    },
    performance: {
        hints: false
    },
    optimization: {
        minimizer: [
            new TerserPlugin({
                parallel: true,
            })
        ],
    },
    resolve: {
        modules: [
            "src",
            "node_modules"
        ],
        extensions: [ '.tsx', '.ts', '.js', ".wasm", ".mjs", ".cjs", ".json" ]
    },
    output: {
        filename: 'bundle.js',
        path: dist
    },
    plugins: [
        new CleanWebpackPlugin(),

        new webpack.optimize.LimitChunkCountPlugin({
            maxChunks: 1,
        }),

        new WebpackShellPlugin({
            onBuildStart:{
                scripts: ["npm run convert-wasm"],
                blocking: true,
                parallel: false
            }, 
        }),

        new WasmPackPlugin({
            crateDirectory: path.resolve(__dirname, 'mylib'),
            forceMode: 'production'
        }),
    ],
    devtool: 'source-map'
}}