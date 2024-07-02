import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Card from "./components/Card";
import resim1 from "./assets/images/resim1.jpg";
import resim2 from "./assets/images/resim2.jpg";
import resim3 from "./assets/images/resim3.jpg";
import Navbar from "./components/Navbar";
import Home from "./pages/Home"; // Assuming you have a Home component
import About from "./pages/About"; // Assuming you have an About component
import Login from "./pages/Login"; // Assuming you have a Login component

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route
          path="/"
          element={
            <div className="row">
              <Card
                imageSrc={resim1}
                title="resim1"
                text="lorem ipsum dolor sit amet"
              />
              <Card
                imageSrc={resim2}
                title="resim2"
                text="lorem ipsum dolor sit amet"
              />
              <Card
                imageSrc={resim3}
                title="resim3"
                text="lorem ipsum dolor sit amet"
              />
            </div>
          }
        />
        <Route path="/about" element={<About />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </Router>
  );
}

export default App;
