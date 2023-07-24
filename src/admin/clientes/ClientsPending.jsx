import { useState, useEffect } from 'react';
import DataTable from 'react-data-table-component';
import { URL } from '../data/URL';
//import '../Home.css';
import { BsPersonExclamation } from "react-icons/bs";
import { BsPersonFillExclamation } from "react-icons/bs";
//import { SliderBar } from './SliderBar';
import { Link } from 'react-router-dom';

import { BtnClientes } from '../data/BtnAdmin.js'
import SliderBar from '/src/admin/SliderBar.jsx'
import stil from './Clientes.module.css'
import customStyles from '../config/ConfigTable'
import Button from '@mui/material/Button';


export const ClientsPending = () => {
	const [clientes, setClientes] = useState([]);
	const [usuarios, setUsuarios] = useState([]);
	// eslint-disable-next-line no-unused-vars
	const [datosCombinados, setDatosCombinados] = useState([]);

	useEffect(() => {
		fetch(`${URL}/clientes`)
			.then(response => response.json())
			.then(data => setClientes(data))
			.catch(error => console.log(error));

		fetch(`${URL}/user`)
			.then(response => response.json())
			.then(data => setUsuarios(data))
			.catch(error => console.log(error));

	}, []);

	useEffect(() => {
		// Combinar los datos de clientes y usuarios basándose en el campo id_usuario
		const datosCombinados = clientes.map(cliente => {
			const usuarioCorrespondiente = usuarios.find(usuario => usuario.id_usuario === cliente.id_usuario);
			return {
				...cliente,
				...usuarioCorrespondiente
			};
		});
		setDatosCombinados(datosCombinados);
	}, [clientes, usuarios]);
	const filteredReservas = clientes.filter((clientes) => clientes.estado === 'PENDIENTE');
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
			fontSize: '12px', // Tamaño de fuente de 12px
			width: '120px',
			height: '35px',
			color: estado === 'CANCELADO' ? 'red' : estado === 'CONCRETADO' ? 'green' : 'black',
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

	const columns = [
		{
			name: 'Id',
			selector: 'id_cliente',
			sortable: true,
			width: '90px',
		},
		{
			name: 'Nombre',
			selector: 'nombre',
			sortable: true,
			width: '120px',
		},
		{
			name: 'Apellido',
			selector: 'apellido',
			sortable: true,
			width: '120px',
		},
		{
			name: 'Cedula',
			selector: 'cedula',
			sortable: true,
			width: '120px',
		},
		{
			name: 'Estado de la cuenta',
			selector: 'estado',
			sortable: true,
			width: '130px',
			cell: (row) => getEstado(row),
		},
		{
			name: 'Estado',
			cell: (row) => {
				if (row.estado === "CONECTADO") {
					return <BsPersonFillExclamation className='icon activeP' />
				} else {
					return <BsPersonExclamation style={{ color: row.estado === "CONECTADO" ? "#00cc00" : "#cc0000", fontSize: "24px" }} />
				}
			},
			sortable: true,
			width: '130px',
		},
		{
			name: 'Género',
			selector: 'genero',
			sortable: true,
			width: '130px',
		},
		{
			name: 'Ver Perfil',
			cell: (row) => (
				<Link to={`/Home/Clientes/InfoClient/${row.id_cliente}`}>
					<Button variant="outlined" color="secondary" >Ver</Button>
				</Link>
			),
			button: true,
			width: '130px',
		},
	];
	return (
		<div style={{ width: '90%' }}>
			<section className={stil.sectionTabla}>
				<SliderBar btnDatos={BtnClientes} />
				<div className={stil.contentTabla}>
					{filteredReservas.length > 0 ? (
						<DataTable
							columns={columns}
							data={filteredReservas}
							customStyles={customStyles}
							title="Clientes Pendientes "
							pagination
							highlightOnHover
							striped
							dense
							paginationPerPage={10}
							paginationRowsPerPageOptions={[5, 10]}
						/>
					) : (
						<div className={stil.emptyTable}>
							<img src='https://img.freepik.com/vector-premium/datos-carpeta-archivo-vacia-informacion-no-encontrada-oficinista-confundido-busqueda-documentos-lupa-almacenamiento-archivos-papeles-perdidos-encontrar-mal-funcionamiento-concepto-vectorial_533410-3459.jpg' alt="Tabla vacía" />
							<p>No hay datos disponibles</p>
						</div>
					)}
				</div>
			</section>
		</div>

	);
};
