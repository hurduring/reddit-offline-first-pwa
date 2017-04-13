import express from 'express'
import React from 'react'
import { Provider } from 'react-redux'
import { match, RouterContext } from 'react-router'
import { renderToStaticMarkup } from 'react-dom/server'
import createSagaMiddleware from 'redux-saga';
import { createStore, applyMiddleware } from 'redux';
import purgeCache from '../utils/purge-cache';

const router = express.Router();

router.get('*', (req, res) => {

    let scripts = [], styles = [];

    if (process.env.NODE_ENV === 'development') {
      [
        '../../client/sagas',
        '../../client/routes',
        '../../client/redux/rootReducer',
      ].forEach(purgeCache);

      let mainChunk = res.locals.webpackStats.toJson().assetsByChunkName.main
      if (!Array.isArray(mainChunk)) mainChunk = [mainChunk]
      scripts = scripts.concat(mainChunk.filter(e => e.slice(-3) === '.js'))
      styles = styles.concat(mainChunk.filter(e => e.slice(-4) === '.css'))
    } else {
      scripts = ['main.js']
      styles = ['styles.css']
    }

    const rootSaga = require('../../client/sagas').default;
    const routes = require('../../client/routes').default;
    const rootReducer = require('../../client/redux/rootReducer').default;

    const sagaMiddleware = createSagaMiddleware();
    const store = createStore(rootReducer(), {}, applyMiddleware(sagaMiddleware));
    store.runSaga = sagaMiddleware.run
    sagaMiddleware.run(rootSaga);

    match({ routes: routes(store), location: req.url }, (err, redirectLocation, renderProps) => {
      if (err) {
        res.status(500).send(err.message)
      } else if (redirectLocation) {
        res.redirect(302, redirectLocation.pathname + redirectLocation.search)
      } else if (renderProps) {

        const state = store.getState();
        const inlineStyles = global.inlineCss;

        const html = renderToStaticMarkup((
          <html lang="en">
          <head>
            <script
              dangerouslySetInnerHTML={{
                __html: `
          window.__INITIAL_STATE__ = ${JSON.stringify(state)}
          window.__CLIENT__ = true
        `
              }}
            />
            {<style type="text/css" id="SSRStyles">{inlineStyles}</style>}
            {styles.map(s => <link key={s} rel="stylesheet" href={`/${s}`} />)}
          </head>
          <body>
          <div id="root">
            <Provider store={store}>
              <RouterContext {...renderProps} />
            </Provider>
          </div>
          {scripts.map(s => <script key={s} src={`/${s}`} />)}


          {<script
            dangerouslySetInnerHTML={{ __html: 'document.getElementById("SSRStyles").remove()' }} /> }
          </body>
          </html>
        ))
        res.send(`<!doctype html>${html}`)
      } else {
        res.status(404).send('Not found')
      }
    })
  }
)

export default router
