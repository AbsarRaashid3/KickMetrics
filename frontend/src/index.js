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
import DashboardScreen from "./screens/DashboardScreen";
import UserDashboard from "./screens/UserDashboard";
import CoachDashboard from "./screens/CoachDashboard";
import ScoutDashboard from "./screens/ScoutDashboard";
import PlayerPerformanceAnalysis from './screens/PlayerPerformanceAnalysis';
import MarketValue from './screens/MarketValue';
import MarketValuePrediction from './screens/MarketValuePrediction';
import WhatIf from './screens/WhatIfSimulator';
import AdminPanel from './screens/AdminPanel';
import LandingScreen from "./screens/LandingScreen";
import TeamC from './screens/TeamComposition';
import ComparePlayersScreen from "./screens/ComparePlayersScreen";
import EditUserProfile from './components/EditUserProfile';

// Wrapper Component for Protected Routes
const ProtectedRoute = ({ children, adminOnly = false }) => {
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const isAdmin = useSelector((state) => state.auth.user?.isAdmin);

  if (!isAuthenticated) {
    return <Navigate to="/signIn" />;
  }

  if (adminOnly && !isAdmin) {
    return <Navigate to="/" />;
  }

  return children;
};

//add routes there
const router = createBrowserRouter(
  createRoutesFromElements(

    <Route path='/' element={<App />}>
      <Route index={true} path='/' element={<LandingScreen />} />
      <Route path='players' element={<HomeScreen />} />
      <Route path='player/:id' element={<PlayerDetails />} />  
      {/* <Route path='/player' element={<HomeScreen />} /> */}
      <Route path='/signIn' element={<AuthForm />} />
      <Route path='/forgot-password' element={<ResetPassword />} />

      <Route path='/AdminPanel'
        element={
          <ProtectedRoute adminOnly={true}>
            <AdminPanel />
          </ProtectedRoute>
        } />

      <Route path='/dashboard'
        element={
          <ProtectedRoute>
            <DashboardScreen />
          </ProtectedRoute>
        } />

      <Route path='performance-analysis'
        element={
          <ProtectedRoute>
            <PlayerPerformanceAnalysis />
          </ProtectedRoute>
        } />

      <Route path='/dashboard/users'
        element={
          <ProtectedRoute>
            <UserDashboard />
          </ProtectedRoute>
        } />


      <Route path='/dashboard/coaches'
        element={
          <ProtectedRoute>
            <CoachDashboard />
          </ProtectedRoute>
        } />


      <Route path='/dashboard/scouts'
        element={
          <ProtectedRoute>
            <ScoutDashboard />
          </ProtectedRoute>
        } />

      <Route path='compare'
        element={
          <ProtectedRoute>
            <ComparePlayersScreen />
          </ProtectedRoute>
        } />

      <Route path='/teamC'
        element={
          <ProtectedRoute>
            <TeamC />
          </ProtectedRoute>
        } />

      <Route path='market-value'
        element={
          <ProtectedRoute>
            <MarketValue />
          </ProtectedRoute>
        } />

      <Route path='/prediction/:playerId'
        element={
          <ProtectedRoute>
            <MarketValuePrediction />
          </ProtectedRoute>
        } />

      <Route path='/whatif'
        element={
          <ProtectedRoute>
            <WhatIf />
          </ProtectedRoute>
        } />
      <Route path='/edit-user-profile'
        element={
          <ProtectedRoute>
            <EditUserProfile />
          </ProtectedRoute>
        } />

    </Route>
  )
);


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
