import React from "react";
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ProtectedRoute from "./Components/Atoms/ProtectedRoute";
import DashboardPage from "./Pages/Dashboard/Dashboard.page";
import LoginPage from "./Pages/Login/Login.page";
import CreatePasswordPage from "./Pages/CreatePassword/CreatePassword.page";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<LoginPage />}></Route>
        <Route
          // path="/create-password?userName=thisbeemail@test.com&invitationToken=abc123"
          path="/create-password"
          element={<CreatePasswordPage />}
        ></Route>
        <Route
          path="/"
          element={<ProtectedRoute>{<DashboardPage />}</ProtectedRoute>}
        ></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
