import { React, useState } from 'react';
import { styled, alpha } from '@mui/material/styles';
import './CardItem.css';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Button from '@mui/material/Button';

const StyledCard = styled(Card)(({ theme }) => ({
    color: 'white',
    width: '20%',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '10px'
  }));

  const StyledButton = styled(Button)(({ theme }) => ({
    backgroundColor: 'white',
    borderColor: 'black',
    color: "black",
    '&:hover': {
        backgroundColor: '#ff8e00',
        color: "#ffffff",
      },
  }));

const CardItem = () => {
    
    const [titulo, setTitulo] = useState('');
    const [image, setImage] = useState('');
    const [preco, setPreco] = useState(0);

    // constructor(props){
        
    // }

    return (
        <StyledCard>
            <CardContent>
            <img alt="imagem.png" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTXkDMGgjWuZz5wl78RMH6csdz6ErEcU0Ft8pYzjAueKA&s"/>
                <h2 className="titulo">Arara gamer RGB (Mais R do que GB)</h2>
            </CardContent>
            <p className='valor'>R$2000,00</p>
            <CardActions sx={{height: '20px'}}>
                <StyledButton variant="outlined">Ver mais</StyledButton>
            </CardActions>
        </StyledCard>
            
    );
}

export default CardItem;