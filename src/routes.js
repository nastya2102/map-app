import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Map from './Pages/Map';
import Test from './Pages/Test';

function Routes() {
  return <>
    <Switch>
      <Route exact path='/' component={Map}/>
      <Route exact path='/test' component={Test}/>
    </Switch>
  </>;
}

export default Routes;
