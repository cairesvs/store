const root = require('app-root-path').path;
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const ExtendedDefinePlugin = require('extended-define-webpack-plugin');
const autoprefixer = require('autoprefixer');

const config = {
  BACKEND_HOST: 'http://localhost:3000'
}

const browserConfig = {
  entry: "./src/main/browser/index.tsx",
  output: {
    path: __dirname,
    filename: "./public/bundle.js"
  },
  devtool: "source-map",
  resolve: {
    // Add '.ts' and '.tsx' as resolvable extensions.
    extensions: [".ts", ".tsx", ".js", ".json"]
  },
  module: {
    rules: [
      {
        test: [/\.svg$/, /\.gif$/, /\.jpe?g$/, /\.png$/],
        loader: "file-loader",
        options: {
          name: "public/media/[name].[ext]",
          publicPath: url => url.replace(/public/, "")
        }
      },
      {
        test: /\.css$/,
        use: ExtractTextPlugin.extract({
          use: [
            {
              loader: "css-loader",
              options: { importLoaders: 1 }
            },
            {
              loader: "postcss-loader",
              options: { plugins: [autoprefixer()] }
            }
          ]
        })
      },
      { test: /\.tsx?$/, loader: "awesome-typescript-loader" },
      // All output '.js' files will have any sourcemaps re-processed by 'source-map-loader'.
      { enforce: "pre", test: /\.js$/, loader: "source-map-loader" }
    ]
  },
  plugins: [
    new ExtractTextPlugin({
      filename: "public/css/[name].css"
    }),
    new ExtendedDefinePlugin(config)
  ]
};

const serverConfig = {
  entry: `${root}/bin/www.ts`,
  target: 'node',
  externals: [
    /^[a-z\-0-9]+$/ // Ignore node_modules folder
  ],
  output: {
    filename: 'compiled', // output file
    path: `${root}/build`,
    libraryTarget: "commonjs"
  },
  resolve: {
    // Add in `.ts` and `.tsx` as a resolvable extension.
    extensions: ['.webpack.js', '.web.js', '.ts', '.tsx', '.js'],
    modules: [
      `${root}/node_modules`,
      'node_modules'
    ]
  },
  module: {
    rules: [
      {
        test: [/\.svg$/, /\.gif$/, /\.jpe?g$/, /\.png$/],
        loader: "file-loader",
        options: {
          name: "public/media/[name].[ext]",
          publicPath: url => url.replace(/public/, ""),
          emit: false
        }
      },
      {
        test: /\.css$/,
        use: [
          {
            loader: "css-loader/locals"
          }
        ]
      },
      // All files with a '.ts' or '.tsx' extension will be handled by 'awesome-typescript-loader'.
      { test: /\.tsx?$/, loader: "awesome-typescript-loader" },

      // All output '.js' files will have any sourcemaps re-processed by 'source-map-loader'.
      { enforce: "pre", test: /\.js$/, loader: "source-map-loader" }
    ]
  },
  plugins: [
    new ExtendedDefinePlugin(config)
  ]
};

module.exports = [browserConfig, serverConfig];