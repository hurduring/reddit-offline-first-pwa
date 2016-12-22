import React from 'react';
import { IndexRoute, Route } from 'react-router';
import Layout from './containers/Layout';
import Home from './containers/Home';
import Counter from './containers/counter';
import NotFound from './containers/not-found';

const Routes = () => (
  <Route path="/" component={Layout}>
    <IndexRoute component={Home}/>
    <Route path="derp" component={Counter}/>
    <Route path="*" component={NotFound}/>
  </Route>
);

export default Routes