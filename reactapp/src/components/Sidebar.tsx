import React, { useState, useEffect } from "react";

const Sidebar: React.FC = () => {
  const [showHomeSubmenu, setShowHomeSubmenu] = useState(false);
  const [showServicesSubmenu, setShowServicesSubmenu] = useState(false);
  const [selectedTab, setSelectedTab] = useState<string>("");
  const [selectedSubmenu, setSelectedSubmenu] = useState<string>("");

  useEffect(() => {
    // Example logic to determine selected tab based on current URL or state
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

  return (
    <div className="sidebar">
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
    </div>
  );
};

export default Sidebar;
