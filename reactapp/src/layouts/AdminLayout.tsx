import React from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "../components/Sidebar";

const AdminLayout: React.FC = () => {
  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-12 col-md-2">
          <Sidebar />
        </div>
        <div className="col-12 col-md-10">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default AdminLayout;
