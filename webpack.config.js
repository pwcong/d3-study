const path = require('path');
const klaw = require('klaw-sync');
const webpack = require('webpack');

const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const HTMLWebpackPlugin = require('html-webpack-plugin');
const VirtualModulesPlugin = require('webpack-virtual-modules');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const { NODE_ENV, LESSON_NAME } = process.env;

const isProd = NODE_ENV === 'production';

const distPath = path.resolve(__dirname, 'docs');

let entryPath = null;
let virtualModules = null;

if (isProd) {
  const srcPath = path.resolve(__dirname, 'src');
  entryPath = path.join(srcPath, 'entry.tsx');

  const modules = klaw(srcPath, {
    nofile: true,
    depthLimit: 1
  })
    .map(d => path.relative(srcPath, d.path))
    .filter(d => d.match(/^\d\..*$/))
    .map(p => ({
      path: path.join(srcPath, `${p}/index.tsx`).replace(/\\/g, '/'),
      name: p
    }));

  const entryCode = `
import React from 'react';
import ReactDOM from 'react-dom';
import { Route, NavLink, Redirect } from 'react-router-dom';
import { HashRouter as Router } from 'react-router-dom';

${modules.map((m, i) => `import App${i} from '${m.path}';`).join('\n')}

ReactDOM.render(
  <Router>
    <div className="container" style={{
      padding: '8px'
    }}>
      <div className="navs" style={{
        textAlign: 'center'
      }}>
      ${modules
        .map(
          m => `
        <NavLink exact={true} to="/${m.name}" style={{
          padding: '4px 8px',
          whiteSpace: 'nowrap'
        }}>
          ${m.name}
        </NavLink>
      `
        )
        .join('\n')}
      </div>
      <div className="apps" style={{
        border: '1px solid #eee',
        marginTop: '16px',
      }}>
        <Redirect exact={true} from="/" to="/${modules[0].name}" />
      ${modules
        .map(
          (m, i) => `
        <Route exact={true} path="/${m.name}" component={App${i}} />
      `
        )
        .join('\n')}
      </div>
    </div>
  </Router>,
  document.getElementById('app')
);
`;

  virtualModules = new VirtualModulesPlugin({
    [entryPath]: entryCode
  });
} else {
  const srcPath = path.resolve(__dirname, `src/${LESSON_NAME}`);

  entryPath = path.join(srcPath, 'entry.tsx');

  const entryCode = `
import React from 'react';
import ReactDOM from 'react-dom';
import App from '${path.join(srcPath, 'index.tsx').replace(/\\/g, '/')}';

ReactDOM.render(<App />, document.getElementById('app'));
`;

  virtualModules = new VirtualModulesPlugin({
    [entryPath]: entryCode
  });
}

const commonCssLoaders = [
  isProd ? MiniCssExtractPlugin.loader : 'style-loader',
  'css-loader',
  {
    loader: 'postcss-loader',
    options: {
      plugins: [require('postcss-preset-env')()]
    }
  }
];

module.exports = {
  mode: isProd ? 'production' : 'development',
  entry: {
    index: entryPath,
    vendors: ['react', 'react-dom']
  },
  output: {
    path: distPath,
    filename: 'js/[name].[hash].js'
  },
  module: {
    rules: [
      {
        enforce: 'pre',
        test: /\.tsx?$/,
        exclude: /node_modules/,
        loader: 'eslint-loader'
      },
      { test: /\.tsx?$/, loader: 'ts-loader' },
      {
        test: /\.scss$/,
        use: [...commonCssLoaders, 'sass-loader']
      },
      {
        test: /\.css$/,
        use: commonCssLoaders
      },
      {
        test: /\.(png|jpg|gif|svg)$/,
        loader: 'file-loader',
        options: {
          name: 'imgs/[name].[ext]?[hash]'
        }
      }
    ]
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src')
    },
    extensions: ['.js', '.ts', '.tsx']
  },
  optimization: {
    splitChunks: {
      cacheGroups: {
        commons: {
          test: /[\\/]node_modules[\\/]/,
          name: 'vendors',
          chunks: 'all'
        }
      }
    }
  },
  devtool: 'source-map',
  devServer: {
    historyApiFallback: true,
    port: 3000,
    contentBase: ['./'],
    inline: true,
    publicPath: '/',
    hot: true
  },
  plugins: [
    new CleanWebpackPlugin(),
    new HTMLWebpackPlugin({
      title: `D3 Study - ${LESSON_NAME}`,
      template: 'src/index.ejs'
    }),
    new MiniCssExtractPlugin({
      filename: 'css/[name].[hash].css',
      allChunks: true
    }),
    virtualModules
  ].concat(isProd ? [] : [new webpack.HotModuleReplacementPlugin()])
};
