import React from 'react';
import ReactDOM from 'react-dom';
import Routes from './routes';
import { Provider } from 'react-redux'
import { createStore, compose } from 'redux';
import rootReducer from './redux/rootReducer';

const store = createStore(rootReducer, {}, compose(window.devToolsExtension()));

const rootEl = document.getElementById('root');

if (module.hot) {
  module.hot.accept('./routes', () => {
    ReactDOM.render(
      <Provider store={store}>
        <Routes />
      </Provider>,
      rootEl
    )
  });
  module.hot.accepts('./redux/rootReducer', () => store.replaceReducer(rootReducer));
}

ReactDOM.render(
  <Provider store={store}>
    <Routes />
  </Provider>,
  rootEl
);