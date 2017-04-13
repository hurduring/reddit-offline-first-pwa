import 'isomorphic-fetch'

import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, applyMiddleware, compose } from 'redux';
import createSagaMiddleware, { END } from 'redux-saga';
import { AppContainer } from 'react-hot-loader'

import rootReducer from './redux/rootReducer';
import sagas from './sagas';
import App from './app';

const rootEl = document.getElementById('root');

const sagaMiddleware = createSagaMiddleware();
const store = createStore(
  rootReducer(),
  window.__INITIAL_STATE__,
  compose(
    applyMiddleware(sagaMiddleware),
    window && window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
  ),
);

store.runSaga = sagaMiddleware.run

sagaMiddleware.run(sagas);

if (module.hot) {
  module.hot.accept('./app', () => {
    const NewApp = require('./app').default
    ReactDOM.render(
      <AppContainer>
        <NewApp store={store} />
      </AppContainer>,
      rootEl,
    )
  });

  module.hot.accept('./redux/rootReducer', () => {
    const newRootReducer = require('./redux/rootReducer').default
    store.replaceReducer(newRootReducer())
  });

  module.hot.accept('./sagas', () => {
    const newSagas = require('./sagas').default

    store.dispatch(END);
    sagaMiddleware.run(newSagas);
  })
}

ReactDOM.render(
  <AppContainer>
    <App store={store} />
  </AppContainer>,
  rootEl,
);
