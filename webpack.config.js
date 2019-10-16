const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');


module.exports = {
    entry: {
        home: './src/pages/Home/index.ts',
        portfolio: './src/pages/Portfolio/index.ts',
        skills: './src/pages/Skills/index.ts',
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
                        limit: 8000, // Convert images < 8kb to base64 strings
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
        new MiniCssExtractPlugin({
            filename: '[name].[chunkhash].css'
        }),
    ],
    resolve: {
        extensions: ['.tsx', '.ts', '.js']
    },
    output: {
        filename: '[name].[chunkhash].js',
        path: path.resolve(__dirname, 'dist')
    },

};