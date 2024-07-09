import React, { useState } from "react";

const Login: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
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
      window.location.href = "/home";
    } else {
      const error = await response.json();
      console.error(error.message);
    }
  };

  return (
    <div className="card p-4" style={{ width: "300px" }}>
      <h3 className="text-center mb-4">Login</h3>
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
