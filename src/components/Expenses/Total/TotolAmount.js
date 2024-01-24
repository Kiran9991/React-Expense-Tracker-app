import { useSelector, useDispatch } from "react-redux";

import "./TotalAmount.css";
import { authActions } from "../../store/auth";

const TotalAmount = () => {
    const dispatch = useDispatch();
  let amount = 0;
  const expenses = useSelector((state) => state.expense.expenses);

  expenses.forEach((item) => (amount += Number(item.amount)));

  if(amount >= 1000) {
    dispatch(authActions.setIsPremium())
  }

  return (
    <div className="amountUI">
      <div className="amountDescription">
        <h2>Total Expense Amount :- {amount}</h2>
      </div>
    </div>
  );
};

export default TotalAmount;
