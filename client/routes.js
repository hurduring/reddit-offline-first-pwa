import React from 'react'
import { IndexRoute, Route, Router, browserHistory } from 'react-router'
import Layout from './containers/Layout'
import Home from './containers/Home'

const Routes = () => (
  <Router history={browserHistory}>
    <Route path="/" component={Layout}>
      <IndexRoute component={Home}/>
    </Route>
  </Router>
);

export default Routes