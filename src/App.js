/* eslint-disable import/no-anonymous-default-export */
import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';

const App = () => {
  return (
    <div>
      <BrowserRouter>
        <div>
          {/* <NavBar /> */}
          {/* <Route path="/" exact component={Login} />
                 <Route path="/home" exact component={requireAuth(Home)} /> */}
          Hello World
        </div>
      </BrowserRouter>
    </div>
  );
};

export default App;
