import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import AddBill from "./pages/AddBill";
import BillsList from "./components/BillsList";
import MessageList from "./components/MessageList";
import User from "./pages/User";
import Apartment from "./pages/Apartment";
import { AuthProvider } from "./AuthContext";
import AdminLayout from "./layouts/AdminLayout";
import AuthLayout from "./layouts/AuthLayout";
import UserLayout from "./layouts/UserLayout";
import ViewBills from "./components/ViewBills";
import SendMessage from "./components/SendMessage";
import ViewApartment from "./components/ViewApartment";
import ViewUser from "./components/ViewUser";

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
          <Route path="/user" element={<UserLayout />}>
            <Route path="view-bills" element={<ViewBills />} />
            <Route path="send-message" element={<SendMessage />} />
            <Route path="view-apartment" element={<ViewApartment />} />
            <Route path="view-user-info" element={<ViewUser />} />
          </Route>
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
