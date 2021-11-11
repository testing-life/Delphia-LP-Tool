import React from "react";
import "./App.css";
import { Routes, Route } from "react-router-dom";
import ProtectedRoute from "./Components/Atoms/ProtectedRoute";
import DashboardPage from "./Pages/Dashboard/Dashboard.page";
import LoginPage from "./Pages/Login/Login.page";

function App() {
  return (
    <Routes>
      <Route path="/login" element={<LoginPage />}></Route>
      <Route
        path="/"
        element={<ProtectedRoute>{<DashboardPage />}</ProtectedRoute>}
      ></Route>
      <Route path="*" element={<LoginPage />}></Route>
    </Routes>
  );
}

export default App;
