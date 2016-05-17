var webpack = require('webpack');
//var commonsPlugin = new webpack.optimize.CommonsChunkPlugin('common.js');
module.exports = {
  entry: {
    entry1: './src/components/MeshGenMainView.js',
  },
  output: {
    path: './server/static/js/',
    filename: 'MeshGenMainView.js'
  },
  resolve: {
    extensions: ['', '.js', '.jsx']
  },
  module: {
    loaders: [{
      test: /\.js$/,
      loader: 'babel-loader!jsx-loader?harmony',
      exclude: /node_modules/,
    }, {
      test: /\.jsx$/,
      loader: 'babel-loader!jsx-loader?harmony',
      exclude: /node_modules/,
    }]
  },
};
