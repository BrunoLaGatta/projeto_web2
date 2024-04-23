import "./App.css";
import CardItem from "./components/layouts/CardItem";
import CardMenu from "./components/layouts/CardMenu";
import Carousel from "./components/layouts/carousel";

import Footer from "./components/layouts/footer";
import Header from "./components/layouts/header";
import Home from "./components/pages/Home/Home";
import Login from "./components/pages/Login/Login";
import Registrar from "./components/pages/Registrar/Registrar";

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

function App() {
  return (
    <>
      <Router>
        <Header />
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/registrar" element={<Registrar />} />
        </Routes>
        <Footer />
      </Router>
    </>
  );
}

export default App;
