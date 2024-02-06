import { createSlice } from '@reduxjs/toolkit';

const initialExpenseState = {
    expenses: [],
    isEdit: false,
    editDetails: {},
}

const expenseSlice = createSlice({
    name: 'expense',
    initialState: initialExpenseState,
    reducers: {
        addExpense(state, action) {
            state.expenses.push(action.payload);
        },
        deleteExpense(state, action) {
            state.expenses = state.expenses.filter(item => item.id !== action.payload);
        },
        editExpense(state, action) {
            state.isEdit = !state.isEdit;
            state.editDetails = action.payload;
            state.expenses = state.expenses.filter(item => item.id !== action.payload.id);
        },
        replaceExpenses(state, action) {
          state.expenses = action.payload;
        }
    }
})

export const expenseActions = expenseSlice.actions;

export default expenseSlice.reducer;