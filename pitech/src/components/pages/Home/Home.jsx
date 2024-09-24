import CardItem from "../../layouts/CardItem";
import CardMenu from "../../layouts/CardMenu";
import "./Home.css";
import Cadeiras from "../../../assets/cadeira.png";
import Computadores from "../../../assets/computadores.png";
import Games from "../../../assets/games.png";
import Hardware from "../../../assets/hardware.jpeg";
import Notebooks from "../../../assets/notebook.png";
import Perifericos from "../../../assets/periferico.png";
import Carousel from "../../layouts/carousel";
import React, { useEffect } from "react";


import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

const Home = () => {
  const [produtos, setProdutos] = React.useState([]);

  let url = "http://localhost:3000/";

  const fetchProdutos = () => {
    fetch(url + "produtos/", {
      method: "GET",
      headers: {
        "Content-type": "aplication/json",
      },
    })
      .then((resp) => resp.json())
      .then((data) => {
        setProdutos(data);
        console.log(data);
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    fetchProdutos();
  }, []);

  return (
    <>
      <Carousel />
      <h1 className="titulo_categoria">Categorias</h1>
      <div className="cards_categoria">
        <CardMenu nome="Cadeiras" image={Cadeiras} />
        <CardMenu nome="Computadores" image={Computadores} />
        <CardMenu nome="Games" image={Games} />
        <CardMenu nome="Hardware" image={Hardware} />
        <CardMenu nome="Notebooks" image={Notebooks} />
        <CardMenu nome="Perifericos" image={Perifericos} />
      </div>

      <div className="nossos_produtos">
        <h1 className="titulo_categoria">Nossos Produtos</h1>
        <div className="cards_item">
          {produtos.map((produto) => {
            return (
              <CardItem
                sx={{}}
                id={produto.idProduto}
                titulo={produto.descricao}
                image={produto.imagem1}
                preco={produto.valor}
              />
            );
          })}
        </div>
      </div>
    </>
  );
};

export default Home;
