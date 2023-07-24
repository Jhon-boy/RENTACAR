//import '../Home.css'
import { useState, useEffect } from 'react';
import DataTable from 'react-data-table-component';
import { Link } from 'react-router-dom'
import Swal from 'sweetalert2';

import { Modal } from '@mui/material';

import { URL } from '../data/URL';
import { eliminarAuto } from '../database/controller';
import { ModalChangeState } from './ModalChangeState';

import { BtnAutos } from '../data/BtnAdmin';
import SliderBar from '../SliderBar';
import customStyles from '../config/ConfigTable'
import stil from './TableAutos.module.css'

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

	const modalStyle = {
		top: modalPosition.y,
		left: modalPosition.x,
		position: 'absolute',
		border: '1px solid black',
		padding: '16px',
		display: 'flex',
		flexDirection: 'column',
		gap: '8px',
	};

	useEffect(() => {
		fetch(`${URL}/autos`)
			.then(response => response.json())
			.then(data => setCars(data))
			.catch(error => console.log(error));
	}, []);

	const handleDelete = async (id_auto) => {
		try {
			await eliminarAuto(id_auto);
			Swal.fire({
				position: 'center',
				icon: 'success',
				title: 'Your work has been saved',
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

	};
	const columns = [
		{
			name: 'Id',
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
			cell: (row) => (
				<article>
					<button className={stil.btnEstado} onClick={() => { setTempId(row.id_auto); handleOpenModal(); }}>
						{row.estado}
						<img className={stil.btnImageReverse} src="https://www.svgrepo.com/show/511904/edit-1479.svg"/>
					</button>
					<Modal open={showModal} onClose={handleCloseModal} className=''>
						<div className="" style={modalStyle}>
							<ModalChangeState idAuto={tempId} estado={row.estado} />
						</div>
					</Modal>
				</article>
			),
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
						<img className={stil.btnImage} src="https://www.svgrepo.com/show/522316/trash.svg" alt="" />
					</Link>
					<Link 
						className={stil.btn}
						to={`/Home/Autos/EditCar/${row.id_auto}`}>  
						<img className={stil.btnImage} src="https://www.svgrepo.com/show/511904/edit-1479.svg" alt="" />
					</Link>
					<Link 
						className={stil.btn}
						to={`/Home/Autos/${row.id_auto}`}>
						<img className={stil.btnImage} src="https://www.svgrepo.com/show/514119/eye.svg" alt="" />
					</Link>
				</article>
			),
			width:`130px`
		},
	];


	return (
		<section className={stil.sectionTabla}>
			<SliderBar btnDatos={BtnAutos} />
			<div className={stil.contentTabla}>
				<DataTable
				columns={columns}
				data={cars}
				customStyles={customStyles}
				title="Autos"
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
