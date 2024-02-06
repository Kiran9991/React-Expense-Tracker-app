import React, { Fragment, useEffect } from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import { useSelector, useDispatch } from 'react-redux';

import AuthForm from './components/Auth/Form/AuthForm';
import MainNavigation from "./components/Navigation/MainNavigation";
import Home from "./components/Home/Home";
import ForgotPassword from "./components/Auth/forgotPassword/ForgotPassword";
import ExpenseForm from "./components/ExpenseForm/ExpenseForm";
import ExpensesList from "./components/Expenses/Lists/ExpensesList";
import { fetchExpenses } from "./components/store/expense-action";
import { sendExpensesData } from "./components/store/expense-action";

let isInitial = true;

function App() {
  const dispatch = useDispatch();
  const isAuth = useSelector((state) => state.auth.isAuthenticated);
  const expenses = useSelector((state) => state.expense.expenses);
  const token = localStorage.getItem('token');

  useEffect(() => {
    if(token) {
      dispatch(fetchExpenses());
    }
  }, [dispatch, token]);

  useEffect(() => {
    if(isInitial) {
      isInitial = false;
      return;
    }
    
    dispatch(sendExpensesData(expenses))
  }, [expenses, dispatch])

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
