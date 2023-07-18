import { useState } from 'react';
//import './Sidebar.css';
//import styled from 'styled-components'
import stil from './Sidebar.module.css'

import { Link, useNavigate } from 'react-router-dom'
import { SidebarData } from "./data/Data";
import { Salir } from './database/Admin.controller';
import Swal from 'sweetalert2';
import { Loader } from '../pages/Loaders';
import { Typography, Button } from '@mui/material/';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';

const imgUser = 'https://www.svgrepo.com/show/527946/user-circle.svg'

export default function Sidebar({ correo }) {
  const [expanded, setExpaned] = useState(true)
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const [selected, setSelected] = useState(0);
  const [showLoader, setShowLoader] = useState(false);

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

  const sidebarVariants = {
    true: {
      left: '0'
    },
    false: {
      left: '-60%'
    }
  }


  return (
    <section className={stil.Lateral}>
      {
        showLoader ? (
          <center>
            <Loader />
          </center>
        ) : (
          <section className={stil.menu}>
            <article className={stil.contentImgUser}>
              <img src={imgUser} className={stil.imgUser}></img>
            </article>
            {SidebarData.map((item, index) => {
              return (
                <Link
                  className={selected === index ? stil.menuItemActive : stil.menuItem}
                  key={index}
                  onClick={() => setSelected(index)}
                  to={'/Home/' + item.url}>
                  <item.icon />
                  <span>{item.heading}</span>
                </Link>
              );
            })}
            <Typography style={{ color: '#3085d6' }}>
              <Button
                id="basic-button"
                variant="outlined"
                aria-controls={open ? 'basic-menu' : undefined}
                aria-haspopup="true"
                aria-expanded={open ? 'true' : undefined}
                onClick={handleClick}
                style={{
                  color: '#3085d6',
                  backgroundColor: 'white',
                  fontSize: '10px',
                  fontWeight: 'bold',
                  marginTop: '20px',
                  border: '2px solid #3085d6'
                }}
                className={stil.btnCorreo}>
                {correo}
              </Button>
              <Menu
                id="basic-menu"
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                MenuListProps={{'aria-labelledby': 'basic-button',}}>
                <Link to='/Perfil'>
                  <MenuItem onClick={handleClose}>Perfil</MenuItem>
                </Link>
                <MenuItem onClick={handleClose}>Configuraciones</MenuItem>
                <MenuItem onClick={logOut}>Salir</MenuItem>
              </Menu>
            </Typography>
          </section>
        )
      }


    </section>

  );
}

