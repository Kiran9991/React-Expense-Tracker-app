import React, { useEffect, useState } from "react";

const ExpenseContext = React.createContext({
  expenses: [],
  addExpense: (expense) => {},
});

export const ExpenseContextProvider = (props) => {
  const [expenses, setExpenses] = useState([]);
  const token = localStorage.getItem('token');

  useEffect(() => {
    async function getExpenses() {
      try {
        const res = await fetch(`https://expensetracker-6f9fd-default-rtdb.firebaseio.com/expenses.json`);
        const data = await res.json();
        let expensesArrObj = [];
        for(let obj in data) {
          expensesArrObj.push(data[obj]);
        }
        setExpenses([...expensesArrObj]);
      } catch(err) {
        console.log(err);
      }
    }
    if(token) {
      getExpenses();
    }
  },[token])

  const addExpenseHandler = async (expense) => {
    try {
      await fetch(
        `https://expensetracker-6f9fd-default-rtdb.firebaseio.com/expenses.json`,
        {
          method: "POST",
          body: JSON.stringify(expense),
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      setExpenses([...expenses, expense]);
    } catch (err) {
      alert(`Failed to add expense`);
      console.log(err);
    }
  };

  const expenseValue = {
    expenses: expenses,
    addExpense: addExpenseHandler,
  };

  return (
    <ExpenseContext.Provider value={expenseValue}>
      {props.children}
    </ExpenseContext.Provider>
  );
};

export default ExpenseContext;
