const path = require('path');
const {CleanWebpackPlugin} = require('clean-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {
  entry: {
    'apps/triangle': './src/apps/triangle.ts'
  },
  output: {
    filename: '[name].js',
    path: path.resolve(__dirname, './dist'),
    libraryTarget: 'amd'
  },
  resolve: {
    extensions: ['.ts', '.js'],
  },
  module: {
    rules: [{
      test: /\.(ts|tsx)$/,
      use: [{
        loader: 'ts-loader',
        options: {
          compilerOptions: {
            declaration: false,
            allowJs: true,
            target: 'es5',
            module: 'commonjs'
          },
          transpileOnly: true
        }
      }]
    },
    {
      test: /\.(glsl)$/i,
      use: [
        {
          loader: 'raw-loader',
        },
      ],
    },]
  },
  plugins: [
    new CleanWebpackPlugin(),
    new CopyWebpackPlugin({
      patterns: [
        { from: 'src/page', to: 'page' }
      ],
    })
  ],
  devServer: {
    contentBase: ['./dist'],
    stats: {
      chunks: true,
    }
  },
};


