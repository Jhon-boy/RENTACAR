/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import * as React from 'react';
import { styled } from '@mui/material/styles';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import { red } from '@mui/material/colors';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import '../styles/Pagos.css';
import { URL } from '../data/URL';
import { IMAGE } from '../data/URL'
import { Button } from '@mui/material';

const ExpandMore = styled((props) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
  marginLeft: 'auto',
  transition: theme.transitions.create('transform', {
    duration: theme.transitions.duration.shortest,
  }),
}));

export default function InfoPago(props) {

  const cliente = props.cliente; // eslint-disable-line
  const [expanded, setExpanded] = React.useState(false);
  const [reservas, setReservas] = React.useState();
  const [autos, setAutos] = React.useState();
  const [ultimaReservaP, setultimaReservaP] = React.useState([]);
  const [ultimosAutos, setultimosAuto] = React.useState([])
  const handleExpandClick = () => {
    setExpanded(!expanded);
  };


  React.useEffect(() => {
    fetch(`${URL}/reservas`)
      .then((response) => response.json())
      .then((data) => {
        // Almacenar todas las reservas
        setReservas(data);

        const reservasCliente = data.filter(
          (reserva) => reserva.id_cliente === cliente.id_cliente
        );

        reservasCliente.sort((a, b) => a.id - b.id);

        const ultimaReserva = reservasCliente[reservasCliente.length - 1];
        // Aquí puedes hacer lo que necesites con la última reserva

        // Almacenar la última reserva en el estado
        setultimaReservaP(ultimaReserva);
      })
      .catch((error) => console.log(error));
  }, [cliente.id_cliente]);


  React.useEffect(() => {
    fetch(`${URL}/autos`)
      .then((response) => response.json())
      .then((data) => {
        // Almacenar todos los autos
        setAutos(data);
        // Filtrar los autos por el id_auto que coincida con ultimaReservaP.id_auto
        const autosFiltrados = data.filter((auto) => auto.id_auto === ultimaReservaP.id_auto);

        if (autosFiltrados.length > 0) {
          const autoEncontrado = autosFiltrados[0];
          setultimosAuto(autoEncontrado);
        } else {
          console.log('No se encontró ningún auto con el id correspondiente.');
        }
      })
      .catch((error) => console.log(error));
  }, [ultimaReservaP.id_auto]);

  return (
    <Card sx={{ maxWidth: 315, maxHeight: 430, marginLeft: 10, marginTop: 4 }}>
      <CardHeader
        avatar={
          <Avatar sx={{ bgcolor: red[500] }} aria-label={cliente.nombre}>
          </Avatar>
        }
        action={
          <IconButton aria-label="settings">
            <MoreVertIcon />
          </IconButton>
        }
        title={cliente.nombre + '  ' + cliente.apellido}
        subheader={ultimaReservaP.fecha_entrega}
      />
      <CardMedia
        component="img"
        height="174"
        image={`${IMAGE}/${ultimosAutos.fotos}`}
        alt="Auto"
        sx={{
          maxWidth: 270,
          marginLeft: 'auto',
          marginRight: 'auto',
        }}
      />
      <CardContent>
        <Typography variant="body2" color="text.secondary">
          Tu ultima reserva fue  por un {ultimosAutos.marca} modelo {ultimosAutos.modelo}.
          Desde {ultimaReservaP.fecha_entrega} hasta {ultimaReservaP.fecha_entrega}
        </Typography>
      </CardContent>
      <CardActions disableSpacing>
        <Typography variant="body1" color="text.primary">
          Estado: <Button  sx={{ color: ultimaReservaP.estado === 'PENDIENTE' ? 'orange' : ultimaReservaP.estado === 'CANCELADO' ? 'red' : 'initial' }}>
            {ultimaReservaP.estado} 
          </Button>
        </Typography>
        <Typography variant="body1" color="">
          $:  <Button variant="outlined" color="success" >{ultimaReservaP.monto}</Button>
        </Typography>
      </CardActions>
    </Card>
  );
}