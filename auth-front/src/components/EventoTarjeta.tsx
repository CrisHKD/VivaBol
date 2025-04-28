
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { Link } from 'react-router-dom';

interface EventoTarjetaProps {
  id?: number;
  titulo: string;
  fecha_inicio: string;
  ubicacion: string;
  imagen: string;
  departamento?: string;
}

export default function EventoTarjeta({ id, titulo, fecha_inicio, ubicacion, imagen, departamento }: EventoTarjetaProps) {
  const fecha = new Date(fecha_inicio);

  const formato_fecha = fecha.toLocaleDateString('es-ES', {
    day: 'numeric',
    month: 'long',
  });

  return (
    <Link to={`/eventos/${id}`} style={{ textDecoration: 'none' }}>
      <Card sx={{ width: 325 }}>
        <CardMedia
          component="img"
          height="194"
          image={imagen}
          alt="Paella dish"
        />
        <CardHeader
          title={titulo}
          subheader={formato_fecha}
        />
        <CardContent>
          <Typography variant="body2" sx={{ color: 'text.secondary' }}>
            {ubicacion}
          </Typography>
          <Typography
            variant="body2"
            sx={{
              color: '#ff4c5c',
              fontWeight: 'bold',
              textAlign: 'right',
              fontSize: '1rem',
            }}
          >
            {departamento}
          </Typography>
        </CardContent>


      </Card>
    </Link>
  );
}
