import React, { useState } from "react";

const Sidebar: React.FC = () => {
  const [showHomeSubmenu, setShowHomeSubmenu] = useState(false);
  const [showServicesSubmenu, setShowServicesSubmenu] = useState(false);
  const [showClientsSubmenu, setShowClientsSubmenu] = useState(false);
  const [showContactSubmenu, setShowContactSubmenu] = useState(false);

  return (
    <div className="sidebar">
      <a href="/">
        <h2 className="text-center">Yönetici</h2>
      </a>
      <div>
        <a onClick={() => setShowHomeSubmenu(!showHomeSubmenu)}>
          Ekleme İşlemleri
        </a>
        <div className={`submenu ${showHomeSubmenu ? "show" : ""}`}>
          <a href="/addApartment">Daire Ekle</a>
          <a href="/addUser">Kullanıcı Ekle</a>
          <a href="/addBill">Aidat ve Fatura Ekle</a>
        </div>
      </div>

      <div>
        <a onClick={() => setShowServicesSubmenu(!showServicesSubmenu)}>
          Görüntüleme İşlemleri
        </a>
        <div className={`submenu ${showServicesSubmenu ? "show" : ""}`}>
          <a href="#services1">Ödemeleri Görüntüle</a>
          <a href="#services2">Mesajları Görüntüle</a>
          <a href="#services3">Borç-Alacak Listesini Görüntüle</a>
        </div>
      </div>

      <div>
        <a onClick={() => setShowClientsSubmenu(!showClientsSubmenu)}>
          Kullanıcı İşlemleri
        </a>
        <div className={`submenu ${showClientsSubmenu ? "show" : ""}`}>
          <a href="#clients1">Kullanıcıları Listele</a>
          <a href="#clients2">Kullanıcıları Düzenle</a>
          <a href="#clients3">Kullanıcıları Sil</a>
        </div>
      </div>

      <div>
        <a onClick={() => setShowContactSubmenu(!showContactSubmenu)}>
          Daire İşlemleri
        </a>
        <div className={`submenu ${showContactSubmenu ? "show" : ""}`}>
          <a href="#contact1">Daireleri Listele</a>
          <a href="#contact2">Daireleri Düzenle</a>
          <a href="#contact3">Daireleri Sil</a>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
