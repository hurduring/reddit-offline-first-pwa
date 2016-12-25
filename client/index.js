import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, applyMiddleware } from 'redux';
import rootReducer from './redux/rootReducer';
import createSagaMiddleware, { END } from 'redux-saga';
import sagas from './sagas';
import App from './app';

const rootEl = document.getElementById('root');

const sagaMiddleware = createSagaMiddleware();
const store = createStore(rootReducer, window.__INITIAL_STATE__, applyMiddleware(sagaMiddleware));

sagaMiddleware.run(sagas);

if (module.hot) {
  module.hot.accept('./app', () => {
    ReactDOM.render(
      <App store={store}/>,
      rootEl
    )
  });
  module.hot.accept('./redux/rootReducer', () => store.replaceReducer(rootReducer));
  module.hot.accept('./sagas', () => {
    store.dispatch(END);
    sagaMiddleware.run(sagas);
  })
}

ReactDOM.render(
  <App store={store}/>,
  rootEl
);