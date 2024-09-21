import "./Produto.css";

import React, { useState, useEffect } from "react";

import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
// import "slick-carousel/slick/slick-theme.css";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import LocalAtmIcon from "@mui/icons-material/LocalAtm";

import { useLocation } from "react-router-dom";

const Produto = () => {

  const [produtos, setProdutos] = useState([])
  const [imagens, setImagens] = useState([])
  let url = 'http://localhost:3000/';

  const location = useLocation();
  const idProduto = location.state?.id;
  const fetchProduto = () => {
      fetch(url + 'produto/' + idProduto, {
      method: "GET",
      headers: {
        "Content-type": "aplication/json",
      },
    })
      .then((resp) => resp.json())
      .then((data) => {
        setProdutos(data);
        // if(data[0].imagem1)
        // setImagens([data[0].imagem1])
        // else if(data[0].imagem2)
          setImagens([data[0].imagem1, data[0].imagem2])
        // else if(data[0].imagem3)
        //   setImagens([data[0].imagem1, data[0].imagem2, data[0].imagem3])
  
        console.log(data)
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    fetchProduto();
  }, []);
  
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
      const targetImage = imagens[i];
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
              {imagens.map((produto) => (
                  <li>
                    <img width={500} src={produto} />
                  </li>
              ))}
            </Slider>
          </div>

          <div className="desc">
            <h2 className="nome">{produtos[0]?.descricao}</h2>

            <div className="titulos">
              <div className="valor">
                <LocalAtmIcon />
                <h5 style={{fontWeight:'400'}}>
                  Valor à vista no <b>Pix</b>
                </h5>
              </div>

              <p className="preco">
                <b> R$ {produtos[0]?.valor}</b>
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
            <p>{produtos[0]?.sobre}</p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Produto;
