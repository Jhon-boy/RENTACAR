//import '../../Home.css'
//import '../../styles/Config.css'
import { useEffect, useState } from 'react';
import { URL } from '../data/URL';
import DataTable from 'react-data-table-component';
import customStyles from '../config/ConfigTable';
import Swal from 'sweetalert2';
import stil from './pagos.module.css'
import { OverviewTraffic } from '../Datos/overview-traffic';
import { Link } from 'react-router-dom';
import { cancelarPago } from '../database/Pagos.Controller';


export const Pagos = () => {
	const chartSeries = [12, 8, 3, 1];
	const labels = ['Paypal', 'Fisico', 'Transferencia', 'Otros'];
	const [mensajes, setMensajes] = useState('')
	const [pago, setPago] = useState('')
	const [cliente, setCliente] = useState('')

	const [pagos, setPagos] = useState([]);
	const [clientes, setClientes] = useState([]);
	useEffect(() => {
		fetch(`${URL}/pagos`)
			.then((response) => response.json())
			.then((data) => setPagos(data))
			.catch((error) => console.log(error));
	}, [])
	useEffect(() => {
		fetch(`${URL}/clientes`)
			.then((response) => response.json())
			.then((data) => setClientes(data))
			.catch((error) => console.log(error));
	}, []);

	const getNombreCliente = (idCliente) => {
		const cliente = clientes.find((cliente) => cliente.id_cliente === idCliente);
		return cliente ? `${cliente.nombre} ${cliente.apellido}` : '';
	};

	const handleDelete = async (id_pago, id_cliente) => {
		setPago(id_pago)
		setCliente(id_cliente)
		Swal.fire({
			title: '¿Por qué quieres cancelar el Pago?',
			text: `El mensaje será enviado al cliente!`,
			input: 'text',
			inputAttributes: {
				autocapitalize: 'off'
			},
			showCancelButton: true,
			confirmButtonText: 'Enviar',
			showLoaderOnConfirm: true,
			preConfirm: (mensaje) => {
				setMensajes(mensaje); // Almacenar el mensaje ingresado en el estado
				return cancelarPago(pago, cliente, mensajes); //
			},
			allowOutsideClick: () => !Swal.isLoading()
		}).then((result) => {
			if (result.isConfirmed) {
				Swal.fire({
					title: 'Pago Cancelado',
				})
				setPago('')
				setMensajes('')
				setCliente('')
			}
		});
	}
	const columns = [
		{
			name: 'ID',
			selector: 'id_pago',
			sortable: true,
			width: '90px',
		},
		{
			name: 'Fecha de pago',
			selector: 'fecha_pago',
			sortable: true,
			width: '150px',
		}, {
			name: 'Tipo',
			selector: 'tipo',
			sortable: true,
			width: '90px',
		}, {
			name: 'Monto',
			selector: 'monto',
			sortable: true,
			width: '90px',
		}, {
			name: 'Cliente',
			selector: 'id_cliente',
			sortable: true,
			width: '180px',
			cell: (row) => getNombreCliente(row.id_cliente),
		}, {
			name: 'Auto',
			selector: 'id_auto',
			sortable: true,
			width: '80px',
		},
		{
			name: 'Cancelar',
			selector: '',
			sortable: false,
			cell: (row) => (
				<Link
					onClick={() => {
						handleDelete(row.id_pago, row.id_cliente)
					}
					}>
					<img className={stil.btnImage} src="https://cdn-icons-png.flaticon.com/512/4734/4734087.png" width={25} alt="" />
				</Link>

			),
			button: true,
			width: '90px'
		},

	]

	const [filterValue, setFilterValue] = useState('')
	const handleFilterChange = (e) => {
		setFilterValue(e.target.value)
	}

	return (
		<div style={{ display: 'flex' }}>
			<section className={stil.contentPagos}>
				<article className={stil.pagosFiltro}>
					<span className={stil.filtro}>Filtro de pagos</span>
					<select value={filterValue} onChange={handleFilterChange}>
						<option value="">All</option>
						<option value="FISICO">Pagos Físicos</option>
						<option value="TRANSFERENCIA">Pagos por Transferencia</option>
						<option value="PAYPAL">Pagos hechos con Paypal</option>
						<option value="OTRO">Otros</option>
					</select>
				</article>
				<article className={stil.contentTabla}>
					<DataTable
						title="Pagos realizados"
						columns={columns}
						data={pagos.filter((item) => filterValue ? item.tipo === filterValue : true)}
						customStyles={customStyles}
						pagination
						highlightOnHover
						striped
						dense
						paginationPerPage={10}
						paginationRowsPerPageOptions={[5, 10]}
					/>
				</article>
			</section>
			<div style={{ marginTop: '65px' }}>
				<OverviewTraffic chartSeries={chartSeries} labels={labels} sx={{ color: 'black' }} />
			</div>

		</div>

	)
}
