import { styled, alpha } from '@mui/material/styles';
import './CardMenu.css';
import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import { CardActionArea } from '@mui/material';

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
                image={image}
                title={name}
                style={{ height: "100%", objectFit: "cover" }}
                />
            </CardActionArea>
            <CardActionArea>
            <div className='compartimento'>
                <p>{name}</p>
            </div>
            </CardActionArea>
        </StyledCard>
    );
}

export default CardMenu;