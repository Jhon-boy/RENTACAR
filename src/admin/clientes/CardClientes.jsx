import { useEffect, useState } from 'react';
import UserCard from './useCard';
import { URL } from '../data/URL';
import axios from 'axios';
//import '../Home.css';
import Grid from '@mui/material/Grid';

import { BtnClientes } from '../data/BtnAdmin.js'
import SliderBar from '/src/admin/SliderBar.jsx'
import stil from './useCard.module.css'

export const CardClientes = () => {
	const [clientes, setClientes] = useState([]);
	const [licencias, setLicencias] = useState([]);
	// eslint-disable-next-line no-unused-vars
	const [datosCombinados, setDatosCombinados] = useState([]);

	useEffect(() => {
		const fetchClientes = async () => {
			try {
				const response = await axios.get(`${URL}/clientes`);
				setClientes(response.data);
			} catch (error) {
				console.error(error);
			}
		};

		const fetchLicencias = async () => {
			try {
				const response = await axios.get(`${URL}/licencia`);
				setLicencias(response.data);
			} catch (error) {
				console.error(error);
			}
		};

		fetchClientes();
		fetchLicencias();
	}, []);

	useEffect(() => {
		const combinarDatos = () => {
			const datosCombinados = clientes.map(cliente => {
				const licenciaCorrespondiente = licencias.find(licencia => licencia.id_licencia === cliente.id_licencia);
				return {
					...cliente,
					licencia: licenciaCorrespondiente
				};
			});
			setDatosCombinados(datosCombinados);
		};

		combinarDatos();
	}, [clientes, licencias]);

	return (
		<section className={stil.contentCard}>
			<SliderBar btnDatos={BtnClientes} />
			<div className={stil.contentGrid}>
				<Grid container spacing={-20}>
					{datosCombinados.map((cliente) => (
						<Grid item xs={1} sm={2} md={4} key={cliente.id_cliente}>
							<UserCard cliente={cliente} />
						</Grid>
					))}
				</Grid>
			</div>
		</section>
	);
};
