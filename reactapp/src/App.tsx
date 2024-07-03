import React, { useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import About from "./pages/About";
import Login from "./pages/Login";
import Sidebar from "./components/Sidebar";
import AddApartment from "./pages/AddApartment";
import ApartmentList from "./components/ApartmentList";
import AddUser from "./pages/AddUser";
import AddBill from "./pages/AddBill";

function App() {
  const [selectedApartmentId, setSelectedApartmentId] = useState<string>("");

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
                <Route path="/addApartment" element={<AddApartment />} />
                <Route
                  path="/addUser"
                  element={
                    <>
                      <AddUser selectedApartmentId={selectedApartmentId} />
                      <ApartmentList
                        onSelectApartment={setSelectedApartmentId}
                      />
                    </>
                  }
                />
                <Route
                  path="/addBill"
                  element={
                    <>
                      <AddBill />
                    </>
                  }
                />
              </Routes>
            </div>
          </div>
        </div>
      </Router>
    </>
  );
}

export default App;
