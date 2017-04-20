import React from 'react';
import { Route, Redirect, Switch } from 'react-router-dom'

import Home from './pages/home';
import Posts from './pages/posts'

const RedirectWithStatus = ({ from, to, status }) => (
  <Route
    render={
      ({ staticContext }) => {
        if (staticContext) staticContext.status = status
        return <Redirect from={from} to={to} />
      }
    }
  />
)

const Routes = () => (
  <div>
    <Switch>
      <Route exact path="/" component={Home} />
      <Route path="/posts/:subreddit" component={Posts} />
      <RedirectWithStatus from={'/derp'} to={'/kerp'} status={300} />
    </Switch>
  </div>
)

export default Routes


// import React from 'react';
// import { IndexRoute, Route } from 'react-router';
//
// import createRootReducer from './redux/rootReducer'
//
// import Layout from './containers/layout';
// import Home from './pages/home';
// import PostPage from './pages/post'
// import NotFound from './pages/not-found';
//
// if (typeof require.ensure !== 'function') {
//   require.ensure = (d, c) => { c(require) } // eslint-disable-line fp/no-mutation
// }
//
// const Routes = store => (
//   <Route path="/" component={Layout}>
//     <IndexRoute component={Home} />
//     <Route
//       path="/posts/:subreddit"
//       getComponents={(nextState, cb) => {
//         require.ensure([], (require) => {
//           // const posts = require('./pages/posts/reducer').default
//           // const postsSaga = require('./pages/posts/sagas').default
//
//           // store.runSaga(postsSaga)
//           // store.replaceReducer(createRootReducer({ posts }))
//
//           cb(null, require('./pages/posts').default)
//         })
//       }}
//     />
//     <Route path="/posts/:id" component={PostPage} />
//     <Route path="*" component={NotFound} />
//   </Route>
// );
//
// export default Routes
