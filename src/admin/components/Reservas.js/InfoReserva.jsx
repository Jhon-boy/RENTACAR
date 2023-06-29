/* eslint-disable no-unused-vars */
import '../../Home.css';
import '../../styles/Cliente.css'
import { useParams, useNavigate, Link    } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { URL } from '../../data/URL';
import { IMAGE } from '../../data/URL'
import Divider from '@mui/material/Divider';
import Chip from '@mui/material/Chip';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CancelIcon from '@mui/icons-material/Cancel';
import BuildIcon from '@mui/icons-material/Build';
import BlockIcon from '@mui/icons-material/Block';
import BusinessIcon from '@mui/icons-material/Business';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import axios from 'axios';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormHelperText from '@mui/material/FormHelperText';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Swal from 'sweetalert2';
import { CompletarPago, editarEstadoReserva } from '../../database/Pagos.Controller';

export const InfoReserva = () => {
    const { id } = useParams();
    const [reservas, setReservas] = useState([]);
    const [autos, setAutos] = useState([]);
    const [clientes, setClientes] = useState([]);
    const [licencias, setLicencias] = useState([]);
    const [tipoPago, setTipoPago] = useState('');
    // eslint-disable-next-line no-unused-vars
    const [sinIva, setsinIva] = useState([]);
    const [costoTotal, setcostoTotal] = useState([]);
    const [pagos, setPagos] = useState({ fecha_pago: '', tipo: '', monto: '', id_cliente: '', id_auto: '' });


    const history = useNavigate();

    const navigateTo = (path) => {
        history(path);
    }

    //EDITAR ESTADO
    const editarEstado = async (estadoP) => {
        var fechaActual = new Date();

        // Obtiene los componentes de la fecha
        var año = fechaActual.getFullYear();
        var mes = fechaActual.getMonth() + 1; // Los meses van de 0 a 11, por eso se suma 1
        var dia = fechaActual.getDate();
        pagos.fecha_pago = año + '-' + mes + '-' + dia;
        pagos.tipo = tipoPago;
        pagos.monto = reservas.monto;
        pagos.id_cliente = clientes.id_cliente;
        pagos.id_auto = autos.id_auto;

        if (!pagos.tipo || !reservas.monto || !pagos.id_cliente || !pagos.id_auto) {
            Swal.fire({
                title: "Error",
                text: "Por favor, completa el Tipo de Pago!",
                icon: "error",
                button: "Aceptar"
            });
            return
        }
        Swal.fire({
            title: '¿Estas seguro de realizar esta acción?',
            text: "No podras retractarte despues!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Si, guardar los cambios'
        }).then(async (result) => {
            if (result.isConfirmed) {
                try {
                    await CompletarPago(pagos);
                    await editarEstadoReserva(reservas.id_reserva, estadoP)
                    history(`/Reservas`);
                    Swal.fire(
                        'Datos actualizados',
                        'Puedes revisar las configuraciones',
                        'success'
                    );
                } catch (error) {
                    console.error(error);
                    Swal.fire(
                        'Error',
                        'Ocurrió un error al actualizar los datos',
                        'error'
                    );
                }

            }
        })
    }
    const cancelarPago = async (estadoP) => {
        try {
            Swal.fire({
                title: '¿Estas seguro de realizar esta acción?',
                text: "No podras retractarte despues!",
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Si, Cancelar la reserva'
            }).then(async (result) => {
                if (result.isConfirmed) {
                    try {
                        await editarEstadoReserva(reservas.id_reserva, estadoP)
                        history(`/Reservas`);
                        Swal.fire(
                            'Datos actualizados',
                            'Puedes revisar las configuraciones',
                            'success'
                        );
                    } catch (error) {
                        console.error(error);
                        Swal.fire(
                            'Error',
                            'Ocurrió un error al actualizar los datos',
                            'error'
                        );
                    }

                }
            })
        } catch (error) {
            console.error(error);
            Swal.fire(
                'Error',
                'Ocurrió un error al actualizar los datos',
                'error'
            );
        }
    }
    const handleChange = (event) => {
        setTipoPago(event.target.value);
    };
    // CARGA DE DATOS de la reserva
    useEffect(() => {
        const fetchData = async () => {
            let dataLoaded = false;

            while (!dataLoaded) {
                try {
                    const reservaResponse = await axios.get(`${URL}/reservas/${id}`);
                    const clientesResponse = await axios.get(`${URL}/clientes/${reservaResponse.data.id_cliente}`);
                    const autosResponse = await axios.get(`${URL}/autos/${reservaResponse.data.id_auto}`);
                    const licenciasResponse = await axios.get(`${URL}/licencia/${clientesResponse.data.id_licencia}`);
                    setReservas(reservaResponse.data)
                    setClientes(clientesResponse.data);
                    setAutos(autosResponse.data);
                    setLicencias(licenciasResponse.data);
                    dataLoaded = true;
                } catch (error) {
                    console.error(error);
                }
            }

        }
        fetchData();
        const fechaEntrega = new Date(reservas.fecha_entrega);
        const fechaDevolucion = new Date(reservas.fecha_devolucion);
        const diffTime = Math.abs(fechaDevolucion - fechaEntrega);
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
        // eslint-disable-next-line no-unused-vars
        setcostoTotal(reservas.monto);
    }, [id]);


    return (
        <div className="page-content">
            {id}
            <div className="EditClientP">
                <div className='ConteidoClient'>
                    <div className='ClienteFotos'>
                        <img src={`${IMAGE}/${autos.fotos}`} className="portada2" />
                        <img src={`${IMAGE}/${clientes.foto}`} className="portada2" />
                    </div>
                    <div className='InfoClient'>
                        <Divider textAlign="left" component="div" role="presentation">
                            <Chip color="primary" label="Informacion del Cliente" />
                        </Divider>
                        <div className='InfoSection'>
                            <div className='ClientInfo'>
                                <label htmlFor='nombre'>Solicitante:</label>
                                <input type='text' id='nombre' value={clientes.nombre + ' ' + clientes.apellido} readOnly />
                            </div>
                            <div className='ClientInfo'>
                                <label htmlFor='apellido'>Cedula:</label>
                                <input type='text' id='apellido' value={clientes.cedula} readOnly />
                            </div>
                        </div>
                        <div className='InfoSection'>
                            <div className='ClientInfo'>
                                <label htmlFor='correo'>Estado:</label>
                                {clientes.estado ? <CheckCircleIcon color='success' className='IconsP' /> : <CancelIcon color='error' />}
                            </div>
                            <div className='ClientInfo'>
                                <label htmlFor='correo'>Licencia:</label>
                                {licencias.estado ? <CheckCircleIcon color='success' className='IconsP' /> : <CancelIcon color='error' />}
                            </div>
                            <div className='ClientInfo'>
                            <Link to={`/InfoClient/${clientes.id_cliente}`}>
                                  <Button variant="outlined">Ver Perfil</Button>
                            </Link>
                              
                            </div>
                        </div>
                        <Divider textAlign="left" component="div" role="presentation">
                            <Chip color="primary" label="Informacion del Vehiculo" />
                        </Divider>
                        <div className='InfoSection'>

                            <div className='ClientInfo'>
                                <label htmlFor='genero'>Marca:</label>
                                <input type='text' id='genero' value={autos.marca} readOnly />
                            </div>
                            <div className='ClientInfo'>
                                <label htmlFor='estado'>Modelo:</label>
                                <input type='text' id='estado' value={autos.modelo} readOnly />
                            </div>
                        </div>
                        <div className='InfoSection'>
                            <div className='ClientInfo'>
                                <label htmlFor='licencia'>Placas:</label>
                                <input type='text' id='licencia' value={autos.placas} readOnly />
                            </div>
                            <div className='ClientInfo'>
                                <label htmlFor='categoria'>Costo:</label>
                                <label type='text' id='categoria' value={autos.precio} readOnly >{autos.precio} </label>
                            </div>
                            <div className='ClientInfo'>
                                <label htmlFor='categoria'>Estado:</label>
                                {autos.estado === 'DISPONIBLE' && <CheckCircleIcon color='success' className='IconsP' />}
                                {autos.estado === 'MANTENIMIENTO' && <BuildIcon color='primary' className='IconsP' />}
                                {autos.estado === 'FUERA DE SERVICIO' && <BlockIcon color='error' className='IconsP' />}
                                {autos.estado === 'OCUPADO' && <BusinessIcon color='primary' className='IconsP' />}
                            </div>
                            <Link to={`/Autos/${autos.id_auto}`}>
                                  <Button variant="outlined">Ver Perfil</Button>
                            </Link>
                        </div>
                        <Divider textAlign="left" component="div" role="presentation">
                            <Chip color="info" label="Detalles de la reserva" />
                        </Divider>
                        <div className='InfoSection'>
                            <div className='ClientInfo'>
                                <label htmlFor='fecha_caducidad'>Desde:</label>
                                <input type="date" value={reservas.fecha_entrega} />
                            </div>
                            <div className='ClientInfo'>
                                <label htmlFor='licencia_estado'>Hasta:</label>
                                <input type='date' id='licencia_estado' value={reservas.fecha_devolucion} />
                            </div>
                        </div>
                        <div className='InfoSection'>
                            <div className='ClientInfo'>
                                <label htmlFor='fecha_caducidad'>Costo Sin Iva:</label>
                            </div>
                            <div className='ClientInfo'>
                                <label htmlFor='licencia_estado'>Costo Total:</label>
                                <label>{reservas.monto}</label>
                            </div>
                        </div>
                        <div className='InfoSection'>
                            <div className='ClientInfo'>
                                <label htmlFor='fecha_caducidad'>Estado:</label>
                                <input type="text" value={reservas.estado} />
                            </div>
                            <div className='ClientInfo'>
                                {reservas.estado === 'PENDIENTE' ? (
                                    <FormControl sx={{ m: 1, minWidth: 120 }}>
                                        <InputLabel id="demo-simple-select-helper-label">Pago</InputLabel>
                                        <Select
                                            labelId="demo-simple-select-helper-label"
                                            id="demo-simple-select-helper"
                                            value={tipoPago}
                                            label="Age"
                                            onChange={handleChange}
                                        >
                                            <MenuItem value="">
                                                <em>None</em>
                                            </MenuItem>
                                            <MenuItem value="FISICO">Pago Fisico</MenuItem>
                                            <MenuItem value="TRANSFERENCIA">Transferencia</MenuItem>
                                            <MenuItem value="OTRO">Otro</MenuItem>
                                        </Select>
                                        <FormHelperText>Seleccione el tipo de Pago</FormHelperText>
                                    </FormControl>
                                ) : (
                                    reservas.estado === 'CANCELADO' ? (
                                        <label style={{  color: 'red' }}>No se llevó a cabo la Reserva</label>
                                    ) : (
                                        <label style={{  color: 'green' }}>Pago Confirmado</label>
                                    )
                                )}



                            </div>
                        </div>

                    </div>

                </div>
                <div className='btnSlider btnClient'>
                    {reservas.estado === 'PENDIENTE' ? (
                        <>
                            <Stack spacing={10} direction="row">
                                <Button variant="text" onClick={() => cancelarPago('CANCELADO')}>CANCELAR RESERVA</Button>
                                <Button variant="contained" onClick={() => editarEstado('CONCRETADO')}>CONCRETAR RESERVA</Button>
                                <Button variant="outlined" onClick={() => editarEstado('PENDIENTE')}>MANTENER EN PENDIENTE</Button>
                            </Stack>

                        </>
                    ) : (
                        <Button variant="outlined" onClick={() => navigateTo('/Reservas')} style={{ backgroundColor: 'yellow', color: 'black' }}>VOLVER</Button>
                    )}
                </div>
                <div>
                </div>
            </div>
        </div>
    )
}
