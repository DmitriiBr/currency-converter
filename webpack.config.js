/* eslint @typescript-eslint/no-var-requires: "off" */

const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
  name: 'dm1.br config',
  mode: 'development',
  entry: './src/scripts/index.ts',
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist')
  },
  devtool: 'source-map',
  module: {
    rules:
      [
        {
          test: /\.s[ac]ss$/i,
          use: [
            MiniCssExtractPlugin.loader,
            'css-loader',
            'sass-loader',
          ],
        },
        {
          test: /\.tsx?$/,
          use: 'ts-loader',
          exclude: /node_modules/,
        }
      ],
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js']
  },
  plugins: [
    new MiniCssExtractPlugin({ filename: 'style.min.css' })
  ],
};