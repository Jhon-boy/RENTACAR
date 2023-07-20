//import '../../Home.css'
//import '../../styles/Config.css'
import { useEffect, useState } from 'react';
import { URL } from '../data/URL';
import DataTable from 'react-data-table-component';
import customStyles from '../config/ConfigTable';

import stil from './pagos.module.css'

export const Pagos = () => {
	const [pagos, setPagos] = useState([]);
	useEffect(() => {
		fetch(`${URL}/pagos`)
			.then((response) => response.json())
			.then((data) => setPagos(data))
			.catch((error) => console.log(error));
	},[])

	

	const columns = [
		{
			name: 'ID Pago',
			selector: 'id_pago',
			sortable: true,
			width: '150px',
		},
		{
			name: 'Fecha de pago',
			selector: 'fecha_pago',
			sortable: true,
			width: '150px',
		},{
			name: 'Tipo',
			selector:'tipo',
			sortable: true,
			width: '150px',
		},{
			name: 'Monto',
			selector: 'monto',
			sortable: true,
			width: '150px',
		},{
			name: 'Cliente',
			selector: 'id_cliente',
			sortable: true,
			width: '150px',
		},{
			name: 'Auto',
			selector: 'id_auto',
			sortable: true,
			width: '150px',
		},

	]

	const [filterValue,setFilterValue] = useState('')
	const handleFilterChange = (e) =>{
		setFilterValue(e.target.value)
	}

	return (
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
				title= "Pagos realizados"
				columns={columns}
				data={pagos.filter((item) => filterValue ? item.tipo === filterValue : true)}
				customStyles={customStyles}
				pagination
				highlightOnHover
				striped
				dense
				paginationPerPage={10}
				paginationRowsPerPageOptions={[5,10]}
				/>
			</article>
		</section>
	)
}
