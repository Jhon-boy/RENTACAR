import { useState } from 'react';
import '../client/styles/Registro.css';
import {
    verificarNombre,
    verificarCedula,
    verificarContrasena,
    verificarCorreo,
} from '../client/controllers/rulesRegistro.js';
import Swal from 'sweetalert2';
import CardMedia from '@mui/material/CardMedia';
import { RegistroCliente, RegistroLicencia, RegistroUsuario } from './Controller/Registro';
import { useNavigate } from 'react-router-dom'
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import StepContent from '@mui/material/StepContent';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';


const Registro = () => {
    // step
    const [activeStep, setActiveStep] = useState(0);
    // usuario
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
    };

    //funcion confirmar
    const Confirmar = async () => {
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
        try {
            const idUser = await RegistroUsuario(user);
            formData.append('id_usuario', idUser);

            await RegistroLicencia(formData2);
            await RegistroCliente(formData);
            Swal.fire({
                position: 'center',
                icon: 'success',
                title: 'Se ha registrado correctamente',
                showConfirmButton: false,
                timer: 1500
            })
            history('/login')
        } catch (error) {
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Algo salio mal. Vuelva a intentarlo'
            })
        }
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

    const handleNext = () => {
        if (activeStep === 0) {
            if (nombreValido && apellidoValido && cedulaValido && correoValido && contrasenaValida) {
                setActiveStep(activeStep + 1);
            }
        } else if (activeStep === 1) {
            // Validar los campos del segundo paso si es necesario
            setActiveStep(activeStep + 1);
        }
    };

    const handleBack = () => {
        setActiveStep(activeStep - 1);
    };


    return (
        <div className='formData'>
            <div className="container-formData">
                <Box sx={{ maxWidth: 1000 }} >
                    <button className="regresar-btn1" onClick={() => window.history.back()}>
                    <ArrowBackIcon /> Regresar
                    </button>
                    <h1>¡Bienvenido!</h1>
                    <p className='info'>Para comenzar, ingrese sus datos: </p>
                    <form className='Formulario' encType='multipart/form-data' onSubmit={handleSubmit}>
                        <Stepper activeStep={activeStep} orientation="vertical">
                            <Step>
                                <StepLabel>Registremos tus credenciales </StepLabel>
                                <StepContent>
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
                                </StepContent>
                            </Step>
                            <Step>
                                <StepLabel>Registremos tus datos Personales </StepLabel>
                                <StepContent>
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

                                                </div>
                                            </div>
                                            <div className="error">
                                                {error === 'Extensión de foto inválida' && <div className="alert alert-danger p-1">{error}</div>}
                                            </div>
                                        </div>
                                    </div>
                                </StepContent>

                            </Step>
                            <Step>
                                <StepLabel>Datos de licencia</StepLabel>
                                <StepContent>
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
                                </StepContent>

                            </Step>
                        </Stepper>


                        <div className="botones">
                            <Button disabled={activeStep === 0} onClick={handleBack}>
                                Atrás
                            </Button>
                            {activeStep === 0 ? (
                                <Button onClick={handleNext} className="btn1 btn-warning mt-1 w-100"
                                    disabled={!correoValido || !contrasenaValida}
                                >
                                    Siguiente
                                </Button>
                            ) : activeStep === 1 ? (
                                <Button onClick={handleNext}
                                    disabled={!cedulaValido || !nombreValido || !apellidoValido}
                                    className="btn1 btn-warning mt-1 w-100">
                                    Siguiente
                                </Button>
                            ) : (
                                <button className='btn1 btn-warning mt-1 w-100' onClick={Confirmar}
                                    disabled={!correoValido || !contrasenaValida || !cedulaValido || !nombreValido || !apellidoValido}
                                >Crear cuenta</button>
                            )}
                            <button className='btn2 btn-warning mt-1 w-100' onClick={() => window.history.back()}>Cancelar </button>
                        </div>
                    </form>
                </Box>
            </div>
        </div>

    );
};

export default Registro;
