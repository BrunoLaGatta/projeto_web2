import { Hidden } from '@mui/material';
import { styled } from '@mui/material/styles';
import { useState } from 'react';
import Button from "@mui/material/Button";
import './Carrinho.css';
import imagem1 from '../../../assets/imagemProduto1.png';
import RoomIcon from '@mui/icons-material/Room';
import LocalMallIcon from '@mui/icons-material/LocalMall';
import RocketIcon from '@mui/icons-material/Rocket';

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

    const [produtos, setProdutos] = useState([
        {
            idProduto: 1,
            descricao: 'Produto 1',
            valor: 1000.00,
            imagem1: imagem1
        }
    ]);

    const [modalVisible, setModalVisible] = useState(false);
    const [produtoRemover, setProdutoRemover] = useState(null);

    const abrirModal = (idProduto) => {
        setProdutoRemover(idProduto);
        setModalVisible(true);
    };

    return (
        <>
        <div class="grid-carrinho">
            <div class='endereco'>
                <div class='endereco-title'>
                    <RoomIcon color='warning'></RoomIcon>
                    <h2>SELECIONE O ENDEREÇO</h2>
                </div>
                <div class='endereco-dados'><p>Rua teste, 123</p>
                <p>Bairro Teste</p>
                <p>Cidade Teste</p></div>
                <div class='editar'>
                    <a class='editar-link resumo'>EDITAR</a>
                </div>
                
            </div>
            <div class="total">
                <div class='endereco-title resumo'>
                    <RocketIcon></RocketIcon>
                    <h3>Resumo</h3>
                </div>
                <p>Valor dos produtos: R$1000,00</p>
                <div class="total-itens">
                    <p>Valor a vista no <strong>PIX</strong></p>
                    <p class='preco-desconto'>R$ 900,00</p>
                </div>
                <StyledButton>
                    IR PARA O PAGAMENTO
                </StyledButton>
                <StyledButton>
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
                                        <p>Preço: R$ {produto.valor.toFixed(2).replace('.', ',')}</p>
                                    </div>
                                </div>
                                <div class='editar'>
                                    <a class='remover-link' onClick={() => abrirModal(produto.idProduto)}> REMOVER</a>
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