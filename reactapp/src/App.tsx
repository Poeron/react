import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import About from "./pages/About";
import Login from "./pages/Login";
import AddBill from "./pages/AddBill";
import BillsList from "./components/BillsList";
import MessageList from "./components/MessageList";
import User from "./pages/User";
import Apartment from "./pages/Apartment";
import { AuthProvider } from "./AuthContext";
import AdminLayout from "./layouts/AdminLayout";
import AuthLayout from "./layouts/AuthLayout";

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/auth" element={<AuthLayout />}>
            <Route index element={<Login />} />
            <Route path="login" element={<Login />} />
          </Route>
          <Route path="/" element={<AdminLayout />}>
            <Route index element={<Home />} />
            <Route path="home" element={<Home />} />
            <Route path="about" element={<About />} />
            <Route path="addBill" element={<AddBill />} />
            <Route
              path="paidBills"
              element={
                <BillsList title="Ödenmiş Faturalar" endpoint="GetPaidBills" />
              }
            />
            <Route path="messages" element={<MessageList />} />
            <Route
              path="unpaidBills"
              element={
                <BillsList
                  title="Ödenmemiş Faturalar"
                  endpoint="GetMonthlyUnpaidBills"
                />
              }
            />
            <Route path="users" element={<User />} />
            <Route path="apartments" element={<Apartment />} />
          </Route>
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
