import { useDispatch } from 'react-redux';

import "./Edit.css";
import { expenseActions } from "../../store/expense";

const Edit = ({ item }) => {
  const dispatch = useDispatch();

  const editHandler = () => {
    dispatch(expenseActions.editExpense(item));
  };

  return (
    <button className="expense-item__edit" onClick={editHandler}>
      Edit
    </button>
  );
};

export default Edit;
