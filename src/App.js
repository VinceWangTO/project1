/* eslint-disable import/no-anonymous-default-export */
import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';

import requireAuth from './components/require_auth';
import Login from './components/Login';
import Home from './components/Home';

const App = () => {
  return (
    <div>
      <BrowserRouter>
        <div>
          <Route path="/" exact component={Login} />
          <Route path="/home" exact component={requireAuth(Home)} />
        </div>
      </BrowserRouter>
    </div>
  );
};

export default App;
