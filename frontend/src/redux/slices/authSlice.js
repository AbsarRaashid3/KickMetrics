//slices, which are modular files defining state and reducers for specific parts of your app.
//useEffect hook handles tasks that aren't directly related to rendering.
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isAuthenticated: false,
  user: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    login(state, action) {
      const { user } = action.payload;

      state.isAuthenticated = true;
      state.user = user;
    },

    logout(state) {
      if (state.user) {
        state.isAuthenticated = false;
        state.user = null;
      }
    },
  },
});

export const { login, logout } = authSlice.actions;
export default authSlice.reducer;
