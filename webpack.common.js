const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: './src/main.ts',
  plugins: [
    new HtmlWebpackPlugin({
      title: 'Wobbly matrix',
    }),
  ],
  output: {
    filename: 'main.js',
    path: path.resolve(__dirname, 'dist'),
    clean: true,
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
    ],
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js'],
    alias: {
      '@classes': path.resolve(__dirname, 'src/classes'),
      '@interfaces': path.resolve(__dirname, 'src/interfaces'),
      '@config': path.resolve(__dirname, 'src/config'),
    },
  },
};
