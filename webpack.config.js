/* const path = require("path");
const { merge } = require("webpack-merge");

const parts = require("./webpack.parts");

const TARGET = process.env.npm_lifecycle_event;
const ENABLE_POLLING = process.env.ENABLE_POLLING;
const PATHS = {
  src: path.join(__dirname, "src"),
  style: [path.join(__dirname, "src", "main.css")],
  build: path.join(__dirname, "build"),
  test: path.join(__dirname, "tests"),
};

process.env.BABEL_ENV = TARGET;

const common = merge(
  {
    output: {
      path: PATHS.build,
      filename: "index.bundle.js", //index.bundle.js??
    },
  },
  parts.loadJSX(PATHS.src),
  parts.loadCSS()
);
var config;

// Detect how npm is run and branch based on that
switch (TARGET) {
  case "build":
  case "stats":
    config = merge(common, {
      devtool: "source-map",
      entry: {
        style: PATHS.style,
      },
      output: {
        // TODO: Set publicPath to match your GitHub project name
        // E.g., '/kanban-demo/'. Webpack will alter asset paths
        // based on this. You can even use an absolute path here
        // or even point to a CDN.
        //publicPath: ''
        path: PATHS.build,
        filename: "[name].[chunkhash].js",
        chunkFilename: "[chunkhash].js",
      },
    });
    break;
  case "test":
  case "test:tdd":
    config = merge(common, {
      devtool: "inline-source-map",
    });
    break;
  default:
    config = merge(
      common,
      {
        devtool: "eval-source-map",
        entry: {
          style: PATHS.style,
        },
      },
      parts.devServer({
        host: process.env.HOST || "localhost",
        port: process.env.PORT || "3000",
      })
    );
    break;
}

console.log({
  config,
  modules: config.module.rules,
});
module.exports = config;
 */

const TARGET = process.env.npm_lifecycle_event;

const path = require('path');
const { merge } = require('webpack-merge');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const parts = require('./webpack.parts');

const PATHS = {
  build: path.join(__dirname, 'dist'),
  src: path.join(__dirname, 'src'),
};

const common = merge(
  {
    entry: `${PATHS.src}/index.js`,
    output: {
      path: PATHS.build,
      filename: 'index.bundle.js',
    },
    resolve: {
      extensions: ['', '.js', '.jsx', '.ts', '.tsx'],
      modules: [PATHS.src, 'node_modules'],
    },
    plugins: [
      new CleanWebpackPlugin(),
      new HtmlWebpackPlugin({
        template: `${PATHS.src}/index.html`,
      }),
    ],
  },
  parts.loadTSX(PATHS.src),
  parts.loadJSX(PATHS.src),
);

let config;

switch (TARGET) {
  case 'build':
  case 'stats':
    config = merge(
      common,
      {
        devtool: 'source-map',
        // entry: {
        //   style: `${PATHS.src}/main.css`,
        // },
        output: {
          path: PATHS.build,
          filename: '[name].[chunkhash].js',
          chunkFilename: '[chunkhash].js',
        },
      },
      parts.extractCSS(PATHS.build),
    );
    break;

  default:
    config = merge(
      common,
      {
        devtool: 'inline-source-map',
      },
      parts.devServer(),
      parts.setUpCSS(),
    );
    break;
}

module.exports = config;
