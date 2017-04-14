import React from 'react';
import { IndexRoute, Route } from 'react-router';

import createRootReducer from './redux/rootReducer'

import Layout from './containers/layout';
import Home from './pages/home';
import PostPage from './pages/post'
import NotFound from './pages/not-found';

if (typeof require.ensure !== 'function') {
  require.ensure = (d, c) => { c(require) } // eslint-disable-line fp/no-mutation
}

const Routes = store => (
  <Route path="/" component={Layout}>
    <IndexRoute component={Home} />
    <Route
      path="/posts/:subreddit"
      getComponents={(nextState, cb) => {
        require.ensure([], (require) => {
          const posts = require('./pages/posts/reducer').default
          const postsSaga = require('./pages/posts/sagas').default

          store.runSaga(postsSaga)
          store.replaceReducer(createRootReducer({ posts }))

          cb(null, require('./pages/posts').default)
        })
      }}
    />
    <Route path="/posts/:id" component={PostPage} />
    <Route path="*" component={NotFound} />
  </Route>
);

export default Routes
