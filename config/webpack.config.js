const htmlWebpackPlugin = require('html-webpack-plugin');
const webpack = require('webpack');

module.exports = {
  entry: "./client/js/Index.jsx",
  mode: "development",
  devServer: {
    static: {
      directory: "./dist"
    },
    hot: true
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ['@babel/preset-env', '@babel/preset-react']
          }
        }
      },
    ]
  },
  plugins: [
    new htmlWebpackPlugin({
      template: './client/index.html.ejs', 
      bsTheme: process.env.BS_THEME || 'dark',
      favicon: './client/img/iTBS - EditedF.ico'
    })
    // new webpack.HotModuleReplacementPlugin()
    
  ],
  resolve: {
    extensions: ['.jsx', '.js'] // Finding specific tags
  }
}
