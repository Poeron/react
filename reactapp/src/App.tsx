import React, { useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import About from "./pages/About";
import Login from "./pages/Login";
import Sidebar from "./components/Sidebar";
import AddBill from "./pages/AddBill";
import BillsList from "./components/BillsList";
import MessageList from "./components/MessageList";
import User from "./pages/User";
import Apartment from "./pages/Apartment";

function App() {
  return (
    <>
      <Router>
        <div className="container-fluid">
          <div className="row">
            <div className="col-md-2">
              <Sidebar />
            </div>
            <div className="col-md-8">
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/home" element={<Home />} />
                <Route path="/about" element={<About />} />
                <Route path="/login" element={<Login />} />
                <Route
                  path="/addBill"
                  element={
                    <>
                      <AddBill />
                    </>
                  }
                />
                <Route
                  path="/paidBills"
                  element={
                    <>
                      <BillsList
                        title="Ödenmiş Faturalar"
                        endpoint="GetPaidBills"
                      />
                    </>
                  }
                />
                <Route path="/messages" element={<MessageList />} />
                <Route
                  path="/unpaidBills"
                  element={
                    <>
                      <BillsList
                        title="Ödenmemiş Faturalar"
                        endpoint="GetMonthlyUnpaidBills"
                      />
                    </>
                  }
                />
                <Route path="/users" element={<User />} />
                <Route path="/apartments" element={<Apartment />} />
              </Routes>
            </div>
          </div>
        </div>
      </Router>
    </>
  );
}

export default App;
