var webpack = require('webpack');
var path = require('path');
var HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
	entry: {
		'main': './src/main.js',
		'vendor': ['jquery']
	},
	output: {
		path: path.resolve(__dirname, './build'),
		filename: 'js/[name].js'
	},
	module: {
		loaders: [
			{
				test: /\.js$/,
				exclude: /node_modules/,
				loader: 'babel-loader'
			}
		]
	},
	devServer: {
		host: process.env.HOST,
		overlay: {
			errors: true,
			warnings: true
		},
		hotOnly: true
	},
	devtool: 'source-map',
	plugins: [
		new HtmlWebpackPlugin({
			filename: 'index.html',
			template: './index.html'
		}),
		new webpack.optimize.CommonsChunkPlugin({
			name: 'vendor',
			chunks: ['vendor']
		}),
		new webpack.optimize.UglifyJsPlugin({
	      compress: {
	        warnings: false
	      }
	    })
	]
}