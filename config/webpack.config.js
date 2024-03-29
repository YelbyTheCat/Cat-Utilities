const ReactRefreshWebpackPlugin = require('@pmmmwh/react-refresh-webpack-plugin'); 
const htmlWebpackPlugin = require('html-webpack-plugin');
const webpack = require('webpack');

module.exports = {
  output: {
    publicPath: '/'
  },
  entry: {
    main: ['webpack-hot-middleware/client?quiet=true', './client/js/Index.jsx']
  },
  mode: 'development',
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env', '@babel/preset-react'],
            plugins: [require.resolve('react-refresh/babel')]
          }
        }
      },
      {
        test: /\.css$/i,
        use: ['style-loader', 'css-loader']
      },
      {
        test: /\.(png|svg|jpe?g|gif|ico)$/,
        use: [
          {
            loader: 'file-loader'
          }
        ]
      }
    ]
  },
  plugins: [
    new htmlWebpackPlugin({
      template: './client/index.html.ejs', 
      bsTheme: process.env.BS_THEME || 'dark',
      favicon: './client/img/iTBS - EditedF.ico'
    }),
    new ReactRefreshWebpackPlugin(),
    new webpack.HotModuleReplacementPlugin(),
  ],
  resolve: {
    extensions: ['.jsx', '.js'] // Finding specific tags
  }
};
