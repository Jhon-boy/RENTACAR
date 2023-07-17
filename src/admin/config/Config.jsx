//import '../../Home.css'
//import '../../styles/Config.css'
import { useState, useEffect } from 'react'
import { URL } from '/src/admin/data/URL.js';
import Swal from 'sweetalert2';
import { EditConfig } from '/src/admin/database/ControllerConfig';
import stil from './Config.module.css'

const imgAnuncio = 'https://d1csarkz8obe9u.cloudfront.net/posterpreviews/car-rent-design-template-64ff332fd3dda524f0892559080bb95a_screen.jpg?ts=1620865657'

export const Config = () => {

	const [config, setConfig] = useState([]);
	const [isChecked, setIsChecked] = useState(false);
	const [data, setData] = useState({ iva: '', precioMinimo: '', precioMaximo: '', diasMinimo: '', diasMaximo: '' });

	const [iva, setIVA] = useState('');
	const [errorIVA, setErrorIVA] = useState('');
	const [editMode, setEditMode] = useState(false);

	const [numDias, setNumeroDias] = useState('');
	const [errorNumeroDias, setErrorNumeroDias] = useState('');
	const [diasMinimo, setDiasMinimo] = useState('');

	const [precioMinimo, setPrecioMinimo] = useState('');
	const [precioMaximo, setPrecioMaximo] = useState();
	const [errorPrecioMinimo, setErrorPrecioMinimo] = useState('');
	const [errorPrecioMaximo, setErrorPrecioMaximo] = useState('');

	const [estado, setEstado] = useState('');

	const handleEstadoChange = (e) => {
		setEstado(e.target.value);
	};

	const handleSubmit2 = (e) => {
		e.preventDefault();
		// Aquí puedes hacer algo con el estado y la imagen seleccionados, como enviarlos a una API o almacenarlos en el estado global de tu aplicación
	};


	const handleEditModeToggle = () => {
		setEditMode(!editMode);
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		const diasMaximo = numDias;
		data.iva = iva / 100;
		data.precioMinimo = precioMinimo;
		data.precioMaximo = precioMaximo;
		data.diasMinimo = diasMinimo;
		data.diasMaximo = diasMaximo;

		Swal.fire({
			title: 'Esta seguro de actualizar los datos?',
			text: "Puedes modificar los datos despues!",
			icon: 'warning',
			showCancelButton: true,
			confirmButtonColor: '#3085d6',
			cancelButtonColor: '#d33',
			confirmButtonText: 'Si, Hagalo :v'
		}).then(async (result) => {
			if (result.isConfirmed) {
				try {
					await EditConfig(data);
					Swal.fire(
						'Datos actualizados',
						'Puedes revisar las configuraciones',
						'success'
					);
				} catch (error) {
					console.error(error);
					Swal.fire(
						'Error',
						'Ocurrió un error al actualizar los datos',
						'error'
					);
				}
			}
		});

		setData('');
	};


	const handleIVAChange = (e) => {
		const value = parseInt(e.target.value);

		if (value < 1 || value > 100) {
			setErrorIVA('El valor del IVA debe estar entre 0 y 100');
		} else {
			setErrorIVA('');
			setIVA(value);
		}
	};

	const handleNumeroDiasChange = (e) => {
		const value = parseInt(e.target.value);

		if (value < 1 || value > numDias) {
			setErrorNumeroDias('El número de días debe ser un valor positivo');
		} else {
			setErrorNumeroDias('');
			setDiasMinimo(value);
		}
	};
	const handleNumeroDiasMaximoChange = (e) => {
		const value = parseInt(e.target.value);

		if (value <= diasMinimo || value > 365) {
			// setErrorNumeroDias('El número de días debe ser un valor positivo');

		} else {
			// setErrorNumeroDias('');
			setNumeroDias(value);
		}
	};

	const handlePrecioMinimoChange = (e) => {
		const value = parseInt(e.target.value);

		if (value <= 0 || value > precioMaximo) {
			setErrorPrecioMinimo('El precio mínimo  deber ser positivo y valido y menor al precio maximo');
		} else {
			setErrorPrecioMinimo('');
			setPrecioMinimo(value);
		}
	};

	const handlePrecioMaximoChange = (e) => {
		const value = parseInt(e.target.value);

		if (value < precioMinimo || value > 500000) {
			setErrorPrecioMaximo('Debe ser mayor al precio minimo y menor a 50000');
		} else {
			setErrorPrecioMaximo('');
			setPrecioMaximo(value);
		}
	};


	const handleCheckboxChange = () => {
		setIsChecked(!isChecked);
	};


	useEffect(() => {
		fetch(`${URL}/config`)
			.then(response => response.json())
			.then(data => setConfig(data))
			.catch(error => console.log(error));
	}, [])

	useEffect(() => {
		const ivaAux = config.iva * 100;
		setIVA(ivaAux);
		setDiasMinimo(config.diasMinimo);
		setNumeroDias(config.diasMaximo);
		setPrecioMinimo(config.precioMinimo);
		setPrecioMaximo(config.precioMaximo);
	}, [config.iva])


	return (
		<section className={stil.contentConfig}>
			<article className={stil.contentForm}>
				<form className={stil.form} onSubmit={handleSubmit} method="POST">
					<h3 className={stil.formTitle}>Configuracion de alquiler de Automoviles</h3>
					<label htmlFor="iva" className={stil.formLabel}>
						IVA por cada alquiler:
						<input type="number" id="iva" value={iva} onChange={handleIVAChange} className={stil.in} />
						<h6 className={stil.inError}>{errorIVA}</h6>
					</label>
					<label htmlFor="numero-dias" className={stil.formLabel}>
						Número de Días minimo de alquiler:
						<input type="number" id="numero-dias" value={diasMinimo} onChange={handleNumeroDiasChange} className={stil.in} />
						<h6 className={stil.inError}>{errorNumeroDias}</h6>
					</label>
					<label htmlFor="numero-dias" className={stil.formLabel}>
						Número de Días maximo de alquiler:
						<input type="number" id="numero-dias" value={numDias} onChange={handleNumeroDiasMaximoChange} className={stil.in} />
						{/* <h6 className="error">{errorNumeroDias}</h6> */}
					</label>
					<label htmlFor="precioMinimo" className={stil.formLabel}>
						Precio mínimo de alquiler:
						<input type="number" id="precio-minimo" value={precioMinimo} onChange={handlePrecioMinimoChange} className={stil.in} />
						<h6 className={stil.inError}>{errorPrecioMinimo}</h6>
					</label>
					<label htmlFor="precioMinimo" className={stil.formLabel}>
						Precio maximo de alquiler:
						<input type="number" id="precio-minimo" value={precioMaximo} onChange={handlePrecioMaximoChange} className={stil.in} />
						<h6 className={stil.inError}>{errorPrecioMaximo}</h6>
					</label>
					<div className={stil.formContentBtn}>
						<button type="button" onClick={handleEditModeToggle} className={stil.formBtn}>
							{editMode ? 'CANCELAR' : 'EDITAR'}
							{editMode && <button type="submit" className={stil.formBtn}>GUARDAR</button>}
						</button>
					</div>
				</form>
				<form onSubmit={handleSubmit2} className={stil.form}>
					<h3 className={stil.formTitle}>Guardar configuracion PARA todos los AUTOS</h3>
					<label htmlFor="estado" className={stil.formLabel}>
						Estado de los autos:
						<select id="estado" value={estado} onChange={handleEstadoChange} className={stil.in}>
							<option value="">Seleccionar estado</option>
							<option value="FUERA DE SERVICIO">FUERA DE SERVICIO</option>
							<option value="MANTENIMIENTO">MANTENIMIENTO</option>
							<option value="DISPONIBLE">DISPONIBLE</option>
							<option value="OCUPADO">OCUPADO</option>
						</select>
					</label>
					<span id="advertencia" className={stil.danger}>
						Advertencia:
						<span className={stil.black}>Se aplicarán todos los cambios a los autos registrados</span>
					</span>
					<label htmlFor="checkbox" className={stil.formLabel}>
						<input type="checkbox" id="checkbox" checked={isChecked} onChange={handleCheckboxChange} className="" />
						<span className={stil.black}>Acepto los cambios</span>
					</label>
					<div className={stil.formContentBtn}>
						<button type="submit" className={`${stil.formBtn} ${!isChecked ? 'disabled' : ''}`} disabled={!isChecked}>
							Guardar
						</button>
					</div>
				</form>
			</article >
			<article className={stil.contentAnuncio}>
				<img src={imgAnuncio} alt='PORTADA' className={stil.imgAnuncio} />
			</article>
		</section >
	)
}
