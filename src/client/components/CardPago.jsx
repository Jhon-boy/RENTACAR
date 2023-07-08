/* eslint-disable react/prop-types */
import * as React from 'react';
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
import { FaPaypal, FaCreditCard, FaExchangeAlt, FaQuestion } from 'react-icons/fa';


export default function CardPago(props) {

    const cliente = props.cliente; // eslint-disable-line
    // eslint-disable-next-line no-unused-vars
    const [pagos, setPagos] = React.useState();   // eslint-disable-next-line no-unused-vars
    const [autos, setAutos] = React.useState();
    const [ultimoPagoP, setultimoPagoP] = React.useState([]);
    const [ultimosAutos, setultimosAuto] = React.useState([])

    React.useEffect(() => {
        fetch(`${URL}/pagos`)
            .then((response) => response.json())
            .then((data) => {
                // Almacenar todas las pagos
                setPagos(data);

                const pagosCliente = data.filter(
                    (pago) => pago.id_cliente === cliente.id_cliente
                );
                pagosCliente.sort((a, b) => a.id - b.id);

                const ultimoPago = pagosCliente[pagosCliente.length - 1];
                setultimoPagoP(ultimoPago);
            })
            .catch((error) => console.log(error));
    }, [cliente.id_cliente]);


    React.useEffect(() => {
        fetch(`${URL}/autos`)
            .then((response) => response.json())
            .then((data) => {
                // Almacenar todos los autos
                setAutos(data);
                // Filtrar los autos por el id_auto que coincida con ultimoPagoP.id_auto
                const autosFiltrados = data.filter((auto) => auto.id_auto === ultimoPagoP.id_auto);

                if (autosFiltrados.length > 0) {
                    const autoEncontrado = autosFiltrados[0];
                    setultimosAuto(autoEncontrado);
                } else {
                    console.log('No se encontró ningún auto con el id correspondiente.');
                }
            })
            .catch((error) => console.log(error));
    }, [ultimoPagoP.id_auto]);

    const getFormattedDate = (date) => {
        const diaDelMes = date.getDate();
        const diaDeLaSemana = date.toLocaleDateString('es', { weekday: 'long' });
        const mes = date.toLocaleDateString('es', { month: 'long' });

        return `${diaDeLaSemana}, ${diaDelMes} de ${mes}`;
    };

    const obtenerIconoPago = (tipoPago) => {
        switch (tipoPago) {
            case 'PAYPAL':
                return <FaPaypal color="#0070ba" />;
            case 'FISICO':
                return <FaCreditCard color="#ff6f00" />;
            case 'TRANSFERENCIA':
                return <FaExchangeAlt color="#4caf50" />;
            case 'OTRO':
                return <FaQuestion color="#9e9e9e" />;
            default:
                return null;
        }
    };

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
                subheader={ultimoPagoP.fecha_pago}
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
                    Tu ultimo pago fue  por un {ultimosAutos.marca} modelo {ultimosAutos.modelo}, 
                    el {getFormattedDate(new Date(ultimoPagoP.fecha_pago))}.
                    Revisa tu correo para ver la factura.
                </Typography>
            </CardContent>
            <CardActions disableSpacing>
                <Typography variant="body1" color="text.primary">
                    Tipo de Pago: {ultimoPagoP.tipo} - {obtenerIconoPago(ultimoPagoP.tipo)}
                </Typography>
            </CardActions>
            <CardActions disableSpacing>
                <Typography variant="body1" color="">
                    Total Pagado:  <Button variant="outlined" color="success" >{ultimoPagoP.monto}$</Button>
                </Typography>
            </CardActions>
        </Card>
    );
}