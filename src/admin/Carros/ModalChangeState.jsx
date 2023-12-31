/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { useState, useEffect } from 'react'
import { Button, Select, MenuItem } from '@mui/material';
import Swal from 'sweetalert2';
import { CambioStadoAuto } from '../database/controller';
import { useNavigate } from 'react-router-dom';
import stil from './TableAutos.module.css'


export const ModalChangeState = ({ idAuto, estado }) => {
	const [selectedEstado, setSelectedEstado] = useState('');
	const [id, setId] = useState(idAuto);

	//FUNCION PA IR A OTRA PAGINA XD
	const history = useNavigate();

	const navigateTo = (path) => {
		history(path);
	}


	useEffect(() => {
		setId(idAuto);
	}, [idAuto]);

	const changeState = async (id, estado_) => {
		if (!id || !estado_) {
			Swal.fire({
				icon: 'error',
				text: 'Por favor, completa todos los campos.',
			});
			return;
		}
		try {
			await CambioStadoAuto(id, estado_);

			history(`/Home/Autos`);

			Swal.fire({
				position: 'top-end',
				icon: 'success',
				title: 'Se han realizado los Cambios',
				showConfirmButton: false,
				timer: 1500
			})

		} catch (error) {
			Swal.fire({
				icon: 'error',
				title: 'Valores Incorrectos',
				text: 'Por favor, completacon informacion veridica',
			});
		}
	};

	const modalStyle = {
		position: 'absolute',
		backgroundColor: 'rgba(255, 255, 255, 0.9)',
		border: '2px solid black',
		borderRadius: '5px',
		padding: '16px',
		display: 'flex',
		flexDirection: 'column',
		gap: '8px',
		minWidth: 'max-content',
	};

	return (

		<div style={{ width: '270px' }}>
			<div style={{ width: '250px' }}>
				<h2>Seleccionar estado</h2>
  
					<section className={stil.contentChange}>
						<article className="">
							<h2 className={stil.title}>Seleccionar estado</h2>
							<select className={stil.select} value={selectedEstado} onChange={(event) => setSelectedEstado(event.target.value)}>

								{estado}
								<option value="Disponible">DISPONIBLE</option>
								<option value="Mantenimiento">MANTENIMIENTO</option>
								<option value="Fuera de servicio">FUERA DE SERVICIO</option>
							</select>
							<button className={stil.formBtn} onClick={() => changeState(id, selectedEstado)}>
								Guardar
							</button>
						</article>
					</section>	
			</div>
		</div>
	);
};

