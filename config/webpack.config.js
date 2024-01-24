const ReactRefreshWebpackPlugin = require('@pmmmwh/react-refresh-webpack-plugin'); 
const htmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  output: {
    publicPath: '/'
  },
  entry: "./client/js/Index.jsx",
  mode: "development",
  devServer: {
    static: {
      directory: "./dist"
    },
    hot: true,
    client: {
      logging: 'none'
    },
    historyApiFallback: true
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
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
    ]
  },
  plugins: [
    new htmlWebpackPlugin({
      template: './client/index.html.ejs', 
      bsTheme: process.env.BS_THEME || 'dark',
      favicon: './client/img/iTBS - EditedF.ico'
    }),
    new ReactRefreshWebpackPlugin()
  ],
  resolve: {
    extensions: ['.jsx', '.js'] // Finding specific tags
  }
}
