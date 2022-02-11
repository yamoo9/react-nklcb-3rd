require('dotenv').config();

const path = require('path');
const ROOT_DIR = process.cwd();

// 개발 | 빌드에서 사용되는 플러그인
const HtmlPlugin = require('html-webpack-plugin');

// 빌드에서만 사용되는 플러그인
const CopyPlugin = require('copy-webpack-plugin');
const CssExtractPlugin = require('mini-css-extract-plugin');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');

// 빌드 결과 분석 플러그인
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');
const SpeedMeasurePlugin = require("speed-measure-webpack-plugin");


const webpackConfig = ({ development, production, analyzer }) => {
  return {
    target: ['web'],
    cache: development ? true : false,
    mode: development ? 'development' : 'production',
    devtool: development ? 'eval-cheap-source-map' : false,

    resolve: {
      extensions: ['.js', '.jsx', '.json', '.wasm'],
      alias: {
        '@': path.resolve(ROOT_DIR, 'src'),
      },
    },

    devServer: {
      static: ['public'],
      compress: true,
      port: 3000,
      client: {
        logging: 'info',
        overlay: true,
      },
    },

    entry: {
      main: {
        import: path.resolve(ROOT_DIR, 'src/index.jsx'),
        dependOn: 'vender',
      },
      // sub: {
      //   import: path.resolve(ROOT_DIR, 'src/sub.jsx'),
      //   dependOn: 'vender',
      // },
      vender: ['react', 'react-dom'],
    },

    output: {
      path: path.resolve(ROOT_DIR, development ? 'public' : 'build'),
      filename: 'js/[name].js',
      clean: true,
    },

    module: {
      rules: [
        development && {
          test: /\.[jt]sx?$/i,
          exclude: /node_modules|public/,
          loader: 'esbuild-loader',
          options: {
            loader: 'jsx',
            target: 'es2015'
          }
        },
        production && {
          test: /\.jsx?$/i,
          exclude: /node_modules|public/,
          use: 'babel-loader',
        },
        {
          test: /\.css$/i,
          use: [
            development ? 'style-loader' : CssExtractPlugin.loader,
            {
              loader: 'css-loader',
              options: {
                mode: "local",
                auto: true,
                exportGlobals: true,
                localIdentName: "[path][name]__[local]--[hash:base64:5]",
                localIdentContext: path.resolve(__dirname, "src"),
                localIdentHashSalt: "my-custom-hash",
                namedExport: true,
                exportLocalsConvention: "camelCase",
                exportOnlyLocals: false,
              }
            },
          ],
        },
      ].filter(Boolean),
    },

    plugins: [
      new HtmlPlugin({
        title: '랜덤 카운트 업 ⌁ React App',
        template: path.resolve(ROOT_DIR, 'public/index.html'),
      }),
      production &&
        new CssExtractPlugin({
          filename: 'css/[name].min.css',
        }),
      production &&
        new CopyPlugin({
          patterns: [
            {
              from: path.resolve(ROOT_DIR, 'public', 'assets'),
              to: path.resolve(ROOT_DIR, 'build', 'assets'),
            },
          ],
        }),
      production &&
        new SpeedMeasurePlugin(),
      analyzer &&
        new BundleAnalyzerPlugin()
    ].filter(Boolean),

    optimization: production && {
      minimize: true,
      minimizer: [
        new CssMinimizerPlugin({
          minimizerOptions: {
            preset: [
              'default',
              {
                discardComments: { removeAll: true },
              },
            ],
          },
        }),
        new TerserPlugin(),
      ],
      splitChunks: {
        cacheGroups: {
          reactResources: {
            test: /[\\/]node_modules[\\/](react|react-dom)[\\/]/,
            name: 'reactResources',
            chunks: 'all',
          },
        },
      },
    },

  };
};

module.exports = webpackConfig;
