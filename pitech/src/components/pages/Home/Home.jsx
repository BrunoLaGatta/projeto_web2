import CardItem from "../../layouts/CardItem";
import CardMenu from "../../layouts/CardMenu";
import "./Home.css";
import imagem from "../../../assets/banner1.png";
import Cadeiras from "../../../assets/cadeira.png";
import Computadores from "../../../assets/computadores.png";
import Games from "../../../assets/games.png";
import Hardware from "../../../assets/hardware.jpeg";
import Notebooks from "../../../assets/notebook.png";
import Perifericos from "../../../assets/periferico.png";
import Carousel from "../../layouts/carousel";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import React from "react";
const Home = () => {
  const [spacing, setSpacing] = React.useState(2);
  const produtos = [
    {
      key: 1,
      titulo:
        "Apple Macbook Pro, 14 Polegadas, Chip M2 Pro, 2022 10c, CPU/16c GPU/16GB/512GB, Cinza Espacial",
      imagem:
        "https://images.kabum.com.br/produtos/fotos/sync_mirakl/462256/Apple-Macbook-Pro-14-Polegadas-Chip-M2-Pro-2022-10c-CPU-16c-GPU-16GB-512GB-Cinza-Espacial_1684178292_gg.jpg",
      preco: "15189.89",
    },
    {
      key: 2,
      titulo:
        "Mouse Gamer Redragon Cobra, Chroma RGB, 12400DPI, 7 Botões, Preto - M711 V2",
      imagem:
        "https://images.kabum.com.br/produtos/fotos/94555/mouse-gamer-redragon-cobra-chroma-rgb-12400dpi-7-botoes-preto-m711-v2_1656018617_gg.jpg",
      preco: "149.99",
    },
    {
      key: 3,
      titulo:
        "Notebook Gamer Acer Nitro 5 Intel Core i7-10750H, GeForce GTX 1650, 8GB RAM, SSD 512GB, 15.6' Full HD IPS 144Hz, Win11 - AN515-55-79X0",
      imagem:
        "https://images.kabum.com.br/produtos/fotos/308371/notebook-gamer-acer-nitro-5-intel-core-i7-10750h-geforce-gtx-1650-8gb-ram-512gb-ssd-15-6-ips-fhd-win-11-home-preto-an515-55-79x0_1645045438_original.jpg",
      preco: "5199.99",
    },
    {
      key: 4,
      titulo:
        "PC Gamer Concórdia i7-10700F, Geforce RTX 3060 12GB, 16GB RAM, SSD 500, Avalanche, Linux, Preto - 33292",
      imagem:
        "https://images.kabum.com.br/produtos/fotos/331108/pc-gamer-concordia-i7-10700f-geforce-rtx-3060-12gb-16gb-ram-ssd-500-avalanche-preto-33292_1651693508_gg.jpg",
      preco: "6399.00",
    },
    {
      key: 4,
      titulo:
        "PC Gamer Concórdia i7-10700F, Geforce RTX 3060 12GB, 16GB RAM, SSD 500, Avalanche, Linux, Preto - 33292",
      imagem:
        "https://images.kabum.com.br/produtos/fotos/331108/pc-gamer-concordia-i7-10700f-geforce-rtx-3060-12gb-16gb-ram-ssd-500-avalanche-preto-33292_1651693508_gg.jpg",
      preco: "6399.00",
    },
    {
      key: 4,
      titulo:
        "PC Gamer Concórdia i7-10700F, Geforce RTX 3060 12GB, 16GB RAM, SSD 500, Avalanche, Linux, Preto - 33292",
      imagem:
        "https://images.kabum.com.br/produtos/fotos/331108/pc-gamer-concordia-i7-10700f-geforce-rtx-3060-12gb-16gb-ram-ssd-500-avalanche-preto-33292_1651693508_gg.jpg",
      preco: "6399.00",
    },
    {
        key: 4,
        titulo:
          "PC Gamer Concórdia i7-10700F, Geforce RTX 3060 12GB, 16GB RAM, SSD 500, Avalanche, Linux, Preto - 33292 ",
        imagem:
          "https://images.kabum.com.br/produtos/fotos/331108/pc-gamer-concordia-i7-10700f-geforce-rtx-3060-12gb-16gb-ram-ssd-500-avalanche-preto-33292_1651693508_gg.jpg",
        preco: "6399.00",
      },
  ];

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
              <CardItem sx={{}}
                key={produto.key}
                titulo={produto.titulo}
                image={produto.imagem}
                preco={produto.preco}
              />
            );
          })}
        </div>
      </div>
    </>
  );
};

export default Home;
