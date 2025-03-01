//slices, which are modular files defining state and reducers for specific parts of your app.
//useEffect hook handles tasks that aren't directly related to rendering.

import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    userInfo: localStorage.getItem('userInfo') 
        ? JSON.parse(localStorage.getItem('userInfo')) 
        : null,
};

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setCredentials: (state, action) => {
            state.userInfo = action.payload;
            localStorage.setItem('userInfo', JSON.stringify(action.payload));
        },
        logout: (state, action) =>{
            state.userInfo = null;
            localStorage.removeItem('userInfo');
            console.log("logout called");
        }
    }
});
export const { setCredentials,logout } = authSlice.actions;
export default authSlice.reducer;
