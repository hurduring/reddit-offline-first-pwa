const express = require('express');
const devMiddleware = require('webpack-dev-middleware');
const hotMiddleware = require('webpack-hot-middleware');
const renderMiddleware = require('./middlewares/render').default;

const webpack = require('webpack');
const config = require('../build/webpack.config');
const compiler = webpack(config);

const app = express();

app.use(devMiddleware(compiler, { noInfo: true, serverSideRender: true }));
app.use(hotMiddleware(compiler));
app.use(renderMiddleware);

app.listen(3000);