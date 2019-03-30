import React from "react";
import { Router } from 'react-router';
import { Switch, Route } from 'react-router-dom'

import App from '../App';
import Home from '../containers/Home';
import Login from '../containers/Login';
import Users from '../containers/Users';
import Registration from '../containers/Registration';
import NotFound from '../components/NotFound';
import { RequireAuth } from '../components/RequireAuth';


import history from '../history';

const routes = (
  <App>
    <Router history={history}>
      <Switch>
        <Route path="/" exact component={Home} component={RequireAuth(Home)} />
        <Route path="/login" component={Login} />
        <Route path="/users" component={Users} component={RequireAuth(Users)} />
        <Route path="/registration" component={Registration} />
        <Route component={NotFound} />
      </Switch>
    </Router>
  </App>
);
export default routes;