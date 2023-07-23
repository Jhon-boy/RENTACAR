/* eslint-disable no-unused-vars */
import { useEffect, useState } from "react";
import DataTable from 'react-data-table-component';
import { Link } from 'react-router-dom'
import { Button } from "@mui/material";
import { URL } from "/src/admin/data/URL.js";
import { MdEditNote } from 'react-icons/md';
import { MdRestoreFromTrash } from "react-icons/md";
import customStyles from '../config/ConfigTable'
import stil from './Table.module.css'
import Swal from "sweetalert2";

import SliderBar from '../SliderBar.jsx';
import { BtnReserva } from "../data/BtnAdmin";

export const TablePending = () => {
	const [activeTab, setActiveTab] = useState('pending');
	const [reservas, setReservas] = useState([]);
	const [autos, setAutos] = useState([]);


	useEffect(() => {
		fetch(`${URL}/reservas`)
			.then((response) => response.json())
			.then((data) => setReservas(data))
			.catch((error) => console.log(error));
	}, []);

	const [clientes, setClientes] = useState([]);

	useEffect(() => {
		fetch(`${URL}/clientes`)
			.then((response) => response.json())
			.then((data) => setClientes(data))
			.catch((error) => console.log(error));
	}, []);

	useEffect(() => {
		fetch(`${URL}/autos`)
			.then((response) => response.json())
			.then((data) => setAutos(data))
			.catch((error) => console.log(error));
	}, []);

	const getMarcaModeloAuto = (idAuto) => {
		const auto = autos.find((auto) => auto.id_auto === idAuto);
		return auto ? `${auto.marca} ${auto.modelo}` : '';
	};


	const getNombreCliente = (idCliente) => {
		const cliente = clientes.find((cliente) => cliente.id_cliente === idCliente);
		return cliente ? `${cliente.nombre} ${cliente.apellido}` : '';
	};

	const getCurrentStatus = (row) => {
		const fechaActual = new Date();
		const fechaEntrega = new Date(row.fecha_entrega);
		const fechaDevolucion = new Date(row.fecha_devolucion);

		// Obtener el estado de la fila
		let estado;
		if (fechaActual < fechaEntrega) {
			estado = 'PRÓXIMAMENTE';
		} else if (fechaActual > fechaDevolucion) {
			estado = 'FINALIZÓ';
		} else {
			estado = 'EN CURSO';
		}

		// Asignar estilos en línea de acuerdo al estado
		const buttonStyle = {
			marginTop: '5px',
			marginBottom: '2px',
			borderRadius: '7px',
			padding: '5px 10px',
			fontWeight: 'bold',
			fontSize: '8px', // Tamaño de fuente de 8px
			width: '100px',
			height: '25px',
			color: estado === 'FINALIZÓ' ? 'red' : estado === 'EN CURSO' ? '#ffd699' : 'green',
			backgroundColor:
				estado === 'FINALIZÓ'
					? '#ffe5e5' // Color de fondo para "FINALIZÓ" en rojo claro
					: estado === 'EN CURSO'
						? '#fff2cc' // Color de fondo para "EN CURSO" en color piel claro
						: '#d9f4d9', // Color de fondo para "PRÓXIMAMENTE" en verde claro
		};

		return (
			<Button className="status-button" variant="outlined" style={buttonStyle} disabled>
				{estado}
			</Button>
		);
	};

	const getEstado = (row) => {
		// Obtener el estado de la fila
		const estado = row.estado;

		// Asignar el título del botón según el estado
		let title;
		switch (estado) {
			case 'CANCELADO':
				title = 'CANCELADO';
				break;
			case 'CONCRETADO':
				title = 'CONCRETADO';
				break;
			case 'PENDIENTE':
				title = 'PENDIENTE';
				break;
			default:
				title = 'Estado desconocido';
			// Puedes asignar un título predeterminado si el estado no coincide con ninguno de los casos anteriores
		}

		// Asignar estilos en línea de acuerdo al estado
		const buttonStyle = {
			marginTop: '5px',
			marginBottom: '2px',
			borderRadius: '7px',
			padding: '5px 10px',
			fontWeight: 'bold',
			fontSize: '8px', // Tamaño de fuente de 12px
			width: '100px',
			height: '25px',
			color: estado === 'CANCELADO' ? 'red' : estado === 'CONCRETADO' ? 'green' : '#ffd699',
			backgroundColor:
				estado === 'CANCELADO'
					? '#ffe5e5'
					: estado === 'CONCRETADO'
						? '#d9f4d9'
						: '#fff2cc',
		};

		return (
			<Button className="status-button" variant="outlined" style={buttonStyle}>
				{title}
			</Button>
		);
	};

	const handleDelete = async (id) => {
		Swal.fire({
			icon: 'error',
			title: 'Oops...',
			text: 'No puedes eliminar esta reserva',
			footer: '<a href="">Why do I have this issue?</a>'
		})
	}
	const filteredReservas = reservas.filter((reserva) => reserva.estado === 'PENDIENTE');
	const columns = [
		{
			name: 'Reserva',
			selector: 'id_reserva',
			sortable: true,
			width: '90px'
		},
		{
			name: 'ID Auto',
			selector: 'id_auto',
			sortable: true,
			width: '140px',
			cell: (row) => getMarcaModeloAuto(row.id_auto),
		},
		{
			name: 'Cliente',
			selector: 'id_cliente',
			sortable: true,
			width: '150px',
			cell: (row) => getNombreCliente(row.id_cliente),
		},
		{
			name: 'Estado',
			selector: 'estado',
			sortable: true,
			width: '120px',
			cell: (row) => getEstado(row),
		},
		{
			name: 'Desde',
			selector: 'fecha_entrega',
			sortable: true,
			width: '130px',
		},
		{
			name: 'Hasta',
			selector: 'fecha_devolucion',
			sortable: true,
			width: '130px',
		}
		,
		{
			name: 'Costo total',
			selector: 'monto',
			sortable: true,
			width: '90px'
		}, {
			name: 'OPCIONES',
			cell: (row) => (
				<div className={stil.cellOptiones}>
					<Link
						variant="outlined"
						className={stil.btn}
						onClick={() => handleDelete(row.id_reserva)}>
						<MdRestoreFromTrash className={stil.btnImage} style={{ color: 'red', height: '50px' }} src="https://www.svgrepo.com/show/522316/trash.svg" alt="" />
					</Link>
					<Link
						to={`/Home/Reservas/InfoReserva/${row.id_reserva}`}
						variant="outlined"
						className={stil.btn}>
						<MdEditNote className={stil.btnImage} style={{ color: 'blue', height: '50px' }} src="https://www.svgrepo.com/show/511904/edit-1479.svg" alt="" />
					</Link>
				</div>
			),
			width: '110px'
		},
		{
			name: 'Estado',
			selector: '',
			sortable: false,
			cell: (row) => getCurrentStatus(row),
		},
	];

	return (
		<section className={stil.sectionTabla}>
			<SliderBar btnDatos={BtnReserva} />
			<div className={stil.contentTabla}>
				{filteredReservas.length > 0 && (
					<DataTable
						title="Reservas Pendientes por confirmar"
						columns={columns}
						data={filteredReservas}
						customStyles={customStyles}
						pagination
						highlightOnHover
						striped
						dense
						paginationPerPage={10}
						paginationRowsPerPageOptions={[5, 10]}
					/>
				)}
			</div>
		</section>
	);
};
