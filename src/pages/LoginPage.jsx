import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { v4 as uuid } from "uuid";

export const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const { registeredUsers,login } = useAuth();


  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    let token;

    const registeredAccount = registeredUsers.find((user) => user.email === email)

    if (!registeredAccount) {
      setError("We couldn't find your account, Please create one.")
      return;
    }

    if (registeredAccount) {
      if (registeredAccount.password !== password) {
        setError('Invalid Login credentials.')
        return;
      }
      token = uuid()
    }

      login(token, {
        email: registeredAccount.email,
        password: registeredAccount.password,
      });
      navigate("/");
  };
  return (
    <div className="max-w-md mx-auto mt-8">
      <div className="bg-white p-8 rounded-lg shadow-md">
        <h1 className="text-2xl font-bold mb-6 text-center">Login</h1>
        {error && (
          <div className="bg-red-50 text-red-500 p-3 rounded mb-4">{error}</div>
        )}
        <form
          onSubmit={handleSubmit}
          className="space-y-4"
        >
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Email
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="mt-1 w-full px-4 py-2 rounded-lg border focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="mt-1 w-full px-4 py-2 rounded-lg border focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition-colors"
          >
            Login
          </button>
        </form>
        <p className="mt-4 text-center text-sm text-gray-600">
          Don't have an account?{" "}
          <Link
            to="/register"
            className="text-blue-500 hover:text-blue-600"
          >
            Register
          </Link>
        </p>
      </div>
    </div>
  );
};