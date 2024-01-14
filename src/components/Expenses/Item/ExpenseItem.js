import React from "react";

import "./ExpenseItem.css";
import Edit from "../Edit/Edit";
import Delete from "../Delete/Delete";

const ExpenseItem = ({ item }) => {
  return (
    <li className="expense-item-li">
      <div className="expense-item__description">
        <h2>{item.title}</h2>
        <h4>{item.category}</h4>
        <Delete id={item.id}/>
        <Edit item={item}/>
        <div className="expense-item__price">Rs.{item.amount}</div>
      </div>
    </li>
  );
};

export default ExpenseItem;
