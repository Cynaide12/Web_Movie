const webpack = require("webpack");
const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const CopyPlugin = require("copy-webpack-plugin");
const production = process.env.NODE_ENV === "production";

module.exports = {
  entry: { myAppName: path.resolve(__dirname, "./src/index.js") },
  output: {
    path: path.resolve(__dirname, "./dist"),
    filename: production ? "[name].[contenthash].js" : "[name].js",
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: ["babel-loader"],
      },
      {
        test: /\.s(a|c)ss$/,
        exclude: /node_modules/,
        use: [
          production ? MiniCssExtractPlugin.loader : "style-loader",
          {
            loader: "css-loader",
            options: {
              modules: false,
              sourceMap: !production,
            },
          },
          {
            loader: "sass-loader",
            options: {
              sourceMap: !production,
            },
          },
        ],
      },
      {
        test: /\.css$/,
        use: [
          production ? MiniCssExtractPlugin.loader : "style-loader",
          "css-loader",
        ],
      },
      {
        test: /\.(png|jpe?g|gif|svg )$/i,
        type: "asset/resource",
        generator: {
          filename: "assets/img/[name][ext]",
        },
      },  
      
    ],
  },
  resolve: {
    extensions: [".*", ".js", ".jsx", ".scss", ".css"],
    alias: {
      'src': path.resolve(__dirname, 'src'),
      'components': path.resolve(__dirname, 'src/components'),
      'style': path.resolve(__dirname, 'src/style'),
      'pages': path.resolve(__dirname, 'src/pages'),
      'img': path.resolve(__dirname, 'src/assets/img'),
      'card': path.resolve(__dirname, 'src/assets/img/card')
    },
  },
  plugins: [
    new CleanWebpackPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    new HtmlWebpackPlugin({
      title: "Webpack & React",
      template: "./src/index.html",
      favicon: "./src/assets/img/favicon.png",
    }),
    new MiniCssExtractPlugin({
      filename: production ? "[name].[contenthash].css" : "[name].css",
    }),
    new CopyPlugin({
      patterns: [
        {
          from: "src/assets",
          to: "assets",
          globOptions: {
            ignore: ["**/*.mp4"],
          },
        },
      ],
    }),
  ],
  output: {
    publicPath: '/'
  },
  devServer: {
    port: 3001,
    hot: true,
    historyApiFallback: true,
    proxy: {
      '/auth': 'http://localhost:3000',
      '/movie': 'http://localhost:3000',
    },
    static: {
      directory: path.join(__dirname, 'src'),
      watch: {
        ignored: /node_modules|dist|build|\.git|\.vscode|assets/,
      },
    },
  },
  mode: production ? "production" : "development",
};
