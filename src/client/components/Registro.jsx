/* eslint-disable no-undef */
import { useState } from 'react';
import '../styles/Registro.css';
import {
    verificarNombre,
    verificarApellido,
    verificarGenero,
    verificarCedula,
    verificarContrasena,
    verificarCorreo,
    validarFechasLicencia,
    verificarExtensionFoto
} from '../controllers/rulesRegistro.js';
import Swal from 'sweetalert2';

const Registro = () => {
    const [nombre, setNombre] = useState('');
    const [apellido, setApellido] = useState('');
    const [cedula, setCedula] = useState('');
    const [correo, setCorreo] = useState('');
    const [contrasena, setContrasena] = useState('');
    const [foto, setFoto] = useState('');
    const [fechaEmision, setFechaEmision] = useState('');
    const [fechaCaducidad, setFechaCaducidad] = useState('');
    const [error, setError] = useState('');
    const [genero, setGenero] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        // Validar nombre
        if (!verificarNombre(nombre)) {
            setError('Nombre inválido');
            return;
        }
        // Validar apellido
        if (!verificarApellido(apellido)) {
            setError('Apellido inválido');
            return;
        }
        // Validar cédula
        if (!verificarCedula(cedula)) {
            setError('Cédula inválida');
            return;
        }
        // Validar correo
        if (!verificarCorreo(correo)) {
            setError('Correo inválido');
            return;
        }
        // Validar contraseña
        if (!verificarContrasena(contrasena)) {
            setError('La contraseña debe tener 1 mayuscula,1 caracter especial');
            return;
        }
        // Validar fechas de licencia
        if (!validarFechasLicencia(fechaEmision, fechaCaducidad)) {
            setError('Fechas de licencia inválidas');
            return;
        }
        if (!verificarExtensionFoto(foto)) {
            setError('Formato no permitido');
            return;
        }
        setError('');

        // Capturar los datos y mostrarlos en la consola
        const datos = {
            nombre,
            apellido,
            cedula,
            genero,
            correo,
            contrasena,
            foto,
            fechaEmision,
            fechaCaducidad
        };
        console.log(datos);

    };
    //funcion confirmar
    const Confirmar = () => {
        Swal.fire({
            title: 'Confirmar',
            showDenyButton: true,
            showCancelButton: true,
            confirmButtonText: 'Registar',
            denyButtonText: `Cancelar`,
        }).then((result) => {
            /* Read more about isConfirmed, isDenied below */
            if (result.isConfirmed) {
                Swal.fire({
                    position: 'center',
                    icon: 'success',
                    title: 'Se ha registrado correctamente',
                    showConfirmButton: false,
                    timer: 1500
                })
            } else if (result.isDenied) {
                Swal.fire('Changes are not saved', '', 'info')
            }
        })
    }

    return (
        <div className="container-registro">
            <div className='Formulario'>
                <h1>¡Bienvenido!</h1>
                <p className='info'>Para comenzar, ingrese sus datos: </p>
                <form className='container-formulario' onSubmit={handleSubmit}>
                    <div className="container-personal">
                        <p className='info'>Datos personales: </p>
                        <div className='entrada'>
                            <div className='input-label'>
                                <label className='form-label'>Nombres:</label>
                                <input type="text" value={nombre} onChange={(e) => setNombre(e.target.value)} />
                            </div>
                            <div className="error">
                                {error === 'Nombre inválido' && <div className="alert alert-danger p-1">{error}</div>}
                            </div>
                        </div>
                        <div className='entrada'>
                            <div className='input-label'>
                                <label className='form-label'>Apellidos: </label>
                                <input type="text" value={apellido} onChange={(e) => setApellido(e.target.value)} />
                            </div>
                            <div className="error">
                                {error === 'Apellido inválido' && <div className="alert alert-danger p-1">{error}</div>}
                            </div>
                        </div>
                        <div className='entrada'>
                            <div className='input-label'>
                                <label className='form-label'>Cédula: </label>
                                <input type="text" value={cedula} onChange={(e) => setCedula(e.target.value)} />
                            </div>
                            <div className="error">
                                {error === 'Cédula inválida' && <div className="alert alert-danger p-1">{error}</div>}
                            </div>
                        </div>
                        <div className='entrada'>
                            <div className='input-label'>
                                <label className='form-label'>Correo</label>
                                <input type="email" value={correo} onChange={(e) => setCorreo(e.target.value)}  />
                            </div>
                            <div className="error">
                                {error === 'Correo inválido' && <div className="alert alert-danger p-1">{error}</div>}
                            </div>
                        </div>
                        <div className='entrada'>
                            <div className='input-label'>
                                <label className='form-label'>Contraseña: </label>
                                <input type="password" name="password" value={contrasena} onChange={(e) => setContrasena(e.target.value)} />
                            </div>
                            <div className="error">
                                {error === 'Contraseña inválida' && <div className="alert alert-danger p-1">{error}</div>}
                            </div>
                        </div>
                        <div className='entrada'>
                            <div className='input-label'>
                                <label className="form-label">Género: </label>
                                <select className="genero" id="genero" >
                                    <option value="MASCULINO">Masculino</option>
                                    <option value="FEMENINO">Femenino</option>
                                </select>
                            </div>
                            <div className="error">
                                {error === 'Género inválido' && <div className="alert alert-danger p-1">{error}</div>}
                            </div>
                        </div>
                        <div className='entrada'>
                            <div className='input-label'>
                                <label htmlFor="foto">Foto de cédula: </label>
                                <input type="file" name="foto" value={foto} onChange={(e) => setFoto(e.target.value)} />
                            </div>
                            <div className="error">
                                {error === 'Extensión de foto inválida' && <div className="alert alert-danger p-1">{error}</div>}
                            </div>
                        </div>
                    </div>
                    <div className="licencia">
                        <p className='info'>Datos de licencia: </p>
                        <div className='entrada'>
                            <div className='input-label'>
                                <label htmlFor="foto">Foto licencia: </label>
                                <input type="file" name="foto" value={foto} onChange={(e) => setFoto(e.target.value)} />
                            </div>
                            <div className="error">
                                {error === 'Extensión de foto inválida' && <div className="alert alert-danger p-1">{error}</div>}
                            </div>
                        </div>
                        <div className='entrada'>
                            <div className='input-label'>
                                <label htmlFor="fechaEmision">Fecha de Emisión:</label>
                                <input type="date" name="fechaEmision" value={fechaEmision} onChange={(e) => setFechaEmision(e.target.value)} />
                            </div>
                        </div>
                        <div className='entrada'>
                            <div className='input-label'>
                                <label htmlFor="fechaCaducidad">Fecha de Caducidad:</label>
                                <input type="date" name="fechaCaducidad" value={fechaCaducidad} onChange={(e) => setFechaCaducidad(e.target.value)} />
                            </div>
                            <div className="error">
                                {error === 'Fechas de licencia inválidas' && <div className="alert alert-danger p-1">{error}</div>}
                            </div>
                        </div>
                        <div className='entrada'>
                            <div className='input-label'>
                                <label htmlFor="tipoLicencia">Tipo de licencia: </label>
                                <select id="tipoLicencia" name="tipoLicencia">
                                    <option value="Tipo B">Tipo B</option>
                                    <option value="Tipo C">Tipo C</option>
                                    <option value="Tipo C">Tipo D</option>
                                    <option value="Tipo C">Tipo E</option>
                                    <option value="Tipo C">Tipo C1</option>
                                    <option value="Tipo C">Tipo D1</option>
                                </select>
                            </div>
                        </div>
                    </div>
                    <div className="botones">
                    <button className='btn1 btn-warning mt-1 w-100' onClick={Confirmar} >Registar me</button>
                    <button className='btn2 btn-warning mt-1 w-100' onClick={() => window.history.back()}>Cancelar</button>
                </div>
                </form>
            </div>
        </div>
    );

};

export default Registro;
