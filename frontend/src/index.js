import React from 'react';
import ReactDOM from 'react-dom/client';
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider
} from 'react-router-dom';
//import 'bootstrap/dist/css/bootstrap.min.css'; // Import Bootstrap CSS
import './assets/styles/bootstrap.custom.css';
import './assets/styles/index.css'; 
import App from './App';
import reportWebVitals from './reportWebVitals';
import HomeScreen from './screens/HomeScreen';
import PlayerDetails from './screens/PlayerDetails';
import PlayerPerformanceAnalysis from './screens/PlayerPerformanceAnalysis';
import MarketValue from './screens/MarketValue';
import MarketValuePrediction from './screens/MarketValuePrediction';
import WhatIf from './screens/WhatIfSimulator';



const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path='/' element={<App />}>
      <Route index={true} path='/' element={<HomeScreen />} />
      <Route path='playersAll' element={<HomeScreen />} />
      <Route path='player/:id' element={<PlayerDetails />} />
      <Route path="performance-analysis" element={<PlayerPerformanceAnalysis />} />
      <Route path="market-value" element={<MarketValue/>} />
      <Route path="/prediction/:playerId" element={<MarketValuePrediction />} />
      <Route path="/whatif" element={<WhatIf />} />
    </Route>
  )
);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
  
    <RouterProvider router={router} />
  </React.StrictMode>
);

reportWebVitals();
