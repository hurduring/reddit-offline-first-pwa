import React from 'react';
import { IndexRoute, Route } from 'react-router';

import createRootReducer from './redux/rootReducer'

import Layout from './containers/layout';
import Home from './routes/home';
import ReactPage from './routes/react'
import NotFound from './routes/not-found';

if (typeof require.ensure !== 'function') {
  require.ensure = (d, c) => { c(require) } // eslint-disable-line fp/no-mutation
}

const Routes = store => (
  <Route path="/" component={Layout}>
    <IndexRoute component={Home} />
    <Route
      path="/frontend"
      getComponents={(nextState, cb) => {
        require.ensure([], (require) => {
          const frontendReducer = require('./routes/frontend/reducer').default
          const frontendSaga = require('./routes/frontend/sagas').default

          store.runSaga(frontendSaga)
          store.replaceReducer(createRootReducer({ frontendReducer }))

          cb(null, require('./routes/frontend').default)
        })
      }}
    />
    <Route path="/react" component={ReactPage} />
    <Route path="*" component={NotFound} />
  </Route>
);

export default Routes
