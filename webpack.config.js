// const path = require('path');
// const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const WebpackShellPluginNext = require("webpack-shell-plugin-next");
const CopyPlugin = require("copy-webpack-plugin");
const { GenerateSW } = require("workbox-webpack-plugin");
const gameRoot = process.cwd();
const Webpack = require("webpack");

// get git info from command line
const commitHash = require("child_process")
  .execSync("git describe --tags")
  .toString()
  .trim();

// the path(s) that should be cleaned
const pathsToClean = ["build"];

// the clean options to use
const cleanOptions = {
  verbose: true,
  dry: false,
};

const config = {
  // bundle javascript
  entry: `${gameRoot}/src/index.js`,
  output: {
    path: `${gameRoot}/build`,
    filename: "struktogramm.js",
  },
  resolve: { symlinks: false },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: ["/node_modules/", "/build_tools/"],
        use: {
          loader: "babel-loader",
        },
      },
      {
        test: /\.scss$/,
        use: [
          MiniCssExtractPlugin.loader,
          {
            loader: "css-loader",
            options: {},
          },
          "sass-loader",
        ],
      },
      {
        test: /\.svg$/,
        use: {
          loader: "svg-url-loader",
          options: {},
        },
      },
    ],
  },
  plugins: [
    new Webpack.DefinePlugin({
      __COMMIT_HASH__: JSON.stringify(commitHash),
    }),
    new WebpackShellPluginNext({
      onBuildStart: {
        scripts: ["node ./build_tools/prepareSvg.js"],
        blocking: true,
        parallel: false,
      },
    }),
    new CleanWebpackPlugin({ pathsToClean, cleanOptions }),
    new MiniCssExtractPlugin({
      filename: "struktogramm.css",
      chunkFilename: "[name].css",
    }),
    new HtmlWebpackPlugin({
      title: "Struktog.",
      template: "./src/index.html",
      meta: {
        viewport: "width=device-width, initial-scale=1, user-scalable=no",
        "msapplication-TileColor": "#2d89ef",
        "theme-color": "#ffffff",
      },
    }),
    new CopyPlugin({
      patterns: [{ from: "*", to: "./build/" }, "./src/assets/examples/"],
      options: {
        concurrency: 100,
      },
    }),
  ],
  devServer: {
    port: 8081,
    contentBase: "./src",
    watchOptions: {
      poll: true,
    },
    open: true,
  },
};

module.exports = (env, argv) => {
  const isDev = argv && argv.mode === "development";
  // Mode setzen
  config.mode = isDev ? "development" : "production";

  if (isDev) {
    // Schnellere & detailreichere Source-Maps
    config.devtool = "eval-source-map";

    // Alle Optimierungen deaktivieren
    config.optimization = {
      minimize: false,
      splitChunks: false,
      runtimeChunk: false,
      moduleIds: "named",
      chunkIds: "named",
    };

    // SCSS-Regel anpassen: style-loader statt CSS-Extraktion
    const sassRule = config.module.rules.find((r) =>
      r.test.toString().includes("scss")
    );
    if (sassRule) {
      sassRule.use = ["style-loader", "css-loader", "sass-loader"];
    }

    // Plugins für Dev-Workflow filtern
    config.plugins = config.plugins.filter(
      (plugin) =>
        !(plugin instanceof MiniCssExtractPlugin) &&
        !(plugin instanceof CleanWebpackPlugin) &&
        !(plugin instanceof CopyPlugin)
    );
  } else {
    // Production-Sourcemaps (falls benötigt)
    config.devtool = "source-map";

    config.plugins.push(
      new GenerateSW({
        swDest: "sw.js",
        clientsClaim: true,
        skipWaiting: true,
        cleanupOutdatedCaches: true,
        navigateFallback: "/index.html",
        runtimeCaching: [
          {
            urlPattern: /\/assets\/examples\/.*\.json$/,
            handler: "NetworkFirst",
            options: {
              cacheName: "example-json-cache",
            },
          },
        ],
      })
    );
  }

  return config;
};
