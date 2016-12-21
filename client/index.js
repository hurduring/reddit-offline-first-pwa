import React from 'react';
import ReactDOM from 'react-dom';
import Routes from './routes';
import { Provider } from 'react-redux'
import { createStore, applyMiddleware } from 'redux';
import rootReducer from './redux/rootReducer';
import createSagaMiddleware, { END } from 'redux-saga';
import sagas from './sagas';

const rootEl = document.getElementById('root');

const sagaMiddleware = createSagaMiddleware();
const store = createStore(rootReducer, {}, applyMiddleware(sagaMiddleware));

sagaMiddleware.run(sagas);

if (module.hot) {
  module.hot.accept('./routes', () => {
    ReactDOM.render(
      <Provider store={store}>
        <Routes />
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
    <Routes />
  </Provider>,
  rootEl
);