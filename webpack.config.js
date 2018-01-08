const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const TransferWebpackPlugin = require('transfer-webpack-plugin');
 
module.exports = {
	entry: './client/index.js',
	output: {
		filename: 'bundle.js',
		path: path.join(__dirname, 'dist')
	},
	module: {
		noParse: /node_modules\/quill/,
		 rules: [
				{
					test: /\.(js|jsx)$/,
					exclude: /node_modules/,
					use: {
						 loader: 'babel-loader',
						  options: {
							presets: ['babel-preset-react', 'babel-preset-es2015'],
							cacheDirectory: true 
						  }
					}
				},
				{
					test: /\.css$/,
					exclude: /node_modules/,
					use: ["style-loader", 'css-loader']
				},
				{
					test: /\.less$/,
					use: ["style-loader", 'css-loader',  "less-loader"],
					exclude: /node_modules/,
				},
				{
					test: /\.(png|jpg|gif|JPG|GIF|PNG|BMP|bmp|JPEG|jpeg)$/,
					exclude: /node_modules/,
					use: [
						{
							loader: 'url-loader',
							options: {
								limit: 8192
							}
						}
					]
				},
				{
					test: /\.(eot|woff|ttf|woff2|svg)$/,
					exclude: /node_modules/,
					use:  ['url-loader']
				}
			]
	  },
	   resolve: {
		extensions: ['.js', '.json', '.sass', '.scss', '.less', 'jsx']
	},
	 devtool: 'source-map',
	 plugins: [
		   new HtmlWebpackPlugin({
			inject: false,
			template: path.join(__dirname, 'client/www/index.html'),
		}),
		new TransferWebpackPlugin([
			/*{
				from: 'static/webfonts',
				to: 'static/webfonts'
			}, */
			{
				from: 'static/img',
				to: 'static/img'
			} ],path.join(__dirname, '/'))
	  ]
	  
};