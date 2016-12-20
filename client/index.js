import React from 'react';
import ReactDOM from 'react-dom';
import Routes from './routes';

const rootEl = document.getElementById('root');

if (module.hot) {
  module.hot.accept('./routes', () => {
    ReactDOM.render(
      <Routes />,
      rootEl
    )
  });
}

ReactDOM.render(
  <Routes />,
  rootEl
);