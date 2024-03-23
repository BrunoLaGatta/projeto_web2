import { React, useState } from 'react';
import { styled, alpha } from '@mui/material/styles';
import './CardItem.css';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Button from '@mui/material/Button';
import CardMedia from '@mui/material/CardMedia';
import { CardActionArea } from '@mui/material';

const StyledCard = styled(Card)(({ theme }) => ({
    color: 'white',
    width: '15%',
    margin: '10px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '10px',
    borderRadius: '20px',
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

const CardItem = (props) => {
    
    const titulo = props.titulo;
    console.log("titulo", titulo);
    const image = props.image;
    const preco = props.preco;

    return (
        <StyledCard>
            <CardContent sx={{height: '30%'}}>
             <CardActionArea>
            <CardMedia
                component="img"
                height="140"
                image= {image}
                style={{ height: "100%", objectFit: "cover" }}
            />
            <div className="titulo_container">
            <h4 className='titulo'>
                {titulo}
            </h4>
            </div>
            </CardActionArea>
            </CardContent>
            <p className='valor'>R$ {preco}</p>
            <CardActions sx={{height: '20px'}}>
                <StyledButton variant="outlined">Ver mais</StyledButton>
            </CardActions>
        </StyledCard>
            
    );
}

export default CardItem;