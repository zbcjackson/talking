var path = require('path')
var webpack = require('webpack')

module.exports = {
  devtool: 'cheap-module-source-map',
  entry: [
    './src/app/index'
  ],
  resolve: {
    extensions: ["", ".js", ".jsx"]
  },
  devServer:{
    contentBase: 'src/www/',  //Relative directory for base of server
    devtool: 'eval',
    inline: true,
    port: 8080        //Port Number
  },
  output: {
    path: path.join(__dirname, 'src/www'),
    filename: 'page.js',
    publicPath: 'src/www/'
  },
  plugins: [
    new webpack.optimize.OccurenceOrderPlugin()
  ],
  module: {
    loaders: [{
      test: /\.js$/,
      loaders: [ 'babel-loader' ],
      exclude: /node_modules/,
      include: __dirname
    },
    {
      test: /\.scss$/,
      loader: 'style!css!sass'
    }]
  }
};
