import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider, Navigate } from 'react-router-dom';
import { Provider, useSelector } from "react-redux";

//import files 
import App from './App';
import './assets/styles/bootstrap.custom.css';
import './assets/styles/index.css';
import './assets/styles/authScreen.css';
import reportWebVitals from './reportWebVitals';
import HomeScreen from './screens/HomeScreen';
import PlayerDetails from './screens/PlayerDetails';
import AuthForm from './screens/authScreen';
import ResetPassword from './screens/ResetPassScreen';
import store from "./redux/stores/Store";
import Dashboard from './screens/Dashboard';
import PlayerPerformanceAnalysis from './screens/PlayerPerformanceAnalysis';
import MarketValue from './screens/MarketValue';
import MarketValuePrediction from './screens/MarketValuePrediction';
import WhatIf from './screens/WhatIfSimulator';

// Wrapper Component for Protected Routes
const ProtectedRoute = ({ children }) => {
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  return isAuthenticated ? children : <Navigate to="/signIn" />;
};
//add routes there
const router = createBrowserRouter(
  createRoutesFromElements(

    <Route path='/' element={<App />}>
      <Route index={true} path='/' element={<HomeScreen />} />
      <Route path='playersAll' element={<HomeScreen />} />
      <Route path='player/:id' element={<PlayerDetails />} />

      
      {/* <Route path='/player' element={<HomeScreen />} /> */}
      <Route path='/signIn' element={<AuthForm />} />
      <Route path='/forgot-password' element={<ResetPassword />} />
      <Route path='/dashboard'
        element={
          <ProtectedRoute>
            <Dashboard/>
          
          </ProtectedRoute>
        } />


    </Route>
  )
);

// const router = createBrowserRouter(
//   createRoutesFromElements(
//     <Route path='/' element={<App />}>
//       <Route index={true} path='/' element={<HomeScreen />} />
//       <Route path='playersAll' element={<HomeScreen />} />
//       <Route path='player/:id' element={<PlayerDetails />} />
//       <Route path="performance-analysis" element={<PlayerPerformanceAnalysis />} />
//       <Route path="market-value" element={<MarketValue/>} />
//       <Route path="/prediction/:playerId" element={<MarketValuePrediction />} />
//       <Route path="/whatif" element={<WhatIf />} />
//     </Route>
//   )
// );

//router
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Provider store={store}>              {/*wrap your app with the Provider to give your whole app access to the Redux store.*/}
      <RouterProvider router={router} />
    </Provider>
  </React.StrictMode>
);

reportWebVitals();
