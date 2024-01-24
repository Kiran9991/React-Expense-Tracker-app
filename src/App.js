import React, { Fragment } from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import { useSelector } from 'react-redux';

import AuthForm from "./components/Auth/AuthForm";
import MainNavigation from "./components/Navigation/MainNavigation";
import Home from "./components/home/Home";
import ForgotPassword from "./components/Auth/forgotPassword/ForgotPassword";
import ExpenseForm from "./components/ExpenseForm/ExpenseForm";
import ExpensesList from "./components/Expenses/Lists/ExpensesList";

function App() {
  const isAuth = useSelector((state) => state.auth.isAuthenticated);

  return (
    <Fragment>
      <MainNavigation />
      <Switch>
        <Route path='/home'>
          <Home/>
          {!isAuth && <Redirect to='/auth'/>}
        </Route>
        {!isAuth && <Route path='/auth'>
          <AuthForm />
        </Route>}
        {!isAuth && <Route path='/forgot-password'>
          <ForgotPassword/>
        </Route>}
        {isAuth && <Route path="/expense-form">
          <ExpenseForm/>
          <ExpensesList/>
        </Route>}
      </Switch>
    </Fragment>
  );
}

export default App;
