
import { useState } from 'react';
import '../client/styles/Registro.css';
import {
    verificarNombre,
    verificarApellido,
    verificarCedula,
    verificarContrasena,
    verificarCorreo,
    verificarExtensionFoto
} from '../client/controllers/rulesRegistro.js';
import Swal from 'sweetalert2';
import CardMedia from '@mui/material/CardMedia';
import { RegistroCliente, RegistroLicencia, RegistroUsuario } from './Controller/Registro';
import {useNavigate } from 'react-router-dom'


const Registro = () => {
    const [nombre, setNombre] = useState('');
    const [apellido, setApellido] = useState('');
    const [cedula, setCedula] = useState('');
    const [correo, setCorreo] = useState('');
    const [contrasena, setContrasena] = useState('');
    const [foto, setFoto] = useState('');
    const [estadoCliente, setEstadoCliente] = useState('');
    const [fotolicencia, setFotolicencia] = useState('');
    const [fechaCaducidad, setFechaCaducidad] = useState('');
    const [error, setError] = useState('');
    const [genero, setGenero] = useState('');
    const [categoria, setCategoria] = useState('');

    // VALIDACIONES PARA EL CLIENTE
    const [cedulaValido, setCedulaValido] = useState(true);
    const [nombreValido, setNombreValido] = useState(true);
    const [apellidoValido, setApellidoValido] = useState(true);

    // VALIDACIONES DE USUARIO
    const [correoValido, setcorreoValido] = useState(true);
    const [contrasenaValida, setcontrasenaValida] = useState(true);


    // REGISTRO 
    
    const history = useNavigate();

    // eslint-disable-next-line no-unused-vars
    const navigateTo = (path) => {
        history(path);
    }

    // eslint-disable-next-line no-unused-vars
    const [user, setuser] = useState({ correo: '', contrasena: '', estado: '', id_rol: '' });

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
            fechaCaducidad
        };
        console.log(datos);

    };

    //funcion confirmar
    const Confirmar = () => {
        setEstadoCliente('PENDIENTE');
        // Verificar campos vacíos
        //CREDENCIALES
        user.correo = correo;
        user.contrasena = contrasena;
        user.estado = 'DESCONECTADO';
        user.id_rol = 2;

        // CLIENTE
        const formData = new FormData();
        formData.append('nombre', nombre);
        formData.append('apellido', apellido);
        formData.append('cedula', cedula);
        formData.append('genero', genero);
        formData.append('estado', estadoCliente);
        formData.append('id_licencia', cedula);
        if (foto instanceof File) {
            formData.append('foto', foto);
        }

        // LICENCIA 
        const licenciaEstado = true;

        const formData2 = new FormData();
        formData2.append('id_licencia', cedula);
        formData2.append('fecha_caducidad', fechaCaducidad);
        formData2.append('categoria', categoria);
        formData2.append('estado', licenciaEstado);
        if (fotolicencia instanceof File) {
            formData2.append('fotolicencia', fotolicencia);
        }

        Swal.fire({
            title: 'Confirmar', 
            showDenyButton: true,
            showCancelButton: true,
            confirmButtonText: 'Registar',
            denyButtonText: `Cancelar`,
        }).then(async (result) => {
            /* Read more about isConfirmed, isDenied below */
            if (result.isConfirmed) {
                try {
                    const idUser = await RegistroUsuario(user);
                    formData.append('id_usuario', idUser);

                    await RegistroLicencia(formData2);
                    await RegistroCliente(formData);
                    history('/login');
                    Swal.fire({
                        position: 'center',
                        icon: 'success',
                        title: 'Se ha registrado correctamente',
                        showConfirmButton: false,
                        timer: 1500
                    })
                } catch (error) {
                    Swal.fire({
                        icon: 'error',
                        title: 'Oops...',
                        text: 'Something went wrong!' + error.message
                    })
                }

            } else if (result.isDenied) {
                Swal.fire('Changes are not saved', '', 'info')
            }
        })
    }

    function mostrarFoto(e) {
        const foto = e.target.files[0];
        if (foto) {
            const reader = new FileReader();
            reader.onload = function (e) {
                const imagen = document.getElementById("imagenFotocedula");
                imagen.src = e.target.result;
                imagen.style.display = "block";
            };
            reader.readAsDataURL(foto);
        }
    }
    function mostrarFotoLicencia(e) {
        const foto = e.target.files[0];
        if (foto) {
            const reader = new FileReader();
            reader.onload = function (e) {
                const imagen = document.getElementById("imagenFotolicencia");
                imagen.src = e.target.result;
                imagen.style.display = "block";
            };
            reader.readAsDataURL(foto);
        }
    }



    return (
        <div className="container-registro">
            <div className='Formulario'>
                <h1>¡Bienvenido!</h1>
                <p className='info'>Para comenzar, ingrese sus datos: </p>
                <form className='container-formulario' encType='multipart/form-data' onSubmit={handleSubmit}>
                    <div className="container-personal">
                        <p className='info'>Datos personales: </p>
                        <div className='entrada'>
                            <div className='input-label'>
                                <label className='form-label'>Nombres:</label>
                                <input type="text" value={nombre} onChange={(e) => {
                                    const nombreAux = e.target.value;
                                    setNombre(e.target.value)
                                    setNombreValido(verificarNombre(nombreAux))
                                }
                                } />
                            </div>
                            <div className="error">
                                {!nombreValido && (
                                    <div>
                                        <h6 className="ErroresInput3">*El nombre debe tener al menos 3 letras sin simbolos</h6>
                                    </div>
                                )}
                            </div>
                        </div>
                        <div className='entrada'>
                            <div className='input-label'>
                                <label className='form-label'>Apellidos: </label>
                                <input type="text" value={apellido}
                                    onChange={(e) => {
                                        const apellidoAux = e.target.value;
                                        setApellido(e.target.value)
                                        setApellidoValido(verificarNombre(apellidoAux))
                                    }} />
                            </div>
                            <div className="error">
                                {!apellidoValido && (
                                    <div>
                                        <h6 className="ErroresInput3">*El apellido deben tener al menos 3 letras sin simbolos</h6>
                                    </div>
                                )}
                            </div>
                        </div>
                        <div className='entrada'>
                            <div className='input-label'>
                                <label className='form-label'>Cédula: </label>
                                <input type="text" value={cedula}
                                    onChange={(e) => {
                                        const cedulaAux = e.target.value;
                                        setCedula(e.target.value)
                                        setCedulaValido(verificarCedula(cedulaAux));
                                    }} />
                            </div>
                            <div className="error">
                                {!cedulaValido && (
                                    <div>
                                        <h6 className="ErroresInput3">*Cedula incorrecta. Debe contener 10 diguitos</h6>
                                    </div>
                                )}
                            </div>
                        </div>
                        <div className='entrada'>
                            <div className='input-label'>
                                <label className='form-label'>Correo</label>
                                <input type="email" value={correo}
                                    onChange={(e) => {
                                        const correoAux = e.target.value;
                                        setCorreo(e.target.value);
                                        setcorreoValido(verificarCorreo(correoAux))
                                    }}
                                />
                            </div>
                            <div className="error">
                                {!correoValido && (
                                    <div>
                                        <h6 className="ErroresInput3">*Formato invalido</h6>
                                    </div>
                                )}
                            </div>
                        </div>
                        <div className='entrada'>
                            <div className='input-label'>
                                <label className='form-label'>Contraseña: </label>
                                <input type="password" name="password"
                                    value={contrasena}
                                    onChange={(e) => {
                                        const contraAux = e.target.value;
                                        setContrasena(e.target.value)
                                        setcontrasenaValida(verificarContrasena(contraAux))
                                    }} />
                            </div>
                            <div className="error">
                                {!contrasenaValida && (
                                    <div>
                                        <h6 className="ErroresInput3">*Formato invalido [Password_2231]</h6>
                                    </div>
                                )}
                            </div>
                        </div>
                        <div className='entrada'>
                            <div className='input-label'>
                                <label className="form-label">Género: </label>
                                <select className="genero" id="genero"
                                    value={genero}
                                    onChange={(e) => setGenero(e.target.value)}
                                    >

                                    <option value="MASCULINO">Masculino</option>
                                    <option value="FEMENINO">Femenino</option>
                                    <option value="OTRO">Otro</option>
                                </select>
                            </div>
                            <div className="error">
                                {error === 'Género inválido' && <div className="alert alert-danger p-1">{error}</div>}
                            </div>
                        </div>
                        <div className='entrada'>
                            <div className='input-label'>
                                <label htmlFor="foto">Foto de cédula: </label>
                                <div>
                                    <input
                                        type="file"
                                        name="foto"
                                        accept="image/*"
                                        onChange={(e) => {
                                            setFotolicencia(e.target.files[0]);
                                            mostrarFoto(e);
                                        }}
                                    />
                                    <CardMedia
                                        component="img"
                                        height="140"
                                        id="imagenFotocedula"
                                        alt=""
                                    />
                                    {/* <img id="imagenFotolicencia" src="#" alt="Foto de la licencia" style={{ display: 'none' }} /> */}
                                </div>
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
                                <select id="tipoLicencia" name="tipoLicencia"
                                    value={categoria}
                                    onChange={(e) => setCategoria(e.target.value)}
                                >
                                    <option value="B">Tipo B</option>
                                    <option value="C">Tipo C</option>
                                    <option value="C1">Tipo C1</option>
                                    <option value="D">Tipo D</option>
                                    <option value="D1">Tipo D1</option>
                                    <option value="E">Tipo E</option>
                                </select>
                            </div>
                        </div>
                        <div className='entrada'>
                            <div className='input-label'>
                                <label htmlFor="foto">Foto licencia: </label>
                                <div>
                                    <input type="file"
                                        name="foto"
                                        accept="image/*"
                                        onChange={(e) => {
                                            setFoto(e.target.files[0]);
                                            mostrarFotoLicencia(e);
                                        }} />
                                    <CardMedia
                                        component="img"
                                        height="140"
                                        id="imagenFotolicencia"
                                        alt=""
                                    />
                                </div>

                            </div>
                            <div className="error">
                                {error === 'Extensión de foto inválida' && <div className="alert alert-danger p-1">{error}</div>}
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
