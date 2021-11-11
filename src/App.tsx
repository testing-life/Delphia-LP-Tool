import React from "react";
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ProtectedRoute from "./Components/Atoms/ProtectedRoute";
import DashboardPage from "./Pages/Dashboard/Dashboard.page";
import LoginPage from "./Pages/Login/Login.page";
import WalletConnectPage from "./Pages/WalletConnect/WalletConnect.page";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<LoginPage />}></Route>
        <Route
          path="/"
          element={<ProtectedRoute>{<DashboardPage />}</ProtectedRoute>}
        ></Route>
        <Route
          path="wallet-connect"
          element={<ProtectedRoute>{<WalletConnectPage />}</ProtectedRoute>}
        ></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
