import 'shelljs/global';
const path = require('path');

const express = require('express');
const devMiddleware = require('webpack-dev-middleware');
const hotMiddleware = require('webpack-hot-middleware');
const renderMiddleware = require('./middlewares/render').default;

const webpack = require('webpack');
const config = require('../build/webpack.config');
const configProd = require('../build/webpack.config.prod');

import sass from 'node-sass';
import cssHook from 'css-modules-require-hook';

import subreddit from './routes/subreddit'

if (process.env.NODE_ENV === 'development') {
  const compiler = webpack(config);

  const cssHookConfig = {
    generateScopedName: '[name]__[local]',
    extensions: ['.scss', '.css'],
    preprocessCss: data => sass.renderSync({ data }).css,
  };

  cssHookConfig.processCss = (css = '') => {
    if (!global.inlineCss) global.inlineCss = ''
    global.inlineCss += css
  }

  cssHook(cssHookConfig);

  const app = express();

  app.use((req, res, next) => {
    global.inlineCss = ' ';
    next()
  })

  app.use('/api/subreddit', subreddit)

  app.use(devMiddleware(compiler, { noInfo: true, serverSideRender: true }));
  app.use(hotMiddleware(compiler));
  app.use(renderMiddleware);


  app.listen(3000);

} else {

  const cssHookConfig = {
    generateScopedName: '[name]__[local]',
    extensions: ['.scss', '.css'],
    preprocessCss: data => sass.renderSync({
      data
    }).css
  };

  cssHook(cssHookConfig);


  rm('-rf', path.resolve(__dirname, '../dist'));
  mkdir(path.resolve(__dirname, '../dist'));


  const compiler = webpack(configProd, () => {

    const app = express();

    app.use('/', express.static(path.resolve(__dirname, '../dist')));
    app.use(renderMiddleware);
    app.listen(3000);

  });
}
