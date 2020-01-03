const path = require(`path`);
const HtmlWebpackPlugin = require(`html-webpack-plugin`);
const MiniCssExtractPlugin = require(`mini-css-extract-plugin`);

module.exports = {
  mode: `development`,
  entry: `./src/index.js`,
  output: {
    filename: `bundle.js`,
    path: path.join(__dirname, `build`)
  },
  devtool: `source-map`,
  devServer: {
    contentBase: path.join(__dirname, `public`), // Откуда поднимаем сервер
    port: 1337,
    hot: true,
    compress: true,
    overlay: true
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: `babel-loader`,
        options: {
          presets: [`@babel/preset-env`],
          plugins: [`@babel/plugin-transform-runtime`]
        }
      },
      {
        test: /\.s[ca]ss$/,
        use: [MiniCssExtractPlugin.loader, `css-loader`, `sass-loader`]
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: `api-practise`,
      template: `./public/index.html`
    }),
    new MiniCssExtractPlugin({
      filename: `[name].css`
    })
  ]
};
