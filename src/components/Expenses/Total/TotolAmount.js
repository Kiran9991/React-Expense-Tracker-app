import { useSelector, useDispatch } from "react-redux";

import "./TotalAmount.css";
import { authActions } from "../../store/auth";

const TotalAmount = () => {
    const dispatch = useDispatch();
  let amount = 0;
  const expenses = useSelector((state) => state.expense.expenses);
  const isPremium = useSelector(state => state.auth.isPremium);
  const userEmail = localStorage.getItem('userEmail')

  expenses.forEach((item) => (amount += Number(item.amount)));

  function makeCsv(expenses) {
    return 'Description, Amount\n'+expenses.map(item => `${item.category},Rs.${item.amount}`).join('\n');
  }

  const downloadExpenseHandler = () => {
    console.log(userEmail)
    const blob = new Blob([makeCsv(expenses)])
    const a = document.createElement('a');
    a.href = URL.createObjectURL(blob);
    a.download = `${userEmail}Expenses.csv`;
    document.body.appendChild(a);
    a.click();
  }

  if(amount >= 1000) {
    dispatch(authActions.setShowPremium(true));
  }

  return (
    <div className="amountUI">
      <div className="amountDescription">
        <h2>Total Expense Amount :- {amount}</h2>
        {isPremium && <button className="downloadBtn" onClick={downloadExpenseHandler}>
          Download Expenses
          </button>}
      </div>
    </div>
  );
};

export default TotalAmount;
