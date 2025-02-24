import React from "react";
import {
  MemoryRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";


import { LoginPage } from "./pages/LoginPage";
import { RegisterPage } from "./pages/RegisterPage";
import { Navigation } from "./components/Navigation";
import { AuthProvider } from "./context/AuthContext";
import { ProtectedRoute } from "./components/ProtectedRoute";
import ToDoList  from './pages/ToDoList.jsx';

export default function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="min-h-screen bg-gray-100 w-full">
          <Navigation />
          <main className="container mx-auto px-4 py-8">
            <Routes>
              <Route
                path="/login"
                element={<LoginPage />}
              />
              <Route
                path="/register"
                element={<RegisterPage />}
              />
              <Route
                path="/"
                element={
                  <ProtectedRoute>
                   <ToDoList />
                  </ProtectedRoute>
                }
              />
             
              <Route
                path="*"
                element={
                  <Navigate
                    to="/"
                    replace
                  />
                }
              />
            </Routes>
          </main>
        </div>
      </Router>
    </AuthProvider>
  );
}


