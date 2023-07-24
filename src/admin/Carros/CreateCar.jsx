/* eslint-disable no-unused-vars */
import { useState, useEffect } from 'react';
//import '../../Home.css';
//import '../../styles/Autos.css';
import Swal from 'sweetalert2';
import { verificarPlaca, campoEstaVacio, estados, verificarAnio, verificarExtensionFoto, verificarPrecio, verificarTipo } from '../hooks/Autos';
import { Box, Grid, FormControl, InputLabel, MenuItem, Select, TextField } from '@mui/material';

import { registrarAuto } from '../database/controller';
import { useNavigate } from 'react-router-dom'
import stil from './CreateCar.module.css'


export const CreateCar = () => {

	const [placas, setPlacas] = useState('');
	const [marca, setMarca] = useState('');
	const [modelo, setModelo] = useState('');
	const [anio, setAnio] = useState(2024);
	const [precio, setPrecio] = useState(10);
	const [tipo, setTipo] = useState('');
	const [detalles, setDetalles] = useState('');
	const [fotos, setFotos] = useState('');
	const [fotos2, setFotos2] = useState('');
	const [estado, setEstado] = useState('');

	const [esPlacaValida, setEsPlacaValida] = useState(true);
	const [esExtension, setExtension] = useState(true);
	const [esPrecioValida, setPrecioValida] = useState(true);
	const [esAnioValida, setAnioValida] = useState(true);
	const [esMarcaValida, setMarcaValida] = useState(true);
	const [esModeloValida, setModeloValida] = useState(true);
	const [esEstadoValida, setEstadoValida] = useState(true);
	const [esDetallesValida, setDetallesValida] = useState(true);
	const [esTipoValida, setTipoValida] = useState(true);

	//FUNCION DE NAVEGACION 
	const history = useNavigate();
	const navigateTo = (path) => {
		history(path);
	}
	// valores iniciales 

	const crearAuto = async (e) => {
		e.preventDefault();

		if (placas === '' || marca === '' || modelo === '' || tipo === '' || anio === '' || fotos === '' || estado === '' || precio === '' || detalles === '') {
			Swal.fire({
				icon: 'error',
				title: 'Campos vacíos',
				text: 'Por favor, completa todos los campos antes de registrar el auto.',
			});
			return;
		}

		const formData = new FormData()
		formData.append('placas', placas)
		formData.append('marca', marca)
		formData.append('modelo', modelo)
		formData.append('tipo', tipo)
		formData.append('anio', anio)
		formData.append('fotos', fotos)
		formData.append('estado', estado)
		formData.append('precio', precio)
		formData.append('detalles', detalles)

		try {
			// alert('DATOS RECIBIDOS: ')
			await registrarAuto(formData);
			// console.log('DATOS RECIBIDOS'+ car.detalles + ' FOTO:' + car.fotos);
			Swal.fire({
				position: 'center',
				icon: 'success',
				title: 'Registrado Exitosamente',
				showConfirmButton: false,
				timer: 1500
			})
			history('/Home/Autos');
		} catch (error) {
			Swal.fire({
				icon: 'error',
				title: 'Oops...',
				text: 'Something went wrong!' + error.message
			})
		}
	}


	return (
		<section className={stil.contentCreate}>
			<form onSubmit={crearAuto} method="POST" className={stil.form} >
				<div style={{ display: 'flex' }}>
					<div>
						<label htmlFor="images" className="drop-container">
							<span className="drop-title">Arrastra tu imagen</span>
							<input className={stil.in} required type="file" name='fotos' id="images"
								onChange={(e) => {
									const archivo = e.target.files[0];
									setFotos(e.target.files[0]);
									setFotos2(URL.createObjectURL(archivo));
									setExtension(verificarExtensionFoto(archivo.name));
								}} size="lg" />
							{fotos ? (
								<img src={fotos2} alt="Imagen cargada" style={{ width: '350px', height: 'auto' }} />
							) : (
								<img src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQc-hpNaBjRjxd0GLK6Ni8lfEv_-347l7VdJg&usqp=CAU' alt="Imagen por defecto" style={{ width: '350px', height: 'auto' }} />
							)}
						</label>
						{!esExtension && (
							<span className={stil.Error}>* Solo se aceptan fotos tipo: png, jpg, jpeg</span>
						)}
					</div>
					<div>
						<Grid container spacing={2}>
							<Grid item xs={6}>
								<FormControl fullWidth variant="outlined" margin="normal">
									<TextField
										required
										type="text"
										label="Marca"
										value={marca}
										onChange={(e) => {
											setMarca(e.target.value);
											setMarcaValida(e.target.value.trim() !== '');
										}}
										onBlur={() => setMarcaValida(marca.trim() !== '')}
										error={!esMarcaValida}
										helperText={!esMarcaValida && 'Campo Obligatorio'}
									/>
								</FormControl>
							</Grid>

							<Grid item xs={6}>
								<FormControl fullWidth variant="outlined" margin="normal">
									<TextField
										required
										type="text"
										label="Modelo"
										value={modelo}
										onChange={(e) => {
											setModelo(e.target.value);
											setModeloValida(e.target.value.trim() !== '');
										}}
										onBlur={() => setModeloValida(modelo.trim() !== '')}
										error={!esModeloValida}
										helperText={!esModeloValida && 'Campo Obligatorio'}
									/>
								</FormControl>
							</Grid>
						</Grid>
						<Grid container spacing={2}>
							<Grid item xs={6}>
								<FormControl fullWidth variant="outlined" margin="normal">
									<InputLabel>Tipo</InputLabel>
									<Select
										className={stil.in}
										required
										placeholder="Ingrese el Tipo"
										value={tipo}
										onChange={(e) => {
											const tipoAux = e.target.value;
											setTipo(e.target.value);
											setTipoValida(verificarTipo(tipoAux));
										}}
										defaultValue="CAMIONETA"
										error={!esTipoValida}
										label="Tipo"
									>
										<MenuItem value=""></MenuItem>
										<MenuItem value="CAMIONETA">CAMIONETA</MenuItem>
										<MenuItem value="CAMIÓN LIGERO">CAMIÓN LIGERO</MenuItem>
										<MenuItem value="SEDAN">SEDAN</MenuItem>
										<MenuItem value="COUPE">COUPE</MenuItem>
										<MenuItem value="CONVERTIBLE">CONVERTIBLE</MenuItem>
										<MenuItem value="HATCHBACK">HATCHBACK</MenuItem>
										<MenuItem value="STATION WAGON">STATION WAGON</MenuItem>
										<MenuItem value="MINIVAN">MINIVAN</MenuItem>
										<MenuItem value="UTILITARIO">UTILITARIO</MenuItem>
										<MenuItem value="LIMOSINA">LIMOSINA</MenuItem>
										<MenuItem value="FURGONETA DE PASAJEROS">FURGONETA DE PASAJEROS</MenuItem>
										<MenuItem value="MICROBUS">MICROBUS</MenuItem>
										<MenuItem value="MINIBUS">MINIBUS</MenuItem>
										<MenuItem value="CAMIÓN MEDIANO">CAMIÓN MEDIANO</MenuItem>
										<MenuItem value="CAMIÓN PESADO">CAMIÓN PESADO</MenuItem>
									</Select>
									{!esTipoValida && <span className={stil.Error}>* Campo Obligatorio. Seleccione una</span>}
								</FormControl>
							</Grid>

							<Grid item xs={6}>
								<FormControl fullWidth variant="outlined" margin="normal">
									<InputLabel>Estado</InputLabel>
									<Select
										className={stil.in}
										required
										placeholder="Ingrese el Estado"
										value={estado}
										onChange={(e) => {
											const estadoAux = e.target.value;
											setEstado(e.target.value);
											setEstadoValida(estados(estadoAux));
										}}
										defaultValue="INFUERA DE SERVICIO ACTIVO"
										error={!esEstadoValida}
										label="Estado"
									>
										<MenuItem value=""></MenuItem>
										<MenuItem value="DISPONIBLE">Disponible</MenuItem>
										<MenuItem value="OCUPADO">Ocupado</MenuItem>
										<MenuItem value="FUERA DE SERVICIO">Fuera de servicio</MenuItem>
										<MenuItem value="MANTENIMIENTO">Mantenimiento</MenuItem>
										{/* Resto de opciones */}
									</Select>
									{!esEstadoValida && <span className={stil.Error}>* Campo Obligatorio. Seleccione una</span>}
								</FormControl>
							</Grid>
						</Grid>
						<Grid container spacing={2}>
							<Grid item xs={12} sm={6}>
								<FormControl fullWidth variant="outlined" margin="normal">
									<TextField
										className={stil.in}
										required
										type="text"
										label="Placas"
										value={placas}
										onChange={(e) => {
											const nuevaPlaca = e.target.value;
											setPlacas(e.target.value);
											setEsPlacaValida(verificarPlaca(nuevaPlaca));
										}}
										onBlur={() => setEsPlacaValida(modelo.trim() !== '')}
										error={!esPlacaValida}
										helperText={!esPlacaValida && 'Campo Obligatorio'}
									/>
								</FormControl>
							</Grid>

							<Grid item xs={4} sm={3} style={{ marginTop: '15px' }}>
								<TextField
									className={stil.in}
									required
									type="number"
									label="Año"
									value={anio}
									onChange={(e) => {
										const anioAux = e.target.value;
										setAnio(e.target.value);
										setAnioValida(verificarAnio(anioAux));
									}}
									error={!esAnioValida}
									helperText={!esAnioValida && 'Campo Obligatorio. Año inválido'}
								/>
							</Grid>

							<Grid item xs={6} sm={3} style={{ marginTop: '15px' }}>
								<TextField
									className={stil.in}
									required
									type="number"
									label="Precio"
									value={precio}
									onChange={(e) => {
										const precioAux = e.target.value;
										setPrecio(e.target.value);
										setPrecioValida(verificarPrecio(precioAux));
									}}
									error={!esPrecioValida}
									helperText={!esPrecioValida && 'Campo Obligatorio. Precio inválido'}
								/>
							</Grid>
						</Grid>
						<Grid item xs={12}>
							<FormControl fullWidth variant="outlined" margin="normal">
								<TextField
									required
									multiline
									label="Detalles del Auto"
									value={detalles}
									onChange={(e) => {
										setDetalles(e.target.value);
										setDetallesValida(e.target.value.trim() !== '');
									}}
									onBlur={() => setDetallesValida(detalles.trim() !== '')}
									rows={3}
									error={!esDetallesValida}
									helperText={!esDetallesValida && 'Campo Obligatorio'}
								/>
							</FormControl>
						</Grid>
						<button className={stil.formBtn} onClick={crearAuto}>Registrar Auto</button>
					</div>

				</div>

			</form>
		</section>
	)
}
