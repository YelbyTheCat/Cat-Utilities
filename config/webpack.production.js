const htmlWebpackPlugin = require('html-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');

module.exports = {
  output: {publicPath: './'},
  entry: {
    main: './client/js/Index.jsx',
    hashMain: './client/js/HashIndex.jsx'
  },
  mode: 'production',
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env', '@babel/preset-react']
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
      favicon: './client/img/iTBS - EditedF.ico',
      base: './',
      chunks: ['main']
    }),
    new htmlWebpackPlugin({
      template: './client/index.html.ejs', 
      bsTheme: process.env.BS_THEME || 'dark',
      favicon: './client/img/iTBS - EditedF.ico',
      base: './',
      chunks: ['hashMain'],
      filename: 'static.html'
    })
  ],
  resolve: {
    extensions: ['.jsx', '.js'] // Finding specific tags
  },
  optimization: {
    minimize: true,
    minimizer: [new TerserPlugin()]
  }
};
