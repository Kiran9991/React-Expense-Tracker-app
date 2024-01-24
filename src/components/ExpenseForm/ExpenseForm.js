import React, { useRef } from "react";
import { useSelector, useDispatch } from 'react-redux';

import "./ExpenseForm.css";
import { expenseActions } from "../store/expense"; 

const ExpenseForm = () => {
  const dispatch = useDispatch();
  const isEdit = useSelector(state => state.expense.isEdit);
  const editDetails = useSelector(state => state.expense.editDetails);

  const enteredTitle = useRef();
  const enteredAmount = useRef();
  const enteredCategory = useRef();

  if (isEdit) {
    const editData = editDetails;
    enteredTitle.current.value = editData.title;
    enteredAmount.current.value = editData.amount;
    enteredCategory.current.value = editData.category;
  }

  const submitFormHandler = (e) => {
    e.preventDefault();
    const title = enteredTitle.current.value;
    const amount = enteredAmount.current.value;
    const category = enteredCategory.current.value;
    const expenseObj = {
      title,
      amount,
      category,
    };
    dispatch(expenseActions.addExpense(expenseObj));
    enteredTitle.current.value = "";
    enteredAmount.current.value = "";
    enteredCategory.current.value = "";
  };

  return (
    <form className="new-expense__form" onSubmit={submitFormHandler}>
      <div className="new-expense__controls">
        <div className="new-expense__control">
          <label>Title</label>
          <input type="text" id="title" ref={enteredTitle} />
        </div>
        <div className="new-expense__control">
          <label>Amount</label>
          <input type="number" ref={enteredAmount} />
        </div>
        <div className="new-expense__control">
          <label>Category</label>
          <select ref={enteredCategory}>
            <option value="Food">Food</option>
            <option value="Vegetables">Vegetables</option>
            <option value="Petrol">Petrol</option>
            <option value="Salary">Salary</option>
            <option value="ElectricityBills">Electricity Bills</option>
            <option value="Travelling">Travelling</option>
          </select>
        </div>
      </div>
      <div className="new-expense__actions">
        <button type="submit">Add Expense</button>
      </div>
    </form>
  );
};

export default ExpenseForm;
