/* eslint-disable no-unused-vars */
//import '../../Home.css';
//import '../../styles/Cliente.css'
import { useParams, useNavigate, Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { URL } from '/src/admin/data/URL.js';
import { IMAGE } from '/src/admin/data/URL.js'
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
import TextareaAutosize from '@mui/base/TextareaAutosize';
import Swal from 'sweetalert2';
import { CompletarPago, editarEstadoReserva } from '../database/Pagos.Controller';
import { CambioStadoAuto } from '/src/admin/database/Controller.js';
import { crearHistorial } from '/src/admin/database/History.Controller';

import stil from './InfoReserva.module.css'

export const InfoReserva = () => {
	const { id } = useParams();
	const [reservas, setReservas] = useState([]);
	const [autos, setAutos] = useState([]);
	const [clientes, setClientes] = useState([]);
	const [licencias, setLicencias] = useState([]);
	const [tipoPago, setTipoPago] = useState('');
	// eslint-disable-next-line no-unused-vars
	const [comentario, setComentario] = useState('SIN COMENTARIOS');
	const [costoTotal, setcostoTotal] = useState([]);
	const [estadoAuto, setEstadoAuto] = useState('');
	const [pagos, setPagos] = useState({ fecha_pago: '', tipo: '', monto: '', id_cliente: '', id_auto: '' });
	const [historial, setHistorial] = useState({ fecha_renta: '', comentario: '', id_cliente: '', id_pago: '' });

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

		historial.id_cliente = clientes.id_cliente;
		historial.fecha_renta = año + '-' + mes + '-' + dia;
		historial.comentario = comentario;

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
					await editarEstadoReserva(reservas.id_reserva, estadoP);
					setEstadoAuto('OCUPADO');
					await CambioStadoAuto(autos.id_auto, 'OCUPADO')
					const pagosResponse = await axios.get(`${URL}/pagos`);
					const pagoEncontrado = pagosResponse.data.find(pago =>
						pago.id_cliente === clientes.id_cliente &&
						pago.id_auto === autos.id_auto &&
						pago.monto === reservas.monto
					);

					if (pagoEncontrado) {
						historial.id_pago = pagoEncontrado.id_pago;
						await crearHistorial(historial)
					}
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
						if (estadoP === 'CANCELADO') {
							setEstadoAuto('DISPONIBLE');
							await CambioStadoAuto(autos.id_auto, 'DISPONIBLE')
						}
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
		<section className={stil.contentInfo}>
				<form className={stil.form}>
					<div className={stil.contentImg}>
						<img src={`${IMAGE}/${clientes.foto}`} className={stil.FotoCedula} />
					</div>
					<span className={stil.Separador}>Información del cliente</span>
						<label htmlFor='nombre' className={stil.formLabel}>
							Solicitante:
							<input type='text' id='nombre' value={clientes.nombre + ' ' + clientes.apellido} readOnly className={stil.in} />
						</label>
						<label htmlFor='apellido' className={stil.formLabel}>
							Cedula:
							<input type='text' id='apellido' value={clientes.cedula} readOnly className={stil.in} />
						</label>
						<label htmlFor='correo' className={stil.formLabel}>
							Estado:
							{clientes.estado ? <CheckCircleIcon color='success' className='IconsP' /> : <CancelIcon color='error' />}
						</label>
						<label htmlFor='correo' className={stil.formLabel}>
							Licencia:
							{licencias.estado ? <CheckCircleIcon color='success' className='IconsP' /> : <CancelIcon color='error' />}
						</label>
					<Link to={`/Home/Clientes/InfoClient/${clientes.id_cliente}`} variant="outlined" className={stil.btn}>
						<Button variant="outlined">Ver Perfil</Button>
					</Link>
				</form>
				<form className={stil.form}>
					<div className={stil.contentImg}>
						<img src={`${IMAGE}/${autos.fotos}`} className={stil.FotoCarro} />
					</div>
					<span className={stil.Separador}>Información del vehículo</span>
						<label htmlFor='genero' className={stil.formLabel}>
							Marca:
							<input type='text' id='genero' value={autos.marca} readOnly className={stil.in} />
						</label>
						<label htmlFor='estado' className={stil.formLabel}>
							Modelo:
							<input type='text' id='estado' value={autos.modelo} readOnly className={stil.in} />
						</label>
						<label htmlFor='licencia' className={stil.formLabel}>
							Placas:
							<input type='text' id='licencia' value={autos.placas} readOnly className={stil.in} />
						</label>
						<label htmlFor='categoria' className={stil.formLabel}>
							Costo:
							<label type='text' id='categoria' value={autos.precio} readOnly >{autos.precio} </label>
						</label>
						<label htmlFor='categoria' className={stil.formLabel}>
							Estado:
							{autos.estado === 'DISPONIBLE' && <CheckCircleIcon color='success' className='IconsP' />}
							{autos.estado === 'MANTENIMIENTO' && <BuildIcon color='primary' className='IconsP' />}
							{autos.estado === 'FUERA DE SERVICIO' && <BlockIcon color='error' className='IconsP' />}
							{autos.estado === 'OCUPADO' && <BusinessIcon color='primary' className='IconsP' />}
						</label>
					<Link to={`/Home/Autos/${autos.id_auto}`} className={stil.btn}>
						<Button variant="outlined">Ver Perfil</Button>
					</Link>
				</form>
				<form className={stil.form}>

					<span className={stil.Separador}>Detalles de la reserva</span>

						<label htmlFor='fecha_caducidad' className={stil.formLabel}>
							Desde:
							<input type="date" value={reservas.fecha_entrega} className={stil.in} />
						</label>
						<label htmlFor='licencia_estado' className={stil.formLabel}>
							Hasta:
							<input type='date' id='licencia_estado' value={reservas.fecha_devolucion} className={stil.in} />
						</label>
						<label htmlFor='fecha_caducidad' className={stil.formLabel}>Costo Sin Iva:</label>
						<label htmlFor='licencia_estado' className={stil.formLabel}>
							Costo Total:
							<label>{reservas.monto}</label>
						</label>
						<label htmlFor='fecha_caducidad' className={stil.formLabel}>
							Estado:
							<input type="text" value={reservas.estado} className={stil.in} />
						</label>
						<div className={stil.formLabel}>
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
										<MenuItem value="TRASNFERENCIA">Transferencia</MenuItem>
										<MenuItem value="OTRO">Otro</MenuItem>
									</Select>
									<FormHelperText>Seleccione el tipo de Pago</FormHelperText>
								</FormControl>
							) : (
								reservas.estado === 'CANCELADO' ? (
									<label style={{ color: 'red' }}>No se llevó a cabo la Reserva</label>
								) : (
									<label style={{ color: 'green' }}>Pago Confirmado</label>
								)
							)}
						</div>
						<label htmlFor='fecha_caducidad' className={stil.formLabel}>Añade un comentario:</label>
						<TextareaAutosize
							minRows={1} style={{ background: 'white', color: 'black', width: '300px' }}
							value={comentario}
							onChange={(e) => setComentario(e.target.value)} />
					{reservas.estado === 'PENDIENTE' ? (
						<>
							<Stack spacing={10} direction="row">
								<Button variant="text" onClick={() => cancelarPago('CANCELADO')}>CANCELAR RESERVA</Button>
								<Button variant="contained" onClick={() => editarEstado('CONCRETADO')}>CONCRETAR RESERVA</Button>
								<Button variant="outlined" onClick={() => editarEstado('PENDIENTE')}>MANTENER EN PENDIENTE</Button>
							</Stack>

						</>
					) : (
						<Link className={stil.btn} to={'/Home/Reservas'}>
							<Button variant="outlined" style={{ backgroundColor: 'yellow', color: 'black' }}>VOLVER</Button>
						</Link>
					)}
			</form>
		</section>
	)
}