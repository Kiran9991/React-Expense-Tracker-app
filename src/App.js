import React, { Fragment } from "react";
import { Route, Switch } from "react-router-dom";

import AuthForm from "./components/Auth/AuthForm";
import MainNavigation from "./components/Navigation/MainNavigation";
import Home from "./components/Home";

function App() {
  return (
    <Fragment>
      <MainNavigation />
      <Switch>
        <Route path='/home'>
          <Home/>
        </Route>
        <Route path='/auth'>
          <AuthForm />
        </Route>
      </Switch>
    </Fragment>
  );
}

export default App;
