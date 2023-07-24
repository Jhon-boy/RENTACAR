//import '../Home.css'
import { useState, useEffect } from 'react';
import DataTable from 'react-data-table-component';
import { Link } from 'react-router-dom'
import Swal from 'sweetalert2';
import Button from '@mui/material/Button';
import { MdEditNote } from 'react-icons/md';
import { Modal, TextField, Stack } from '@mui/material';

import { URL } from '../data/URL';
import { eliminarAuto } from '../database/controller';
import { ModalChangeState } from './ModalChangeState';
import customStyles from '../config/ConfigTable'
import stil from './Autos.module.css'

export const TableAutos = () => {
	const [cars, setCars] = useState([]);
	const [showModal, setShowModal] = useState(false);
	const [tempId, setTempId] = useState(0);
	const [modalPosition, setModalPosition] = useState({ x: 0, y: 0 });

	const handleOpenModal = () => {
		const { clientX, clientY } = event;
		setModalPosition({ x: clientX, y: clientY });
		setShowModal(true);
	};

	const handleCloseModal = () => {
		setShowModal(false);
	};
	const getCurrentStatus = (row) => {
		const buttonStyle = {
			marginTop: '5px',
			marginBottom: '2px',
			borderRadius: '7px',
			padding: '5px 10px',
			fontWeight: 'bold',
			fontSize: '8px',
			width: '130px',
			height: '25px',
			color: row.estado === 'FUERA DE SERVICIO' ? 'white' : 'black',
			backgroundColor:
				row.estado === 'FUERA DE SERVICIO'
					? 'red' // Color de fondo para "FUERA DE SERVICIO" en rojo
					: row.estado === 'MANTENIMIENTO'
						? 'orange' // Color de fondo para "MANTENIMIENTO" en verde claro
						: row.estado === 'OCUPADO'
							? '#fff2cc' // Color de fondo para "OCUPADO" en amarillo claro
							: '#90EE85', // Color de fondo para "DISPONIBLE" en azul claro
		};

		return (
			<>
				<Button variant="contained" style={buttonStyle} onClick={() => { setTempId(row.id_auto); handleOpenModal(); }}>
					{row.estado}
					<MdEditNote style={{ color: 'purple', height: '70px' }} />
				</Button>
				<Modal open={showModal} onClose={handleCloseModal} className={stil.modal_container} >
					<div className={stil.modal_container} style={modalStyle}>
						<ModalChangeState idAuto={tempId} estado={row.estado} />
					</div>
				</Modal>
			</>

		);
	};

	const modalStyle = {
		top: modalPosition.y,
		left: modalPosition.x,
		position: 'absolute',
		border: '1px solid black',
		padding: '16px',
		display: 'flex',
		flexDirection: 'column',
		gap: '8px',
		backgroundColor: '#ffffff', // Color blanco para el fondo del modal
		borderRadius: '8px',
		boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)', // Agrega una sombra
	};
	useEffect(() => {
		fetch(`${URL}/autos`)
			.then(response => response.json())
			.then(data => setCars(data))
			.catch(error => console.log(error));
	}, []);

	const handleDelete = async (id_auto) => {
		Swal.fire({
			title: 'Esta seguro de eliminar los datos del auto?',
			text: "Puedes modificar los datos despues!",
			icon: 'warning',
			showCancelButton: true,
			confirmButtonColor: '#3085d6',
			cancelButtonColor: '#d33',
			confirmButtonText: 'Si, Eliminar'
		}).then(async (result) => {
			if (result.isConfirmed) {
				try {
					await eliminarAuto(id_auto);
					Swal.fire({
						position: 'center',
						icon: 'success',
						title: 'Auto Eliminado',
						showConfirmButton: false,
						timer: 1500
					})
				} catch (error) {
					Swal.fire({
						icon: 'error',
						title: 'Algo Salio mal',
						text: 'Error: ' + error.message,
					});
				}
			}
		})

	};

	const columns = [
		{
			name: 'ID',
			selector: 'id_auto',
			sortable: true,
			width: '70px'
		},
		{
			name: 'PLACAS',
			selector: 'placas',
			sortable: true,
			width: '100px'
		},
		{
			name: 'MARCA',
			selector: 'marca',
			sortable: true,
			width: '100px'
		},
		{
			name: 'MODELO',
			selector: 'modelo',
			sortable: true,
			width: '100px'
		},
		{
			name: 'AÑO',
			selector: 'anio',
			sortable: true,
		},
		{
			name: 'ESTADO',
			selector: 'estado',
			sortable: true,
			width: '225px',
			cell: (row) => getCurrentStatus(row),
		},

		{
			name: 'TIPO',
			selector: 'tipo',
			sortable: true,
			width: '200px'
		},
		{
			name: 'PRECIO',
			selector: 'precio',
			sortable: true,
			width: '100px'
		},
		{
			name: 'OPCIONES',
			cell: (row) => (
				<article className={stil.cellOptions}>
					<Link
						className={stil.btn}
						onClick={() => handleDelete(row.id_auto)}>
						<img className={stil.btnImage} src="https://cdn-icons-png.flaticon.com/512/4734/4734087.png" alt="" />
					</Link>
					<Link
						className={stil.btn}
						to={`/Home/Autos/EditCar/${row.id_auto}`}>
						<img className={stil.btnImage} src="https://cdn-icons-png.flaticon.com/512/1160/1160515.png" alt="" />
					</Link>
					<Link
						className={stil.btn}
						to={`/Home/Autos/${row.id_auto}`}>
						<img className={stil.btnImage} src="https://cdn-icons-png.flaticon.com/512/3659/3659738.png" alt="" />
					</Link>
				</article>
			),
			width: `130px`
		},
	];


	return (
		<section className={stil.sectionTabla}>
			<div className={stil.contentTabla}>
				<div style={{ marginTop: '15px', marginBottom: '10px', display: 'flex' }}>
					<div>
						<Link to='/Home/Autos/crearAuto'>
							<Button size="meduim" variant="contained">Agregar Auto</Button>
						</Link>
					</div>
					<div>
						<div style={{ marginLeft: '50px', width: '100%' }}>
							<Stack direction="row" spacing={1} alignItems="center">
								<TextField
									label="Buscar por placas"
									variant="outlined"
									style={{ width: '300px' }}
								/>
								<Button variant="outlined" >
									Buscar
								</Button>
							</Stack>
						</div>
					</div>

				</div>

				<DataTable
					columns={columns}
					data={cars}
					customStyles={customStyles}
					title="Registro de todos los autos"
					pagination
					highlightOnHover
					striped
					dense
					paginationPerPage={10}
					paginationRowsPerPageOptions={[5, 10]}
				/>
			</div>
		</section>

	)
}
