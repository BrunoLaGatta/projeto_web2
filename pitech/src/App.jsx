import "./App.css";
import CardItem from "./components/layouts/CardItem";
import CardMenu from "./components/layouts/CardMenu";
import Carousel from "./components/layouts/carousel";

import Footer from "./components/layouts/footer";
import Header from "./components/layouts/header";
import Carrinho from "./components/pages/Carrinho/Carrinho";
import Home from "./components/pages/Home/Home";
import Login from "./components/pages/Login/Login";
import Produto from "./components/pages/Produto/Produto";
import Registrar from "./components/pages/Registrar/Registrar";
import Usuario from "./components/pages/Usuario/Usuario";
import { AuthProvider } from "./components/pages/context/AuthContext"; // Importe o AuthProvider

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

function App() {
  return (
    <>
      <Router>
        <AuthProvider>
          <Header />
          <Routes>
            <Route exact path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/registrar" element={<Registrar />} />
            <Route path="/produto" element={<Produto />} />
            <Route path="/usuario" element={<Usuario />} />
            <Route path="/carrinho" element={<Carrinho />} />
          </Routes>
          <Footer />
        </AuthProvider>
      </Router>
    </>
  );
}

export default App;
