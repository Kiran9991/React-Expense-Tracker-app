import { useContext } from "react";
import "./Edit.css";
import ExpenseContext from "../../store/expense-context";

const Edit = ({ item }) => {
  const expenseCtx = useContext(ExpenseContext);

  const editHandler = () => {
    expenseCtx.editExpense(item.id, item);
  };

  return (
    <button className="expense-item__edit" onClick={editHandler}>
      Edit
    </button>
  );
};

export default Edit;
