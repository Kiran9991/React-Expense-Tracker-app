import { useContext } from "react";
import "./Delete.css";
import ExpenseContext from "../../store/expense-context";

const Delete = ({ id }) => {
  const expenseCtx = useContext(ExpenseContext);

  const deleteHandler = async () => {
    expenseCtx.deleteExpense(id);
  };
  
  return (
    <button className="expense-item__delete" onClick={deleteHandler}>
      Delete
    </button>
  );
};

export default Delete;
