import { styled } from '@mui/material/styles';
import { useState, useContext, useEffect } from 'react';
import Button from "@mui/material/Button";
import './Carrinho.css';
import RoomIcon from '@mui/icons-material/Room';
import LocalMallIcon from '@mui/icons-material/LocalMall';
import { AuthContext } from "../context/AuthContext";
import RocketIcon from '@mui/icons-material/Rocket';
import { useNavigate } from 'react-router-dom';

const StyledButton = styled(Button)`
  color: #ff8e00;
  background-color: white;
  border-color: #ff8e00;
  border: 1px solid;
  &:hover {
    color: #ff8e00;
  }
`;

const Carrinho = () => {
    let url = 'http://localhost:3000/';
    const user = sessionStorage.getItem('userId');
    const navigate = useNavigate();
    const [produtos, setProdutos] = useState([]);
    const [dadosEndereco, setDadosEndereco] = useState({
        cep: "",
        logradouro: "",
        numero: "",
        bairro: "",
        cidade: "",
        complemento: "",
        uf: "",
      });

    const fetchCarrinho = () => {
        fetch(url + "carrinho/" + user, {
          method: "GET",
          headers: {
            "Content-type": "aplication/json",
          },
        })
          .then((resp) => resp.json())
          .then((data) => {
            setProdutos(data);
          })
          .catch((err) => console.log(err));
      };

      const fetchEndereco = async () => {
        await fetch(url + "dadosEndereco/" + user, {
          method: "GET",
          headers: {
            "Content-type": "aplication/json",
          },
        })
          .then((resp) => resp.json())
          .then((data) => {
            const {cep, complemento, numero, logradouro, bairro, cidade, uf} = data[0];
            setDadosEndereco({cep, complemento, numero, logradouro, bairro, cidade, uf});
            console.log(dadosEndereco);
          })
          .catch((err) => console.log(err));
      };

    const fetchRemoverProduto = async (id) => {
        await fetch(url + "removerProduto/" + id, {
          method: "DELETE",
          headers: {
            "Content-type": "aplication/json",
          },
        })
          .then((resp) => resp.json())
          .then((data) => {
            alert("Produto removido")
            console.log("Resposta do servidor:", data);
            window.location.reload(true);
          })
          .catch((err) => console.log(err));
      };

      useEffect(() => {
        fetchCarrinho();
        fetchEndereco();
      }, []);

      function handleEditar() {
        navigate('/Usuario');
      };

    return (
        <>
        <div class="grid-carrinho">
            <div class='endereco'>
                <div class='endereco-title'>
                    <RoomIcon color='warning'></RoomIcon>
                    <h2>SELECIONE O ENDEREÇO</h2>
                </div>
                <div class='endereco-dados'><p>{dadosEndereco.logradouro}, {dadosEndereco.numero}</p>
                <p>{dadosEndereco.bairro}</p>
                <p>{dadosEndereco.cidade}</p></div>
                <div class='editar'>
                    <a class='editar-link resumo' onClick={() => handleEditar()}>EDITAR</a>
                </div>
                
            </div>
            <div class="total">
                <div class='endereco-title resumo'>
                    <RocketIcon></RocketIcon>
                    <h3>Resumo</h3>
                </div>
                <p>Valor dos produtos: R${produtos.reduce((acc, produto) => acc + produto.valor, 0).toFixed(2).replace('.', ',')}</p>
                <div class="total-itens">
                    <p>Valor a vista no <strong>PIX</strong></p>
                    <p class='preco-desconto'>{(produtos.reduce((acc, produto) => acc + produto.valor, 0) * 0.9).toFixed(2).replace('.', ',')}</p>
                </div>
                <StyledButton>
                    IR PARA O PAGAMENTO
                </StyledButton>
                <StyledButton onClick={() => navigate('/')}>
                    CONTINUAR COMPRANDO
                </StyledButton>
            </div>
            <div class="itens">
                <div class='endereco-title'>
                    <LocalMallIcon color='warning'></LocalMallIcon>
                    <h2>PRODUTOS</h2>
                </div>
                <div>
                    {produtos.length > 0 ? produtos.map((produto) => (
                            <div key={produto.idProduto} id="produto">
                                <div class='itens-produtos'>
                                    <img class='itens-imagem' src={produto.imagem1} alt="produto" />
                                    <div class='itens-texto'>
                                        <p><strong>{produto.descricao}</strong></p>
                                        <p>Preço: R$ {produto.valor?.toFixed(2).replace('.', ',')}</p>
                                    </div>
                                </div>
                                <div class='editar'>
                                    <a class='remover-link' onClick={() => fetchRemoverProduto(produto.idCarrinho)}> REMOVER</a>
                                </div>
                            </div>
                        )) : (
                            <p>Sem produtos</p>
                        )}
                        
                </div>
            </div>
        </div>
        </>
    )
}

export default Carrinho;