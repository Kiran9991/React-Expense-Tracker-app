import React, { useEffect, useState } from "react";

const ExpenseContext = React.createContext({
  expenses: [],
  addExpense: (expense) => {},
  deleteExpense: (id) => {},
  isEdit: false,
  setIsEdit: (val) => {},
  editExpense: (id, data) => {},
});

export const ExpenseContextProvider = (props) => {
  const [expenses, setExpenses] = useState([]);
  const token = localStorage.getItem('token');
  const [isEdit, setIsEdit] = useState(false);

  useEffect(() => {
    async function getExpenses() {
      try {
        const res = await fetch(`https://expensetracker-6f9fd-default-rtdb.firebaseio.com/expenses.json`);
        const data = await res.json();
        let expensesArrObj = [];
        for(let obj in data) {
          expensesArrObj.push({...data[obj], id:obj});
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

  const deleteExpenseHandler = async (id) => {
    try {
      const res = await fetch(`https://expensetracker-6f9fd-default-rtdb.firebaseio.com/expenses/${id}.json`, {
        method: 'DELETE',
        headers: {
          "Content-Type": "application/json",
        }
      })
      if(res.ok) {
        console.log('successfully deleted!', id);
      setExpenses((prev) => prev.filter((item) => item.id !== id));
      }
    }catch (err) {
      console.log(err)
    }
  }

  const setIsEditHandler = (val) => setIsEdit(val);

  const editExpenseHandler = async () => {
  
  }

  const expenseValue = {
    expenses: expenses,
    addExpense: addExpenseHandler,
    deleteExpense: deleteExpenseHandler,
    editExpense: editExpenseHandler,
    isEdit: isEdit,
    setIsEdit: setIsEditHandler
  };

  return (
    <ExpenseContext.Provider value={expenseValue}>
      {props.children}
    </ExpenseContext.Provider>
  );
};

export default ExpenseContext;
