/* eslint-disable import/no-anonymous-default-export */
import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';

import requireAuth from './components/require_auth';
import myLayout from './components/MyTemplate';

import Login from './components/Login';
import DashBoard from './components/Dash';
import Reimbursements from './components/Reimbursements';
import Profile from './components/Profile';

const App = () => {
  return (
    <div>
      <BrowserRouter>
        <div>
          <Route path="/" exact component={Login} />
          <Route
            path="/dashboard"
            exact
            component={requireAuth(myLayout(DashBoard, 'Dash Board', 1))}
          />
          <Route
            path="/reimbursement"
            exact
            component={requireAuth(
              myLayout(Reimbursements, 'Reimbursements', 2)
            )}
          />
          <Route
            path="/profile"
            exact
            component={requireAuth(myLayout(Profile, 'My Profile', 3))}
          />
        </div>
      </BrowserRouter>
    </div>
  );
};

export default App;
