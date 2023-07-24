import { useState } from 'react';
import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import StepContent from '@mui/material/StepContent';
import Button from '@mui/material/Button';
import { TextField } from '@mui/material';
import '../client/styles/Registro.css';
import { getCorreos } from './Controller/Registro';
import { verificarCedula } from '../client/controllers/rulesRegistro';
import { CircularProgress, Snackbar } from '@mui/material/';
import { useNavigate } from 'react-router-dom'
import Alert from '@mui/material/Alert';
import Swal from 'sweetalert2';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

export const RecuperacionContrasena = () => {
    const [activeStep, setActiveStep] = useState(0);
    const [correo, setCorreo] = useState('');
    const [correoValido, setCorreoValido] = useState(true);
    const [cedula, setCedula] = useState('');
    const [cedulaValida, setCedulaValida] = useState(true);

    const [user, setuser] = useState({ correo: '', cedula: '', contrasenaNueva: '' });
    const [isLoading, setIsLoading] = useState(false);
    const [snackbarOpen, setSnackbarOpen] = useState(false);
    const [snackbarSeverity, setSnackbarSeverity] = useState('success');
    const [snackbarMessage, setSnackbarMessage] = useState('');

    // REGISTRO 
    const history = useNavigate();
    // eslint-disable-next-line no-unused-vars
    const navigateTo = (path) => {
        history(path);
    }


    const verificarCorreo = (correo) => {

        // Lógica de validación del correo
        return correo.includes('@');
    };
    function generarContrasenaRandom() {
        const caracteres = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()_+';
        const longitud = 9; // Puedes ajustar la longitud de la contraseña aquí

        let contrasena = '';
        for (let i = 0; i < longitud; i++) {
            const indice = Math.floor(Math.random() * caracteres.length);
            contrasena += caracteres.charAt(indice);
        }

        return contrasena;
    }

    const handleNext = async (e) => {
        e.preventDefault();
        if (activeStep === 0) {
            const correoValido = verificarCorreo(correo);
            setCorreoValido(correoValido);
            if (correoValido) {
                setActiveStep(activeStep + 1);

            }
        } else if (activeStep === 1) {

            const cedulaValida = verificarCedula(cedula);
            setCedulaValida(cedulaValida);
            if (cedulaValida) {
                user.correo = correo;
                user.cedula = cedula;
                user.contrasenaNueva = generarContrasenaRandom();
                setIsLoading(true);

                const respuesta = await getCorreos(user);

                setIsLoading(false);
                if (respuesta) {
                    Swal.fire({
                        position: 'center',
                        icon: 'success',
                        title: 'Por favor, revisa tu correo electrónico para completar el proceso',
                        showConfirmButton: false,
                        timer: 1500
                    })
                    // Mostrar aviso de éxito usando Material-UI Snackbar
                    setSnackbarMessage('Solicitud exitosa');
                    setSnackbarSeverity('success');
                    setSnackbarOpen(true);

                    setActiveStep(activeStep + 1);
                    setuser('');
                    history.push('/login');

                } else {

                    Swal.fire({
                        icon: 'error',
                        title: 'Oops...',
                        text: 'No coindicen el correo y cedula proporcionada, Vuelva a intentarlo!!',
                        footer: '<a href="">Necesitas Ayuda?</a>'
                    })
                    // Mostrar aviso de rechazo usando Material-UI Snackbar
                    setSnackbarMessage('Solicitud rechazada');
                    setSnackbarSeverity('error');

                    history.push('/login');
                }

                setActiveStep(activeStep + 1);
                setuser('');
            }
        }
    };

    const handleBack = () => {
        setActiveStep(activeStep - 1);
    };
    const revision = (e) => {
        e.preventDefault();
    }

    return (
        <div className="formData">
            <div className="container-formData">
                <Box sx={{ maxWidth: 400 }} >
                <button className="regresar-btn1" onClick={() => window.history.back()}>
                    <ArrowBackIcon /> Regresar
                    </button>
                    <div className="formulario-recuperacion">
                        <h2>Recuperación de Contraseña</h2>
                        <form onSubmit={revision} className='Formulario' encType='multipart/form-data'>

                            <Stepper activeStep={activeStep} orientation="vertical">
                                <Step>
                                    <StepLabel>Ingrese su correo</StepLabel>
                                    <StepContent>
                                        <div className="step-content">
                                            <TextField
                                                label="Correo electrónico"
                                                value={correo}
                                                onChange={(e) => setCorreo(e.target.value)}
                                                error={!correoValido}
                                                helperText={!correoValido && 'Correo inválido'}
                                            />
                                        </div>
                                        <div className="step-actions">
                                            <Button disabled={activeStep === 0} onClick={handleBack}>
                                                Atrás
                                            </Button>
                                            <Button onClick={handleNext} className="btn-siguiente" variant="outline" color="primary">
                                                Siguiente
                                            </Button>
                                        </div>
                                    </StepContent>
                                </Step>
                                <Step>
                                    <StepLabel>Ingrese su cédula de registro</StepLabel>
                                    <StepContent>
                                        <div className="step-content">
                                            <TextField
                                                label="Cédula"
                                                value={cedula}
                                                onChange={(e) => setCedula(e.target.value)}
                                                error={!cedulaValida}
                                                helperText={!cedulaValida && 'Cédula inválida'}
                                            />
                                        </div>
                                        <div className="step-actions">
                                            <Button disabled={activeStep === 0} onClick={handleBack}>
                                                Atrás
                                            </Button>
                                            <Button sx={{ marginTop: '10px' }} onClick={handleNext} className="btn-solicitar-contrasena" variant="contained" color="primary">
                                                Restablecer
                                            </Button>
                                        </div>
                                    </StepContent>
                                </Step>
                            </Stepper>
                        </form>
                        <Snackbar open={snackbarOpen} autoHideDuration={8000} onClose={() => setSnackbarOpen(false)}>
                            <Alert severity={snackbarSeverity}>{snackbarMessage}</Alert>
                        </Snackbar>
                        {isLoading && <CircularProgress />}
                    </div>

                </Box>
            </div>
        </div >
    );
};
