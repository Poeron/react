import React, { useState, useEffect } from "react";

const Sidebar: React.FC = () => {
  const [showHomeSubmenu, setShowHomeSubmenu] = useState(false);
  const [showServicesSubmenu, setShowServicesSubmenu] = useState(false);
  const [selectedTab, setSelectedTab] = useState<string>("");
  const [selectedSubmenu, setSelectedSubmenu] = useState<string>("");

  useEffect(() => {
    // Example logic to determine selected tab based on current URL or state
    const currentPath = window.location.pathname;

    if (currentPath.startsWith("/addApartment")) {
      setSelectedTab("addOperations");
      setShowHomeSubmenu(true);
      setSelectedSubmenu("addApartment");
    } else if (currentPath.startsWith("/addUser")) {
      setSelectedTab("addOperations");
      setShowHomeSubmenu(true);
      setSelectedSubmenu("addUser");
    } else if (currentPath.startsWith("/addBill")) {
      setSelectedTab("addOperations");
      setShowHomeSubmenu(true);
      setSelectedSubmenu("addBill");
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
    } else if (currentPath.startsWith("/userList")) {
      setSelectedTab("userOperations");
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
          onClick={handleToggleHomeSubmenu}
          className={selectedTab === "addOperations" ? "selected" : ""}
        >
          Ekleme İşlemleri
        </a>
        <div className={`submenu ${showHomeSubmenu ? "show" : ""}`}>
          <a
            href="/addApartment"
            className={selectedSubmenu === "addApartment" ? "selected" : ""}
          >
            Daire Ekle
          </a>
          <a
            href="/addUser"
            className={selectedSubmenu === "addUser" ? "selected" : ""}
          >
            Kullanıcı Ekle
          </a>
          <a
            href="/addBill"
            className={selectedSubmenu === "addBill" ? "selected" : ""}
          >
            Aidat ve Fatura Ekle
          </a>
        </div>
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

      <div>
        <a
          href="/userList"
          className={selectedTab === "userOperations" ? "selected" : ""}
        >
          Kullanıcı İşlemleri
        </a>
      </div>

      <div>
        <a href="#">Daire İşlemleri</a>
      </div>
    </div>
  );
};

export default Sidebar;
