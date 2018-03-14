const path = require('path');
const webpack = require('webpack');

const config = {
	context: __dirname,
	entry: [
		'react-hot-loader/patch',
		'webpack-dev-server/client?http://localhost:8080',
		'webpack/hot/only-dev-server',
		'babel-polyfill',
		'./src/ClientApp.jsx'
	],
	devtool: 'cheap-eval-source-map',
	output: {
		path: path.join(__dirname, 'public/assets'),
		filename: 'bundle.js',
		publicPath: '/assets/'
	},
	resolve: {
		extensions: ['.js', '.jsx', '.json']
	},
	stats: {
		colors: true,
		reasons: true,
		chunks: false
	},
	plugins: [
		new webpack.HotModuleReplacementPlugin(),
		new webpack.NamedModulesPlugin()
	],
	module: {
		rules: [
			{
				test: /\.jsx?$/,
				loader: 'babel-loader'
			},
			{
				test: /\.scss$/,
				use: [
					{
						loader: 'style-loader'
					},
					{
						loader: 'css-loader'
					},
					{
						loader: 'sass-loader'
					},
					{
						loader: 'postcss-loader'
					}
				]
			}
		]
	},
	devServer: {
		hot: true,
		proxy: {
			'/auth/*': {
				target: 'http://localhost:3001',
				secure: false
			},
			'/api/*': {
				target: 'http://localhost:3001',
				secure: false
			}
		},
		publicPath: '/assets/',
		historyApiFallback: true
	}
};

if (process.env.NODE_ENV === 'production') {
	config.entry = ['babel-polyfill', './src/ClientApp.jsx'];
	config.devtool = false;
	config.plugins = [];
}

module.exports = config;
