import React, { useContext } from "react";

import "./ExpensesList.css";
import ExpenseItem from "./ExpenseItem";
import ExpenseContext from "../store/expense-context";

const ExpensesList = () => {
  const expenseCtx = useContext(ExpenseContext)

  if (expenseCtx.expenses.length === 0) {
    return <h2 className="expenses-list_fallback">Found no expenses.</h2>;
  }

  return (
    <ul className="expenses-list">
      {expenseCtx.expenses.map((item) => 
        <ExpenseItem 
        title={item.title}
        amount={item.amount}
        category={item.category}
        />
      )}
    </ul>
  );
};

export default ExpensesList;
