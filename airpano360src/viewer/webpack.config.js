const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');

module.exports = {
  entry: './src/index.js',
  output: {
    clean: true,
    filename: 'bundle.js',
    path: path.resolve(__dirname, '../dist'),
  },
  mode: 'development',
  devServer: {
    static: './public',
    port: 3000,
    open: true,
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './public/index.html',
    }),
	new CopyPlugin({
      patterns: [{
        from: path.resolve(__dirname, 'public/panos'),
        to: path.resolve(__dirname, '../dist/panos')
      }]
    }),
	
	new CopyPlugin({
      patterns: [{
        from: path.resolve(__dirname, 'public/panoramas-with-neighbors.json'),
        to: path.resolve(__dirname, '../dist/panoramas-with-neighbors.json')
      }]
    })
  ],
};