var webpack = require('webpack');
var jQuery = require('jquery');
var path = require('path');
// var ExtractTextPlugin = require("extract-text-webpack-plugin");
var providePlugin = new webpack.ProvidePlugin({$: 'jquery', jQuery: 'jquery', 'window.jQuery': 'jquery'});
module.exports = {
    entry: './src/js/react-2.js',
    output: {
        path: path.resolve(__dirname,'out'),//'./out',
        // publicPath: 'http://localhost:8001/static/',
        filename: 'index.js'
    },


    module: {
        rules: [
            // { test: /\.css$/,loader:ExtractTextPlugin.extract("style-loader", "css-loader")},
            { test: /\.less$/, use: ["style-loader", "css-loader", "less-loader"] },
            {
                test: /\.js$/,
                loader: "babel-loader",
                exclude: /node_modules/,
                query: {
                    presets: [
                        require.resolve('babel-preset-es2015'),
                        require.resolve('babel-preset-react'),
                        require.resolve('babel-preset-stage-0'),
                    ]
                }
            },
            {test: /\.(jpg|png)$/, loader: "url-loader" }
        ]
    },
    devServer: {
        port: 8001,
        historyApiFallback: true,
        inline: true,//注意：不写hot：true，否则浏览器无法自动更新；也不要写colors：true，progress：true等webpack2.x已不支持这些
    },
    plugins: [
        providePlugin,
        // new webpack.NoEmitOnErrorsPlugin(),
        // new ExtractTextPlugin({
            // filename: 'http://localhost:8080/static/bundle.css'
        // })
    ]
}