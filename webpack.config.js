const path = require('path');
const nodeExternals = require('webpack-node-externals');
const HtmlWebpackPlugin= require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const webpack = require('webpack')

const clientConfig = {
    mode: 'production',
    entry: './src/index.js',
    output: {
        filename:'client.bundle.js',
        path: path.resolve(__dirname,'dist'),
        publicPath: `http://localhost:3000`
    },
    target: 'web',
    devtool: "source-map",
    module: {
        rules: [{
            test: /\.(js|jsx)$/,
            exclude: /node_modules/,
            use: 'babel-loader',
        },{
            test: /\.css$/i,
            use: [
                {
                    loader: MiniCssExtractPlugin.loader
                },
                'css-loader']
        }]
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: "public/index.html"
        }),
        new webpack.ProvidePlugin({
            "React": "react"
        }),
        new MiniCssExtractPlugin({
            filename: 'bundle.css'
        })
    ]
}

const serverConfig = {
    mode: 'production',
    entry: './server/index.js',
    target: "node",
    externalsPresets: {node: true},
    externals: [nodeExternals()],
    output: {
        path: path.resolve(__dirname,'dist'),
        filename: 'server.bundle.js'
    },
    devtool: "source-map",
    module: {
        rules: [{
            use: 'babel-loader',
            test: /\.(js|jsx)$/,
            exclude: /node_modules/
        },{
            test: /\.css$/i,
            use: [
                {
                    loader: MiniCssExtractPlugin.loader
                },
                'css-loader']
        }]
    },
    plugins: [
        new MiniCssExtractPlugin({
            filename: 'bundle.css'
        }),
        new webpack.ProvidePlugin({
            "React": "react"
        })
    ]
}
module.exports = [clientConfig, serverConfig];
 