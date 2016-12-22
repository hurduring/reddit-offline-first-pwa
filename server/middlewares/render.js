import express from 'express'
import React from 'react'
import { Provider } from 'react-redux'
import { match, RouterContext } from 'react-router'
import { renderToStaticMarkup } from 'react-dom/server'
import createSagaMiddleware from 'redux-saga';
import rootReducer from '../../client/redux/rootReducer';
import { createStore, applyMiddleware } from 'redux';

const router = express.Router();

router.get('*', (req, res) => {

  const rootSaga = require('../../client/sagas').default;
  const routes = require('../../client/routes').default;

  const sagaMiddleware = createSagaMiddleware();
  const store = createStore(rootReducer, {}, applyMiddleware(sagaMiddleware));
  sagaMiddleware.run(rootSaga);

  let mainChunk = res.locals.webpackStats.toJson().assetsByChunkName.main;


  if (!Array.isArray(mainChunk)) mainChunk = [mainChunk];
  const scripts = mainChunk.filter(e => e.slice(-3) === '.js');

  match({ routes: routes(store), location: req.url }, (err, redirectLocation, renderProps) => {
    if (err) {
      res.status(500).send(err.message)
    } else if (redirectLocation) {
      res.redirect(302, redirectLocation.pathname + redirectLocation.search)
    } else if (renderProps) {

      const state = store.getState();

      const html = renderToStaticMarkup((
        <html lang="en">
        <head>
          <script
            dangerouslySetInnerHTML={{ __html: `
          window.__INITIAL_STATE__ = ${JSON.stringify(state)}
          window.__CLIENT__ = true
        ` }}
          />
        </head>
        <body>
        <div id="root">
          <Provider store={store}>
            <RouterContext {...renderProps} />
          </Provider>
        </div>
        {scripts.map(s => <script key={s} src={`/${s}`} />)}
        </body>
        </html>
      ))
      res.send(`<!doctype html>${html}`)
    } else {
      res.status(404).send('Not found')
    }
  })
})

export default router