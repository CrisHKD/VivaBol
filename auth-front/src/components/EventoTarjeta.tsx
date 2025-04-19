import * as React from 'react';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Collapse from '@mui/material/Collapse';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import FavoriteIcon from '@mui/icons-material/Favorite';

export default function EventoTarjeta() {
  const [expanded, setExpanded] = React.useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  return (
    <Card sx={{ maxWidth: 345 }}>
      <CardMedia
        component="img"
        height="194"
        image="https://profe.minedu.gob.bo/storage/evento_afiches/CDIou9j5hz4UswCZySSXMAHZTopVlw9vIXbzupAT.jpg"
        alt="Paella dish"
      />
      <CardHeader
        title="Shrimp and Chorizo Paella"
        subheader="September 14"
      />
      <CardContent>
        <Typography variant="body2" sx={{ color: 'text.secondary' }}>
          Direccion del evento
        </Typography>
        <Typography variant="body2" sx={{ textAlign: 'right' }} color="text.secondary">
          100Bs
        </Typography>
      </CardContent>
      <CardActions disableSpacing>
        <IconButton aria-label="add to favorites">
          <FavoriteIcon />
        </IconButton>
      </CardActions>
      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <CardContent>
        </CardContent>
      </Collapse>
    </Card>
  );
}
