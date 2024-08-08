import "./Produto.css";

import React, { useState } from "react";

import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
// import "slick-carousel/slick/slick-theme.css";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import LocalAtmIcon from "@mui/icons-material/LocalAtm";
import LocalGroceryStoreOutlinedIcon from "@mui/icons-material/LocalGroceryStoreOutlined";
import imagem2 from '../../../assets/imagemProduto2.png';
import imagem3 from '../../../assets/imagemProduto3.png';

const Produto = () => {
  const produtos = [
    {
      key: 1,
      titulo:
        "Apple Macbook Pro, 14 Polegadas, Chip M2 Pro, 2022 10c, CPU/16c GPU/16GB/512GB, Cinza Espacial",
      desc: "Apple Macbook Pro, 14 Polegadas, Chip M2 Pro, 2022 10c, CPU/16c GPU/16GB/512GB, Cinza Espacial Apple Macbook Pro, 14 Polegadas, Chip M2 Pro, 2022 10c, CPU/16c GPU/16GB/512GB, Cinza Espacial Apple Macbook Pro, 14 Polegadas, Chip M2 Pro, 2022 10c, CPU/16c GPU/16GB/512GB, Cinza Espacial Cinza Espacial Apple Macbook Pro, 14 Polegadas, Chip M2 Pro, 2022 10c, CPU/16c GPU/16GB/512GB, Cinza Espacial Cinza Espacial Apple Macbook Pro, 14 Polegadas, Chip M2 Pro, 2022 10c, CPU/16c GPU/16GB/512GB, Cinza Espacial",
      imagem:
        "https://images.kabum.com.br/produtos/fotos/sync_mirakl/462256/Apple-Macbook-Pro-14-Polegadas-Chip-M2-Pro-2022-10c-CPU-16c-GPU-16GB-512GB-Cinza-Espacial_1684178292_gg.jpg",
      preco: "15189.89",
    },
    {
      key: 1,
      titulo:
        "Apple Macbook Pro, 14 Polegadas, Chip M2 Pro, 2022 10c, CPU/16c GPU/16GB/512GB, Cinza Espacial",
      desc: "Apple Macbook Pro, 14 Polegadas, Chip M2 Pro, 2022 10c, CPU/16c GPU/16GB/512GB, Cinza Espacial Apple Macbook Pro, 14 Polegadas, Chip M2 Pro, 2022 10c, CPU/16c GPU/16GB/512GB, Cinza Espacial Apple Macbook Pro, 14 Polegadas, Chip M2 Pro, 2022 10c, CPU/16c GPU/16GB/512GB, Cinza Espacial",
      imagem: imagem2,
      preco: "15189.89",
    },
    {
      key: 1,
      titulo:
        "Apple Macbook Pro, 14 Polegadas, Chip M2 Pro, 2022 10c, CPU/16c GPU/16GB/512GB, Cinza Espacial",
      desc: "Apple Macbook Pro, 14 Polegadas, Chip M2 Pro, 2022 10c, CPU/16c GPU/16GB/512GB, Cinza Espacial Apple Macbook Pro, 14 Polegadas, Chip M2 Pro, 2022 10c, CPU/16c GPU/16GB/512GB, Cinza Espacial Apple Macbook Pro, 14 Polegadas, Chip M2 Pro, 2022 10c, CPU/16c GPU/16GB/512GB, Cinza Espacial",
      imagem: imagem3,
      preco: "15189.89",
    },
  ];

  const produtos2 = [
    {
      id: 1,
      nome: "Produto 1",
      imagem: "https://unsplash.it/600/300/?image=43",
      preco: "R$ 100,00",
    },
    {
      id: 2,
      nome: "Produto 2",
      imagem: "https://unsplash.it/600/300/?image=49",
      preco: "R$ 200,00",
    },
    {
      id: 3,
      nome: "Produto 3",
      imagem: "https://unsplash.it/600/300/?image=60",
      preco: "R$ 300,00",
    },
    {
      id: 4,
      nome: "Produto 4",
      imagem: "https://unsplash.it/600/300/?image=106",
      preco: "R$ 400,00",
    },
  ];

  const [isOpen, setIsOpen] = useState(false);

  const toggleDescription = () => {
    setIsOpen(!isOpen);
  };

  const settings = {
    dots: true,
    prevArrow: (
      <a class="slick-prev" href="#">
        <ArrowBackIosIcon />
      </a>
    ),
    nextArrow: (
      <a class="slick-next" href="#">
        <ArrowForwardIosIcon />
      </a>
    ),
    customPaging: function (i) {
      const targetImage = produtos[i].imagem;
      return <img src={targetImage} alt={`Thumbnail ${i}`} />;
    },
    dotsClass: "slick-dots slick-thumb",
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  return (
    <>
      <div className="geral">
        <div className="produto">
          <div className="layout">
            <Slider {...settings}>
              {produtos.map((produto) => (
                <li>
                  <img width={500} src={produto.imagem} />
                </li>
              ))}
            </Slider>
          </div>

          <div className="desc">
            <h2 className="nome">{produtos[0].titulo}</h2>

            <div className="titulos">
              <div className="valor">
                <LocalAtmIcon />
                <h5 style={{fontWeight:'400'}}>
                  Valor à vista no <b>Pix</b>
                </h5>
              </div>

              <p className="preco">
                <b> R$ {produtos[0].preco}</b>
              </p>
            </div>
            <button className="carrinho">Adicionar no carrinho</button>
          </div>
        </div>
        <div className="product-wrapper" onClick={toggleDescription}>
          <div className="descricao">
            <h2>Descrição do Produto </h2>
            <div className="toggle-button">{isOpen ? "▲" : "▼"}</div>
          </div>
          <div className={`product-description ${isOpen ? "open" : ""}`}>
            <p>{produtos[0].desc}</p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Produto;
