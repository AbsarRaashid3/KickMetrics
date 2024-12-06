//in (Store.js files) you combine slices and apply middleware like Thunk to communicate with backend.
/*Use Redux to manage temporary app state while the app is open like UI.
Use Local Storage to save important data that needs to stay even after a refresh like user info*/
import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../slices/authSlice';
import uiReducer from "../slices/uiSlice";

const store = configureStore({
  reducer: {
    ui: uiReducer,
    auth: authReducer,
  },
});

export default store;