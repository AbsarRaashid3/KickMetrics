import React from "react";
import ReactDOM from "react-dom/client";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
import "./assets/styles/bootstrap.custom.css";
import "./assets/styles/index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import HomeScreen from "./screens/HomeScreen";
import PlayerDetails from "./screens/PlayerDetails";
import ComparePlayersScreen from "./screens/ComparePlayersScreen";
import LandingScreen from "./screens/LandingScreen"; // Import the new Landing Screen
import MarketValue from './screens/MarketValue';
import MarketValuePrediction from './screens/MarketValuePrediction';
import PlayerPerformanceAnalysis from './screens/PlayerPerformanceAnalysis';
import TeamC from './screens/TeamComposition';
import WhatIf from './screens/WhatIfSimulator';

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App />}>
      <Route index={true} path="/" element={<LandingScreen />} />
      <Route path="players" element={<HomeScreen />} />
      <Route path="player/:id" element={<PlayerDetails />} />
      <Route path="compare" element={<ComparePlayersScreen />} />
      <Route path="market-value" element={<MarketValue/>} />
      <Route path="/prediction/:playerId" element={<MarketValuePrediction />} />
      <Route path="performance-analysis" element={<PlayerPerformanceAnalysis />} />
      <Route path="/teamC" element={<TeamC />} />
      <Route path="/whatif" element={<WhatIf />} />
    </Route>
  )
);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);

reportWebVitals();
