
import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
//import '../Home.css';
//import '../styles/Cliente.css'
import axios from 'axios';
import Swal from 'sweetalert2';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CancelIcon from '@mui/icons-material/Cancel';

import { URL } from '../data/URL';
import { IMAGE } from '../data/URL'
import { editarEstadoClient } from '../database/ClientController';
import stil from './InfoClient.module.css'

export const InfoClient = () => {
	const { id } = useParams();
	const [clientes, setClientes] = useState([]);
	const [licencias, setLicencias] = useState([]);
	const [user, setUser] = useState([]);
	const [estado, setEstado] = useState('');

	const editarEstado = async (id, estado2) => {
		setEstado(estado2);
		if (!id || !estado) {
			Swal.fire({
				icon: 'error',
				text: 'Algo Salio Mal.',
			});
			return;
		}
		Swal.fire({
			title: 'Estas seguro de esta acción?',
			text: "Estas por actualizar la cuenta!",
			icon: 'warning',
			showCancelButton: true,
			confirmButtonColor: '#3085d6',
			cancelButtonColor: '#d33',
			confirmButtonText: 'Si, actualizar!'
		}).then(async (result) => {
			if (result.isConfirmed) {
				try {

					await editarEstadoClient(id, estado2);
					Swal.fire({
						position: 'center',
						icon: 'success',
						title: 'Editado Existosamente',
						showConfirmButton: false,
						timer: 1500
					})
				} catch (error) {
					Swal.fire({
						icon: 'error',
						title: 'Valores Incorrectos',
						text: 'ERROR DE TIPO: ' + error.message,
					});
				}
			}
		})
	}

	useEffect(() => {
		const fetchData = async () => {
			let dataLoaded = false;

			while (!dataLoaded) {
				try {
					const clientesResponse = await axios.get(`${URL}/clientes/${id}`);
					const licenciasResponse = await axios.get(`${URL}/licencia/${clientesResponse.data.id_licencia}`);
					const usersResponse = await axios.get(`${URL}/user/${clientesResponse.data.id_usuario}`);

					setClientes(clientesResponse.data);
					setLicencias(licenciasResponse.data);
					setUser(usersResponse.data);

					dataLoaded = true;
				} catch (error) {
					console.error(error);
				}
			}
		};
		fetchData();

	}, [id]);
	useEffect(() => {
		setEstado(clientes.estado);
	}, [clientes.estado])

	return (
		<section className={stil.clienteInfo}>
			<article className={stil.contentImg}>
				<img src={`${IMAGE}/${clientes.foto}`} className={stil.imgCliente} />
				<img src={`${IMAGE}/${licencias.fotolicencia}`} className={stil.imgCliente} />
				<button className={stil.formBtn} onClick={() => editarEstado(id, 'NO HABILITADO')}>DESHABILITAR CUENTA</button>
				<button className={stil.formBtn} onClick={() => editarEstado(id, 'HABILITADO')}>HABILITAR CUENTA</button>
				<button className={stil.formBtn} onClick={() => editarEstado(id, 'PENDIENTE')}>MANTENER EN PENDIENTE</button>
			</article>
			<article className={stil.contentForm}>
				<form className={stil.form}>
					<span className={stil.separador}>Información del Cliente</span>
					<label className={stil.labelForm} htmlFor='nombre'>Nombre:
						<input className={stil.in} type='text' id='nombre' value={clientes.nombre} readOnly />
					</label>
					<label className={stil.labelForm} htmlFor='apellido'>Apellido:
						<input className={stil.in} type='text' id='apellido' value={clientes.apellido} readOnly />
					</label>
					<label className={stil.labelForm} htmlFor='correo'>Correo:
						<input className={stil.in} type='text' id='correo' value={user.correo} readOnly />
					</label>
					<label className={stil.labelForm} htmlFor='cedula'>Cédula:
						<input className={stil.in} type='text' id='cedula' value={clientes.cedula} readOnly />
					</label>
					<label className={stil.labelForm} htmlFor='genero'>Género:
						<input className={stil.in} type='text' id='genero' value={clientes.genero} readOnly />
					</label>
					<label className={stil.labelForm} htmlFor='estado'>Estado:
						<input className={stil.in} type='text' id='estado' value={estado} readOnly />
					</label>
					<span className={stil.separador}>Información de Licencia</span>
					<label className={stil.labelForm} htmlFor='licencia'>Licencia:
						<input className={stil.in} type='text' id='licencia' value={licencias.id_licencia} readOnly />
					</label>
					<label className={stil.labelForm} htmlFor='categoria'>Categoría:
						<input className={stil.in} type='text' id='categoria' value={licencias.categoria} readOnly />
					</label>
					<label className={stil.labelForm} htmlFor='fecha_caducidad'>Fecha de Caducidad:
						<input className={stil.in} type='text' id='fecha_caducidad' value={licencias.fecha_caducidad} readOnly />
					</label>
					<label className={stil.labelForm} htmlFor='licencia_estado'>Estado:
						{licencias.estado ? <CheckCircleIcon color='success' className={stil.icon} /> : <CancelIcon color='error' />}
					</label>
				</form>
			</article>
		</section>
	);
};
