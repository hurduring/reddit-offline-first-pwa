import React from 'react';
import ReactDOM from 'react-dom';
import routes from './routes';
import { Provider } from 'react-redux'
import { createStore, applyMiddleware } from 'redux';
import rootReducer from './redux/rootReducer';
import createSagaMiddleware, { END } from 'redux-saga';
import { Router, browserHistory } from 'react-router';
import sagas from './sagas';

const rootEl = document.getElementById('root');

const sagaMiddleware = createSagaMiddleware();
const store = createStore(rootReducer, window.__INITIAL_STATE__, applyMiddleware(sagaMiddleware));

sagaMiddleware.run(sagas);

if (module.hot) {
  module.hot.accept('./routes', () => {
    ReactDOM.render(
      <Provider store={store}>
         <Router routes={routes()} history={browserHistory} />
      </Provider>,
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
  <Provider store={store}>
     <Router routes={routes()} history={browserHistory} />
  </Provider>,
  rootEl
);