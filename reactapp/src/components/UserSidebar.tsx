import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../AuthContext";

const UserSidebar: React.FC = () => {
  const { logout } = useAuth();
  const [selectedTab, setSelectedTab] = useState<string>("");

  useEffect(() => {
    const currentPath = window.location.pathname;
    if (currentPath.startsWith("/view-bills")) {
      setSelectedTab("viewBills");
    } else if (currentPath.startsWith("/send-message")) {
      setSelectedTab("sendMessage");
    } else if (currentPath.startsWith("/view-apartment")) {
      setSelectedTab("viewApartment");
    } else if (currentPath.startsWith("/view-user-info")) {
      setSelectedTab("viewUserInfo");
    } else {
      setSelectedTab("");
    }
  }, []);

  const handleLogout = () => {
    logout();
    window.location.href = "/auth/login";
  };

  return (
    <div className="sidebar d-flex flex-column" style={{ height: "100vh" }}>
      <a href="/user">
        <h2 className="text-center">Kullanıcı</h2>
      </a>
      <div>
        <Link
          to="/user/view-bills"
          className={selectedTab === "viewBills" ? "selected" : ""}
        >
          Fatura ve Aidat Bilgilerini Gör
        </Link>
      </div>
      <div>
        <Link
          to="/user/send-message"
          className={selectedTab === "sendMessage" ? "selected" : ""}
        >
          Yöneticiye Mesaj Gönder
        </Link>
      </div>
      <div>
        <Link
          to="/user/view-apartment"
          className={selectedTab === "viewApartment" ? "selected" : ""}
        >
          Daire Bilgilerini Görüntüle
        </Link>
      </div>
      <div>
        <Link
          to="/user/view-user-info"
          className={selectedTab === "viewUserInfo" ? "selected" : ""}
        >
          Kullanıcı Bilgilerini Görüntüle
        </Link>
      </div>
      <div className="mt-auto p-3">
        <button className="btn btn-danger w-100" onClick={handleLogout}>
          Logout
        </button>
      </div>
    </div>
  );
};

export default UserSidebar;
