import { styled, alpha } from '@mui/material/styles';
import './CardMenu.css';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import { CardActionArea } from '@mui/material';
import { useState } from 'react';

const StyledCard = styled(Card)(({ theme }) => ({
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    width: '13%',
    backgroundColor: 'black',
    color: "white"
  }));

const CardMenu = (props) =>{

    const name = props.nome;
    const image = props.image;

    return (
        <StyledCard>
            <CardActionArea>
            <CardMedia
                component="img"
                height="140"
                image="https://cdn.pixabay.com/photo/2020/07/02/01/22/cat-5361404_1280.jpg"
                title="white cat"/>
            <div className='container'>
                <p>{name}</p>
            </div>
            </CardActionArea>
        </StyledCard>
    );
}

export default CardMenu;