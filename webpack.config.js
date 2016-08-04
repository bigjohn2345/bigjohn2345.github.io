var webpack = require('webpack');
module.exports = {
  entry: {
    filename: "./main.js"
  },
  output: {
    filename: "./bundle.js"
  },
  module: {
    loaders: [
    {
      test: /\.(js|jsx)$/,
      exclude: /node_modules/,
      loader: 'babel-loader',
      query: {
        presets: ['es2015','react', 'stage-2']
      }
    },
    {
      test: /\.scss$/,
      loaders: ["style", "css", "sass"]
    },
    {
      test: /\.html$/,
      loader: "raw-loader"
    }
    ]
  },
  resolve: {
    extensions: ['', '.js', '.jsx']
  },
  sassLoader: {
    includePaths: [ require('bourbon').includePaths ]
  },
};
