const express = require('express');
const app = express();
const devMiddleware = require('webpack-dev-middleware');
const hotMiddleware = require('webpack-hot-middleware');
const historyMiddleware = require('connect-history-api-fallback');

const webpack = require('webpack');
const config = require('../build/webpack.config');
const compiler = webpack(config);

app.use(historyMiddleware());
app.use(devMiddleware(compiler, { noInfo: true }));
app.use(hotMiddleware(compiler));

// const fs = webpackDevMiddleware.fileSystem;
// app.get('*', (req, res) => {
//   fs.readFile(path.join(compiler.outputPath, 'index.html'), (err, file) => {
//     if (err) {
//       res.sendStatus(500)
//     } else {
//       res.send(file.toString())
//     }
//   })
// });


app.listen(3000);