const express = require('express');
const app = express();
const historyMiddleware = require('connect-history-api-fallback');
const devMiddleware = require('webpack-dev-middleware');
const hotMiddleware = require('webpack-hot-middleware');

const webpack = require('webpack');
const config = require('../build/webpack.config');
const compiler = webpack(config);

app.use(historyMiddleware());
app.use(devMiddleware(compiler, {
  noInfo: true,
}));
app.use(hotMiddleware(compiler));

app.listen(3000);