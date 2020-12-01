const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');


module.exports = {
    entry: {
        home: './src/pages/Home/index.ts',
        portfolio: './src/pages/Portfolio/index.ts',
        skills: './src/pages/Skills/index.ts',
        contact: './src/pages/Contact/index.ts'
    },
    module: {
        rules: [
            {
                test: /\.scss$/,
                use: [MiniCssExtractPlugin.loader, 'css-loader', 'sass-loader']
            },
            {
                test: /\.tsx?$/,
                use: 'ts-loader',
                exclude: /node_modules/
            },
            {

                test: /\.(png|jp(e*)g|svg)$/,
                use: [{
                    loader: 'url-loader',
                    options: {
                        limit: 0, // Convert images < 8kb to base64 strings
                        name: 'assets/img/[name].[ext]'
                    }
                }]
            }
        ]
    },
    plugins: [
        new CleanWebpackPlugin(),

        new HtmlWebpackPlugin({
            template: './src/pages/Home/index.html',
            inject: 'body',
            filename: 'home.html',
            chunks: ['home']
        }),
        new HtmlWebpackPlugin({
            template: './src/pages/Skills/index.html',
            inject: 'body',
            filename: 'skills.html',
            chunks: ['skills']
        }),
        new HtmlWebpackPlugin({
            template: './src/pages/Portfolio/index.html',
            inject: 'body',
            filename: 'portfolio.html',
            chunks: ['portfolio']
        }),
        new HtmlWebpackPlugin({
            template: './src/pages/Contact/index.html',
            inject: 'body',
            filename: 'contact.html',
            chunks: ['contact']
        }),
        new MiniCssExtractPlugin({
            filename: '[name].[chunkhash].css'
        }),
        new CopyPlugin([
            { from: './src/_redirects', to: '.' },
        ]),
    ],
    resolve: {
        extensions: ['.tsx', '.ts', '.js']
    },
    output: {
        filename: '[name].[chunkhash].js',
        path: path.resolve(__dirname, 'dist')
    },

};