//in (Store.js files) you combine slices and apply middleware like Thunk to communicate with backend.
/*Use Redux to manage temporary app state while the app is open like UI.
Use Local Storage to save important data that needs to stay even after a refresh like user info*/
import { configureStore } from '@reduxjs/toolkit';
import authSliceReducer from '../slices/authSlice';
import uiReducer from "../slices/uiSlice";
import { apiSlice } from '../slices/apiSlice';
import { externalApiSlice } from '../slices/externalApiSlice';

const store = configureStore({
  reducer: {
    [apiSlice.reducerPath]: apiSlice.reducer,
    [externalApiSlice.reducerPath]: externalApiSlice.reducer,
    ui: uiReducer,
    auth: authSliceReducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware({
    serializableCheck: {
      // Ignore these action types
      ignoredActions: ['your-action-type'],
      // Ignore these field paths in all actions
      ignoredActionPaths: ['meta.arg', 'payload.timestamp'],
      // Ignore these paths in the state
      ignoredPaths: ['items.dates'],
    },
  }).concat(apiSlice.middleware).concat(externalApiSlice.middleware),
  devTools: true,
});

export default store;