import { createSlice } from '@reduxjs/toolkit';

const initialAuthState = {
    token: localStorage.getItem("token") || '',
    isAuthenticated: !!localStorage.getItem("token"),
    showPremium: false,
    isPremium: false
}

const authSlice = createSlice({
    name: 'authenticated',
    initialState: initialAuthState,
    reducers: {
        updateToken(state, action) {
            state.token = action.payload;
            localStorage.setItem("token", action.payload);
        },
        removeToken(state) {
            state.token = ''
            localStorage.removeItem('token');
        },
        login(state) {
            state.isAuthenticated =  true;
        },
        logout(state) {
            state.isAuthenticated = false;
            state.showPremium = false;
            state.isPremium = false
        },
        setShowPremium(state, action) {
            state.showPremium = action.payload;
        },
        setIsPremium(state) {
            state.isPremium = true
        }
    }
})

export const authActions = authSlice.actions;

export default authSlice.reducer;