import React, { useState } from "react";

const Login: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleLogin = async () => {
    setErrorMessage(""); // Clear any previous error messages
    try {
      const response = await fetch("https://localhost:7082/api/Login/Login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      if (response.ok) {
        const data = await response.json();
        localStorage.setItem("token", data.token);
        if (data.is_admin) {
          window.location.href = "/home";
        } else {
          window.location.href = "/user";
        }
      } else {
        const error = await response.json();
        setErrorMessage(error.message || "Login failed. Please try again.");
      }
    } catch (error) {
      setErrorMessage("An error occurred. Please try again later.");
      console.error("Login error:", error);
    }
  };

  return (
    <div className="card p-4" style={{ width: "300px" }}>
      <h3 className="text-center mb-4">Login</h3>
      {errorMessage && (
        <div className="alert alert-danger" role="alert">
          {errorMessage}
        </div>
      )}
      <div className="form-group">
        <input
          type="email"
          className="form-control mb-3"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
        />
      </div>
      <div className="form-group">
        <input
          type="password"
          className="form-control mb-3"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
        />
      </div>
      <button className="btn btn-primary btn-block" onClick={handleLogin}>
        Login
      </button>
    </div>
  );
};

export default Login;
