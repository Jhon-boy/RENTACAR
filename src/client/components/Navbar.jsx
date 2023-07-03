/* eslint-disable react/prop-types */
import React from 'react';
import { Link, Outlet, useNavigate } from 'react-router-dom';
import { AppBar, Toolbar, Typography, Button } from '@mui/material/';
import { Home, DirectionsCar, Contacts, EventNote, Business, AccountCircle } from '@mui/icons-material';
import { useEffect } from 'react';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Swal from 'sweetalert2';
import { Salir } from '../controllers/User.controller';
import { Loader } from '../../pages/Loaders';

export default function Navbar({ usuario }) {
    const [anchorEl, setAnchorEl] = React.useState(null);
    const [showLoader, setShowLoader] = React.useState(false);
    const open = Boolean(anchorEl);
    const history = useNavigate();

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const logOut = async () => {
        Swal.fire({
            title: '¿Está seguro de cerrar sesión?',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Sí, Salir'
        }).then(async (result) => {
            if (result.isConfirmed) {
                try {
                    setShowLoader(true); // Mostrar el Loader
                    await Salir();
                    localStorage.removeItem('credentials');
                    setTimeout(() => {
                        setShowLoader(false); // Ocultar el Loader después de 2 segundos
                        history('/inicio');
                    }, 2000);
                } catch (error) {
                    setShowLoader(false); // Ocultar el Loader en caso de error
                    Swal.fire({
                        icon: 'error',
                        title: 'Algo salió mal',
                        text: 'Error: ' + error.message
                    });
                }
            }
        });
    };

    useEffect(() => {
        console.log(usuario);
    })

    return (

        <>
            {
                showLoader ? (
                  <center>
                    <Loader />
                  </center>  
                ) : (
                    <div className='NavBar'>
                        <AppBar className='NavBar' style={{ height: '100px', backgroundColor: '#0194be', display: 'flex', justifyContent: 'space-between' }}>
                            <Toolbar style={{ marginTop: '1%', display: 'flex', justifyContent: 'space-between' }}>
                                <div className="nombre-empresa">
                                    <Typography variant="h6" style={{ flexGrow: 40, fontWeight: 'bold' }}>
                                        <b>R</b>enta<b>C</b>ar
                                    </Typography>
                                </div>
                                <Link to="/cliente" style={{ color: 'white', textDecoration: 'none', display: 'flex', marginLeft: '200px', marginRight: '30px', alignItems: 'center' }}>
                                    <Home style={{ marginRight: '4px' }} />
                                    <Typography variant="subtitle1">Home</Typography>
                                </Link>
                                <Link to="/cliente/vehiculos" style={{ color: 'white', textDecoration: 'none', marginRight: '30px', display: 'flex', alignItems: 'center' }}>
                                    <DirectionsCar style={{ marginRight: '4px' }} />
                                    <Typography variant="subtitle1">Vehiculos</Typography>
                                </Link>
                                <Link to="#" style={{ color: 'white', textDecoration: 'none', marginRight: '30px', display: 'flex', alignItems: 'center' }}>
                                    <Contacts style={{ marginRight: '4px' }} />
                                    <Typography variant="subtitle1">Contactos</Typography>
                                </Link>
                                <Link to="#" style={{ color: 'white', textDecoration: 'none', marginRight: '30px', display: 'flex', alignItems: 'center' }}>
                                    <EventNote style={{ marginRight: '4px' }} />
                                    <Typography variant="subtitle1">Reserva</Typography>
                                </Link>
                                <Link to="#" style={{ color: 'white', textDecoration: 'none', marginRight: '30px', display: 'flex', alignItems: 'center' }}>
                                    <Business style={{ marginRight: '4px' }} />
                                    <Typography variant="subtitle1">Oficina</Typography>
                                </Link>
                                <Link to="/cliente" style={{
                                    alignItems: 'center', display: 'flex', marginLeft: '150px', border: '1px solid white', borderRadius: '5px', padding: '5px'
                                }} component={Button} variant="outlined" >
                                    <AccountCircle style={{ color: 'white' }} />
                                    <Typography style={{ marginLeft: '4px', color: 'white' }}> <div>
                                        <Button
                                            variant="outlined"
                                            id="basic-button"
                                            aria-controls={open ? 'basic-menu' : undefined}
                                            aria-haspopup="true"
                                            aria-expanded={open ? 'true' : undefined}
                                            onClick={handleClick}
                                            style={{ marginLeft: '4px', color: 'white' }}
                                        >
                                            {usuario}
                                        </Button>
                                        <Menu
                                            id="basic-menu"
                                            anchorEl={anchorEl}
                                            open={open}
                                            onClose={handleClose}
                                            MenuListProps={{
                                                'aria-labelledby': 'basic-button',
                                            }}
                                        >
                                            <MenuItem onClick={handleClose}>Profile</MenuItem>
                                            <MenuItem onClick={handleClose}>My account</MenuItem>
                                            <MenuItem onClick={logOut}>Logout</MenuItem>
                                        </Menu>
                                    </div></Typography>
                                </Link>

                            </Toolbar>
                        </AppBar>
                        <Outlet />
                    </div>
                )
            }

        </>


    );
}
