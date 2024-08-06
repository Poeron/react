import React, { useState, useEffect } from "react";
import { useAuth } from "../AuthContext";

const Sidebar: React.FC = () => {
  const [showHomeSubmenu, setShowHomeSubmenu] = useState(false);
  const [showServicesSubmenu, setShowServicesSubmenu] = useState(false);
  const [selectedTab, setSelectedTab] = useState<string>("");
  const [selectedSubmenu, setSelectedSubmenu] = useState<string>("");

  const { logout } = useAuth();

  useEffect(() => {
    const currentPath = window.location.pathname;
    if (currentPath.startsWith("/addBill")) {
      setSelectedTab("addBill");
      setShowHomeSubmenu(true);
    } else if (currentPath.startsWith("/paidBills")) {
      setSelectedTab("viewOperations");
      setShowServicesSubmenu(true);
      setSelectedSubmenu("paidBills");
    } else if (currentPath.startsWith("/messages")) {
      setSelectedTab("viewOperations");
      setShowServicesSubmenu(true);
      setSelectedSubmenu("messages");
    } else if (currentPath.startsWith("/unpaidBills")) {
      setSelectedTab("viewOperations");
      setShowServicesSubmenu(true);
      setSelectedSubmenu("unpaidBills");
    } else if (currentPath.startsWith("/users")) {
      setSelectedTab("userOperations");
    } else if (currentPath.startsWith("/apartments")) {
      setSelectedTab("apartmentOperations");
    } else {
      setSelectedTab("");
      setSelectedSubmenu("");
    }
  }, []);

  const handleToggleHomeSubmenu = () => {
    setShowHomeSubmenu(!showHomeSubmenu);
  };

  const handleToggleServicesSubmenu = () => {
    setShowServicesSubmenu(!showServicesSubmenu);
  };

  const handleLogout = () => {
    logout();
    window.location.href = "/auth/login";
  };

  return (
    <div className="sidebar d-flex flex-column" style={{ height: "100vh" }}>
      <a href="/">
        <h2 className="text-center">Yönetici</h2>
      </a>
      <div>
        <a
          href="/users"
          className={selectedTab === "userOperations" ? "selected" : ""}
        >
          Kiracı İşlemleri
        </a>
      </div>

      <div>
        <a
          href="/apartments"
          className={selectedTab === "apartmentOperations" ? "selected" : ""}
        >
          Daire İşlemleri
        </a>
      </div>
      <div>
        <a
          href="/addBill"
          onClick={handleToggleHomeSubmenu}
          className={selectedTab === "addBill" ? "selected" : ""}
        >
          Aidat ve Fatura Ekle
        </a>
      </div>

      <div>
        <a
          onClick={handleToggleServicesSubmenu}
          className={selectedTab === "viewOperations" ? "selected" : ""}
        >
          Görüntüleme İşlemleri
        </a>
        <div className={`submenu ${showServicesSubmenu ? "show" : ""}`}>
          <a
            href="/paidBills"
            className={selectedSubmenu === "paidBills" ? "selected" : ""}
          >
            Ödemeleri Görüntüle
          </a>
          <a
            href="/messages"
            className={selectedSubmenu === "messages" ? "selected" : ""}
          >
            Mesajları Görüntüle
          </a>
          <a
            href="/unpaidBills"
            className={selectedSubmenu === "unpaidBills" ? "selected" : ""}
          >
            Borç-Alacak Listesini Görüntüle
          </a>
        </div>
      </div>
      <div className="mt-auto p-3">
        <button
          className={
            sessionStorage.getItem("token")
              ? "btn btn-danger w-100"
              : "btn btn-primary w-100"
          }
          onClick={handleLogout}
        >
          {sessionStorage.getItem("token") ? "Çıkış Yap" : "Giriş Yap"}
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
