import React from "react";
import { Router } from 'react-router';
import { Switch, Route } from 'react-router-dom'

import App from '../App';
import Login from '../containers/Login';
import Users from '../containers/Users';
import Registration from '../containers/Registration';
import NotFound from '../components/NotFound';
import { CheckAuth } from '../components/CheckAuth';


import history from '../history';

const routes = (
  <App>
    <Router history={history}>
      <Switch>
        <Route path="/login" component={Login} component={CheckAuth(Login)}/>
        <Route path="/users" component={Users} component={CheckAuth(Users)} />
        <Route path="/registration" component={Registration} />
        <Route component={NotFound} />
      </Switch>
    </Router>
  </App>
);
export default routes;