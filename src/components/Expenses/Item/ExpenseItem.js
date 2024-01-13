import React from "react";

import "./ExpenseItem.css";
import Edit from "../Edit/Edit";
import Delete from "../Delete/Delete";

const ExpenseItem = ({ id, title, category, amount}) => {
  return (
    <li className="expense-item-li">
      <div className="expense-item__description">
        <h2>{title}</h2>
        <h4>{category}</h4>
        <Delete id={id}/>
        <Edit id={id}
        title={title}
        category={category}
        amount={amount}/>
        <div className="expense-item__price">Rs.{amount}</div>
      </div>
    </li>
  );
};

export default ExpenseItem;
