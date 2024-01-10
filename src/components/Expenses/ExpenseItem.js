import React from "react";

import "./ExpenseItem.css";

const ExpenseItem = (props) => {
  return (
    <li className="expense-item-li">
      <div className="expense-item__description">
        <h2>{props.title}</h2>
        <h4>{props.category}</h4>
        <div className="expense-item__price">{props.amount}</div>
      </div>
    </li>
  );
};

export default ExpenseItem;
