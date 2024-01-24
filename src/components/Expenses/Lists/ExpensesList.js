import { useSelector } from 'react-redux';

import "./ExpensesList.css";
import ExpenseItem from "../Item/ExpenseItem";
import TotalAmount from '../Total/TotolAmount';

const ExpensesList = () => {
  const expenses = useSelector(state => state.expense.expenses);

  if (expenses.length === 0) {
    return <h2 className="expenses-list_fallback">Found no expenses.</h2>;
  }

  return (
    <ul className="expenses-list">
      {expenses.map((item) => 
        <ExpenseItem key={item.id} item={item}/>
      )}
      <TotalAmount/>
    </ul>
  );
};

export default ExpensesList;
