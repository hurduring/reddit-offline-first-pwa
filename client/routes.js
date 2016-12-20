import React from 'react';
import { IndexRoute, Route, Router, browserHistory } from 'react-router';
import Layout from './containers/Layout';
import Home from './containers/Home';
import Counter from './containers/counter';
import NotFound from './containers/not-found';

const Routes = () => (
  <Router history={browserHistory}>
    <Route path="/" component={Layout}>
      <IndexRoute component={Home}/>
      <Route path="derp" component={Counter}/>
    </Route>
    <Route path="*" component={NotFound} />
  </Router>
);

export default Routes