const express = require('express');
const devMiddleware = require('webpack-dev-middleware');
const hotMiddleware = require('webpack-hot-middleware');
const renderMiddleware = require('./middlewares/render').default;

const webpack = require('webpack');
const config = require('../build/webpack.config');
const compiler = webpack(config);


import sass from 'node-sass'
import cssHook from 'css-modules-require-hook'

const cssHookConfig = {
  generateScopedName: '[name]__[local]',
  extensions: ['.scss', '.css'],
  preprocessCss: data => sass.renderSync({
    data
  }).css
};

cssHookConfig.processCss = (css = '') => {
  if (!global.inlineCss) global.inlineCss = '';
  global.inlineCss += css;
};

cssHook(cssHookConfig);


const app = express();

app.use(devMiddleware(compiler, { noInfo: true, serverSideRender: true }));
app.use(hotMiddleware(compiler));
app.use(renderMiddleware);

app.listen(3000);