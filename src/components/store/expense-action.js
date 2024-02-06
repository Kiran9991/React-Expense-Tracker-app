import { expenseActions } from "./expense";

export const fetchExpenses = () => {
  return async (dispatch) => {
    const fetchData = async () => {
      const res = await fetch(
        `https://expensetracker-6f9fd-default-rtdb.firebaseio.com/expenses.json`
      );

      if (!res.ok) {
        throw new Error(`Could not fetch data!`);
      }

      const data = await res.json();
      let expensesArrObj = [];
      for (let obj in data) {
        expensesArrObj.push({ ...data[obj], id: obj });
      }
      return expensesArrObj;
    };
    try {
      const expenseData = await fetchData();
      dispatch(expenseActions.replaceExpenses(expenseData));
    } catch (err) {
      console.log(err);
    }
  };
};

export const sendExpensesData = (expense) => {
  return async () => {
    const sendRequest = async () => {
      await fetch(
        `https://expensetracker-6f9fd-default-rtdb.firebaseio.com/expenses.json`,
        {
          method: "PUT",
          body: JSON.stringify(expense),
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
    };
    try {
      await sendRequest();
    } catch (err) {
      alert(`Failed to add expense`);
      console.log(err);
    }
  };
};
