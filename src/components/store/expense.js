import { createSlice } from '@reduxjs/toolkit';

const token = localStorage.getItem('token');

const getExpenseHandler = async () => {
    try {
      const res = await fetch(
        `https://expensetracker-6f9fd-default-rtdb.firebaseio.com/expenses.json`
      );
      const data = await res.json();
      let expensesArrObj = [];
      for (let obj in data) {
        expensesArrObj.push({ ...data[obj], id: obj });
      }
      return expensesArrObj;
    } catch (err) {
      console.log(err);
    }
}

const addExpenseHandler = async (expense) => {
    try {
        await fetch(
          `https://expensetracker-6f9fd-default-rtdb.firebaseio.com/expenses.json`,
          {
            method: "POST",
            body: JSON.stringify(expense),
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
      } catch (err) {
        alert(`Failed to add expense`);
        console.log(err);
      }
}

const deleteExpenseHandler = async (id) => {
    try {
      const res = await fetch(
        `https://expensetracker-6f9fd-default-rtdb.firebaseio.com/expenses/${id}.json`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      if (res.ok) {
        console.log("successfully deleted!", id);
      }
    } catch (err) {
      console.log(err);
    }
};

const initialExpenseState = {
    expenses: token ? await getExpenseHandler() : [],
    isEdit: false,
    editDetails: {},
}

const expenseSlice = createSlice({
    name: 'expense',
    initialState: initialExpenseState,
    reducers: {
        addExpense(state, action) {
            state.expenses.push(action.payload);
            addExpenseHandler(action.payload);
        },
        deleteExpense(state, action) {
            state.expenses = state.expenses.filter(item => item.id !== action.payload);
            deleteExpenseHandler(action.payload);
        },
        editExpense(state, action) {
            state.isEdit = true;
            state.editDetails = action.payload;
            deleteExpenseHandler(action.payload.id);
            state.expenses = state.expenses.filter(item => item.id !== action.payload.id);
        }
    }
})

export const expenseActions = expenseSlice.actions;

export default expenseSlice.reducer;