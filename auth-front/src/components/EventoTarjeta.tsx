
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import FavoriteIcon from '@mui/icons-material/Favorite';

interface EventoTarjetaProps {
  titulo: string;
  fecha_inicio: string;
  ubicacion: string;
  imagen: string;
}

export default function EventoTarjeta({ titulo, fecha_inicio, ubicacion, imagen }: EventoTarjetaProps) {

  return (
    <Card sx={{ width: 325 }}>
      <CardMedia
        component="img"
        height="194"
        image={imagen}
        alt="Paella dish"
      />
      <CardHeader
        title={titulo}
        subheader={fecha_inicio}
      />
      <CardContent>
        <Typography variant="body2" sx={{ color: 'text.secondary' }}>
          {ubicacion}
        </Typography>
        <Typography variant="body2" sx={{ textAlign: 'right' }} color="text.secondary">
          100Bs<br/>
        </Typography>
      </CardContent>
      <CardActions >
        <IconButton aria-label="add to favorites">
          <FavoriteIcon />
        </IconButton>
      </CardActions>
      
    </Card>
  );
}
