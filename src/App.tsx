import React from "react";
import "./App.css";
import { Routes, Route } from "react-router-dom";
import ProtectedRoute from "./Components/Atoms/ProtectedRoute";
import DashboardPage from "./Pages/Dashboard/Dashboard.page";
import LoginPage from "./Pages/Login/Login.page";
import CreatePasswordPage from "./Pages/CreatePassword/CreatePassword.page";
import WalletConnectPage from "./Pages/WalletConnect/WalletConnect.page";

function App() {
  return (
    <Routes>
      <Route path="/login" element={<LoginPage />}></Route>
      <Route
        path="/"
        element={<ProtectedRoute>{<DashboardPage />}</ProtectedRoute>}
      ></Route>
      <Route path="/create-password" element={<CreatePasswordPage />}></Route>

      <Route
        path="/wallet-connect"
        element={<ProtectedRoute>{<WalletConnectPage />}</ProtectedRoute>}
      ></Route>
    </Routes>
  );
}

export default App;
