import React, { Fragment, useContext } from "react";
import { Route, Switch, Redirect } from "react-router-dom";

import AuthForm from "./components/Auth/AuthForm";
import MainNavigation from "./components/Navigation/MainNavigation";
import Home from "./components/home/Home";
import AuthContext from "./components/store/auth-context";
import ForgotPassword from "./components/Auth/forgotPassword/ForgotPassword";
import ExpenseForm from "./components/ExpenseForm/ExpenseForm";

function App() {
  const authCtx = useContext(AuthContext);
  return (
    <Fragment>
      <MainNavigation />
      <Switch>
        <Route path='/home'>
          <Home/>
          {!authCtx.isLoggedIn && <Redirect to='/auth'/>}
        </Route>
        {!authCtx.isLoggedIn && <Route path='/auth'>
          <AuthForm />
        </Route>}
        {!authCtx.isLoggedIn && <Route path='/forgot-password'>
          <ForgotPassword/>
        </Route>}
        {authCtx.isLoggedIn && <Route path="/expense-form">
          <ExpenseForm/>
        </Route>}
      </Switch>
    </Fragment>
  );
}

export default App;
