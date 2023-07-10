import React, { useEffect, useState } from 'react';
import '../styles/login.css';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup'
import { URL } from '../client/data/URL';
import { Link, useNavigate } from 'react-router-dom'
import Swal from 'sweetalert2'
import { LoginUser } from './Controller/Login.controller';


const loginSchema = Yup.object().shape(
    {
        email: Yup.string()
            .email('Formato de Emial inválido')
            .required('Email es obligatorio'),
        password: Yup.string().required('Contraseña es obligatorio')
    }
)
const CredencialesInicial = {
    email: '',
    password: ''
}

// eslint-disable-next-line no-unused-vars
export const Login = (props) => {

    const [usuario, setUsuario] = React.useState(null);
    const [data, setData] = useState({ correo: '', contrasena: '' });
    const [clientes, setClientes] = useState();

    const history = useNavigate();

    const navigateTo = (path) => {
        history(path);
    }
    const iniciarSesion = async (e) => {
        e.preventDefault();
        data.correo = e.target.email.value;
        data.contrasena = e.target.password.value;
        try {
            const response = await LoginUser(data);
            if (response) {
                const { usuario, token } = response;

                // Filtrar los datos del cliente utilizando usuario.id
                const clienteFiltrado = clientes.find(cliente => cliente.id_usuario === usuario.id);

                console.log(clienteFiltrado);
                // Guardar los datos del cliente junto con los demás en el localStorage
                localStorage.setItem('credentials', JSON.stringify({ correo: usuario.correo, rol: usuario.rol, id_user: usuario.id, token, cliente: clienteFiltrado }));

                // Redirigir al usuario en función de su rol
                if (usuario.rol === 1) {
                    history('/Home');
                } else if (usuario.rol === 2) {
                    history('/cliente');
                } else {
                    // Redirigir a una ruta por defecto si el rol no coincide con ninguna condición
                    history('/homeUser');
                }

                Swal.fire({
                    position: 'center',
                    icon: 'success',
                    title: 'Bienvenido',
                    showConfirmButton: false,
                    timer: 2500,
                    timerProgressBar: true
                });

                setUsuario('');
                setData('');
            }
        } catch (error) {
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Verifique correo o contraseña',
            });
        }

        //Aqui haremos la verificacion bro :3
    }
    useEffect(() => {
        const cargarCliente = async () => {
            try {
                const responseClientes = await fetch(`${URL}/clientes`);
                const clientesData = await responseClientes.json();
                setClientes(clientesData);
            } catch (error) {
                console.error(error);
            }
        };
        cargarCliente();
    }, []);

    return (
        <>
            {
                usuario ?
                    navigateTo('/')
                    : <div className='LoginIngreso'>
                        <Formik
                            initialValues={CredencialesInicial}
                            //Yup Validaciones esquemas
                            validationSchema={loginSchema}
                            onSubmit={
                                // eslint-disable-next-line no-unused-vars
                                async (values) => {
                                    await new Promise((r) => setTimeout(r, 500));
                                    // alert(JSON.stringify(values, null, 2));
                                }} >
                            {({
                                errors,
                                touched,
                                isSubmitting
                            }) => (
                                <Form onSubmit={iniciarSesion} >
                                    <center>
                                        <div className='Ingreso'>
                                            <div className="container-title">
                                                <h1>RentaCar</h1>
                                            </div>
                                            <div className="container-saludo">
                                                <h3>¡Bienvenido!</h3>
                                                <p>Por favor, ingrese sus datos para iniciar sesion.</p>
                                            </div>
                                            <div className="mb-3">
                                                <label className="form-label align-left">Correo</label>
                                                <Field
                                                    className="form-control"
                                                    type="email"
                                                    id='email'
                                                    name='email'
                                                    placeholder='example@gmail.com'
                                                /> {
                                                    errors.email && touched.email &&
                                                    (
                                                        <ErrorMessage name='email' className='Errores' component='div'></ErrorMessage>
                                                    )
                                                }
                                            </div>
                                            <div className="mb-3">
                                                <label className="form-label">Contraseña</label>
                                                <Field className="form-control"
                                                    type="password"
                                                    id='password'
                                                    name='password'
                                                />
                                                {
                                                    errors.password && touched.password &&
                                                    (
                                                        ( //Mostramos el error en caso de ser invalido con un DIV
                                                            <ErrorMessage name='password' className='Errores' component='div'></ErrorMessage>
                                                        )
                                                    )
                                                }
                                            </div>
                                            <button type='submit' className='btn btn-primary mb-3'>Ingresar</button>
                                            {isSubmitting ? (<p>Sending....</p>) : null}
                                            <br></br>
                                            <Link to="/registro" className='NewCount'> ¿No tienes Cuenta? Crea una! </Link>
                                            <div className='recuperar'>
                                            <Link to="/registro" className='NewCount'> Recuperar contraseña </Link>
                                            </div>
                                        </div>
                                    </center>
                                </Form>
                            )
                            }
                        </Formik>
                    </div>
            }
        </>
    );
}
