import { useDispatch } from 'react-redux';

import "./Delete.css";
import { expenseActions } from "../../store/expense";

const Delete = ({ id }) => {
  const dispatch = useDispatch();

  const deleteHandler = async () => {
    dispatch(expenseActions.deleteExpense(id));
  };
  
  return (
    <button className="expense-item__delete" onClick={deleteHandler}>
      Delete
    </button>
  );
};

export default Delete;
