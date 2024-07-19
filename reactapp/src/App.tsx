import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./pages/adminPages/Home";
import Login from "./pages/Login";
import AddBill from "./pages/adminPages/AddBill";
import Users from "./pages/adminPages/Users";
import Apartments from "./pages/adminPages/Apartments";
import { AuthProvider } from "./AuthContext";
import AdminLayout from "./layouts/AdminLayout";
import AuthLayout from "./layouts/AuthLayout";
import UserLayout from "./layouts/UserLayout";
import ViewApartment from "./components/ViewApartment";
import ViewUser from "./components/ViewUser";
import PaidBills from "./pages/adminPages/PaidBills";
import UnpaidBills from "./pages/adminPages/UnpaidBills";
import Messages from "./pages/adminPages/Messages";
import Bills from "./pages/userPages/Bills";
import Test from "./pages/testPages/Test";
import Message from "./pages/userPages/Message";

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
            <Route index element={<Test />} />
            <Route path="home" element={<Home />} />
            <Route path="addBill" element={<AddBill />} />
            <Route path="paidBills" element={<PaidBills />} />
            <Route path="messages" element={<Messages />} />
            <Route path="unpaidBills" element={<UnpaidBills />} />
            <Route path="users" element={<Users />} />
            <Route path="apartments" element={<Apartments />} />
          </Route>
          <Route path="/user" element={<UserLayout />}>
            <Route path="view-bills" element={<Bills />} />
            <Route path="send-message" element={<Message />} />
            <Route path="view-apartment" element={<ViewApartment />} />
            <Route path="view-user-info" element={<ViewUser />} />
          </Route>
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
