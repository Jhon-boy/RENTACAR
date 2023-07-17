//import '../../Home.css'
//import '../../styles/Config.css'
import { useState, useEffect } from 'react'
import { URL } from '../../data/URL';
import Swal from 'sweetalert2';
import { EditConfig } from '../../database/ControllerConfig';


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
        <div className='page-content'>
            <div className='home-container'>
                <div className='ConfihContainer'>
                    <div className='Config'>
                        <h3>Configuracion de alquiler de Automoviles</h3>
                        <form className="formulario" onSubmit={handleSubmit} method="POST">
                            <div className="form-group">
                                <label htmlFor="iva">IVA por cada alquiler:</label>
                                <input
                                    type="number"
                                    id="iva"
                                    value={iva}
                                    onChange={handleIVAChange}
                                />
                            </div>
                            <div>
                                <h6 className="error">{errorIVA}</h6>
                            </div>

                            <div className="form-group">
                                <label htmlFor="numero-dias">Número de Días minimo de alquiler:</label>
                                <input
                                    type="number"
                                    id="numero-dias"
                                    value={diasMinimo}
                                    onChange={handleNumeroDiasChange}
                                />
                                <div>
                                    <h6 className="error">{errorNumeroDias}</h6>
                                </div>
                            </div>

                            <div className="form-group">
                                <label htmlFor="numero-dias">Número de Días maximo de alquiler:</label>
                                <input
                                    type="number"
                                    id="numero-dias"
                                    value={numDias}
                                    onChange={handleNumeroDiasMaximoChange}
                                />
                                <div>
                                    {/* <h6 className="error">{errorNumeroDias}</h6> */}
                                </div>
                            </div>

                            <div className="form-group">
                                <label htmlFor="precioMinimo">Precio mínimo de alquiler:</label>
                                <input
                                    type="number"
                                    id="precio-minimo"
                                    value={precioMinimo}
                                    onChange={handlePrecioMinimoChange}
                                />
                                <div>
                                    <h6 className="error">{errorPrecioMinimo}</h6>
                                </div>
                            </div>

                            <div className="form-group">
                                <label htmlFor="precioMinimo">Precio maximo de alquiler:</label>
                                <input
                                    type="number"
                                    id="precio-minimo"
                                    value={precioMaximo}
                                    onChange={handlePrecioMaximoChange}
                                />
                                <div>
                                    <h6 className="error">{errorPrecioMaximo}</h6>
                                </div>
                            </div>
                            <div className='btnSlider'>
                                <button type="button" onClick={handleEditModeToggle}>
                                    {editMode ? 'CANCELAR' : 'EDITAR'}
                                </button>
                                {editMode && <button type="submit">GUARDAR</button>}
                            </div>

                        </form>
                    </div>
                    <div className='Config'>
                        <h3>Guardar configuracion PARA todos los AUTOS</h3>
                        <form onSubmit={handleSubmit2} className="car-form">
                            <img src='https://d1csarkz8obe9u.cloudfront.net/posterpreviews/car-rent-design-template-64ff332fd3dda524f0892559080bb95a_screen.jpg?ts=1620865657' alt='PORTADA' />
                            <div className="form-group">
                                <label htmlFor="estado" className="label">Estado de los autos:</label>
                                <select id="estado" value={estado} onChange={handleEstadoChange} className="select">
                                    <option value="">Seleccionar estado</option>
                                    <option value="FUERA DE SERVICIO">FUERA DE SERVICIO</option>
                                    <option value="MANTENIMIENTO">MANTENIMIENTO</option>
                                    <option value="DISPONIBLE">DISPONIBLE</option>
                                    <option value="OCUPADO">OCUPADO</option>
                                </select>
                            </div>
                            <p id="advertencia">Advertencia: Se aplicarán todos los cambios a los autos registrados</p>
                            <label htmlFor="checkbox" className="label">
                                <input
                                    type="checkbox"
                                    id="checkbox"
                                    checked={isChecked}
                                    onChange={handleCheckboxChange}
                                    className="checkbox"
                                />
                                Acepto los cambios
                            </label>

                            <button type="submit" className={`submit-button ${!isChecked ? 'disabled' : ''}`} disabled={!isChecked}>
                                Guardar
                            </button>
                        </form>
                    </div>
                </div>

            </div >
        </div >
    )
}
