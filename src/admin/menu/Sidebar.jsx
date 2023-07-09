/* eslint-disable react/prop-types */
import { useState } from 'react';
import './Sidebar.css';
import { Outlet, Link , useNavigate} from 'react-router-dom'
import { UilBars } from "@iconscout/react-unicons";
import { motion } from "framer-motion";
import { SidebarData } from "../data/Data";
import { Salir } from '../database/Admin.controller';
import Swal from 'sweetalert2';
import { Loader } from '../../pages/Loaders';
import { Typography, Button } from '@mui/material/';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';

export default function Sidebar({ usuario }) {
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
  console.log(window.innerWidth)


  return (
    <>
      {
        showLoader ? (
          <center>
            <Loader />
          </center>
        ) : (
          <div>
            <div className="bars" style={expanded ? { left: '60%' } : { left: '75%' }} onClick={() => setExpaned(!expanded)}>
              <UilBars />
            </div>
            <motion.div className='sidebar'
              variants={sidebarVariants}
              animate={window.innerWidth <= 768 ? `${expanded}` : ''}
            >
              <div className="menu">


                {SidebarData.map((item, index) => {
                  return (
                    <div
                      className={selected === index ? "menuItem active" : "menuItem"}
                      key={index}
                      onClick={() => setSelected(index)}
                    >
                      <item.icon />
                      <Link to={'/' + item.heading}>
                        <span>{item.heading}</span>
                      </Link>
                    </div>
                  );
                })}
                <Typography style={{ color: 'black' }}> <div>
                  <Button
                    id="basic-button"
                    variant="outlined"
                    aria-controls={open ? 'basic-menu' : undefined}
                    aria-haspopup="true"
                    aria-expanded={open ? 'true' : undefined}
                    onClick={handleClick}
                    style={{ color: 'black' , fontSize: '10px' }}
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
                <Link to='/Perfil'>
                  <MenuItem onClick={handleClose}>Perfil</MenuItem>
                </Link>    
                    <MenuItem onClick={handleClose}>Configuraciones</MenuItem>
                    <MenuItem onClick={logOut}>Salir</MenuItem>
                  </Menu>
                </div></Typography>
              </div>
            </motion.div>
            <Outlet />
          </div>
        )
      }


    </>

  );
}

