import React from "react";
import { useAuth } from "../AuthContext";

const Logout: React.FC = () => {
  const { logout } = useAuth();

  const handleLogout = () => {
    logout();
    // Kullanıcıyı login sayfasına yönlendirin
    window.location.href = "/auth/login";
  };

  return <button onClick={handleLogout}>Logout</button>;
};

export default Logout;
