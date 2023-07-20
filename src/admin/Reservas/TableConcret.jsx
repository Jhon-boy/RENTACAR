import { useEffect, useState } from "react";
import DataTable from 'react-data-table-component';
import { Link } from 'react-router-dom'
import { Button } from "@mui/material";
import { URL } from "/src/admin/data/URL.js";
import { MdEditNote } from 'react-icons/md';
import { MdRestoreFromTrash } from "react-icons/md";
import SliderBar  from "../SliderBar";
import customStyles from '../config/ConfigTable'
import stil from './Table.module.css'

import { BtnReserva } from '../data/BtnAdmin'

//import '../../Home.css';


export const TableConcret = () => {
	const [activeTab, setActiveTab] = useState('all');
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

		if (fechaActual < fechaEntrega) {
			return (
				<button className="status-button" style={{ backgroundColor: 'skyblue', marginTop: '5px' }}>
					PRÓXIMAMENTE
				</button>
			);
		} else if (fechaActual > fechaDevolucion) {
			return (
				<button className="status-button" style={{ backgroundColor: 'red', marginTop: '5px' }}>
					FINALIZÓ
				</button>
			);
		} else {
			return (
				<button className="status-button" style={{ backgroundColor: 'green', marginTop: '5px' }}>
					EN CURSO
				</button>
			);
		}
	};
	const getButtonColor = (estado) => {
		switch (estado) {
			case 'PENDIENTE':
				return 'red';
			case 'EN CURSO':
				return 'blue';
			case 'FINALIZADO':
				return 'green';
			default:
				return 'gray';
		}
	};

	const handleDelete = async (id) => {
		alert(id);
	}
	const filteredReservas = reservas.filter((reserva) => reserva.estado === 'CONCRETADO');
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
						<img className={stil.btnImage} src="https://www.svgrepo.com/show/522316/trash.svg" alt="" />
					</Link>
					<Link
						to={`/Home/Reservas/InfoReserva/${row.id_reserva}`}
						variant="outlined"
						className={stil.btn}>
						<img className={stil.btnImage} src="https://www.svgrepo.com/show/511904/edit-1479.svg" alt="" />
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
			<SliderBar btnDatos={BtnReserva}/>
			<div className={stil.contentTabla}>
				{filteredReservas.length > 0 && (
					<DataTable
						title="Reservas Concretadas"
						columns={columns}
						data={filteredReservas}
						customStyles={customStyles}
						pagination
						highlightOnHover
						striped
						dense
						paginationPerPage={10}
						paginationRowsPerPageOptions={[5,10]}
					/>
				)}
			</div>
		</section>
	);
};
