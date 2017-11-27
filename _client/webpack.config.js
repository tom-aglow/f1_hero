const path = require('path');

module.exports = {
  context: __dirname,
  entry: ['babel-polyfill', './src/ClientApp.jsx'],
  devtool: 'cheap-eval-source-map',
  output: {
    path: path.join(__dirname, 'public/assets'),
    filename: 'bundle.js'
  },
  resolve: {
    extensions: ['.js', '.jsx', '.json']
  },
  stats: {
    colors: true,
    reasons: true,
    chunks: false
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        loader: 'babel-loader'
      },
			{
				test: /\.scss$/,
				use: [{
					loader: "style-loader"
				}, {
					loader: "css-loader"
				}, {
					loader: "sass-loader"
				}]
			}
    ]
  },
  devServer: {
		proxy: {
    	'/auth/twitter': {
    		target: 'http://localhost:5000',
				secure: false
			},
			'/api/*': {
				target: 'http://localhost:5000',
				secure: false
			}
		},
		publicPath: '/assets/',
		historyApiFallback: true
  }
};
