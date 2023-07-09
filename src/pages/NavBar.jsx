import { AppBar, Toolbar, Typography, Button } from '@mui/material/';
import { Link, Outlet, useNavigate } from 'react-router-dom';
import { Home, DirectionsCar, Contacts, EventNote, Business, AccountCircle } from '@mui/icons-material';
import '../styles/navbar.css'
const NavBar = () => {
  return (
    <div className="NavBar">
      <AppBar className='NavBar' style={{ height: '100px', backgroundColor: '#0194be', display: 'flex', justifyContent: 'space-between' }}>
        <Toolbar style={{ marginTop: '1%', display: 'flex', justifyContent: 'space-between' }}>
          <Typography variant="h6" style={{ flexGrow: 17, fontWeight: 'bold' }}>
            <b>R</b>enta<b>C</b>ar
          </Typography>
          <Link to="/cliente" style={{ color: 'white', textDecoration: 'none', display: 'flex', marginLeft: '200px', marginRight: '30px', alignItems: 'center' }}>
            <Home style={{ marginRight: '4px' }} />
            <Typography variant="subtitle1">Home</Typography>
          </Link>
          <Link to="/cliente/vehiculos" style={{ color: 'white', textDecoration: 'none', marginRight: '30px', display: 'flex', alignItems: 'center' }}>
            <DirectionsCar style={{ marginRight: '4px' }} />
            <Typography variant="subtitle1">Vehiculos</Typography>
          </Link>
          <Link to="/cliente/misReservas" style={{ color: 'white', textDecoration: 'none', marginRight: '30px', display: 'flex', alignItems: 'center' }}>
            <EventNote style={{ marginRight: '4px' }} />
            <Typography variant="subtitle1">Reserva</Typography>
          </Link>
          <Link to="/cliente/contactos" style={{ color: 'white', textDecoration: 'none', marginRight: '30px', display: 'flex', alignItems: 'center' }}>
            <Contacts style={{ marginRight: '4px' }} />
            <Typography variant="subtitle1">Contactos</Typography>
          </Link>
          <Link to="#" style={{ color: 'white', textDecoration: 'none', marginRight: '30px', display: 'flex', alignItems: 'center' }}>
            <Business style={{ marginRight: '4px' }} />
            <Typography variant="subtitle1">Oficina</Typography>
          </Link>
          <div style={{ marginLeft: '76px', display: 'flex' }}>
            <Link to="/login" component={Button} variant="outlined" color="red"style={{
                                    alignItems: 'center', display: 'flex', marginLeft: '150px', border: '1px solid white', borderRadius: '5px', padding: '5px'
                                }}>
              <AccountCircle style={{ color: 'white' }} />
              <Typography variant="outlined" style={{ marginLeft: '4px', color: 'white' }}>Login</Typography>
            </Link>
          </div>
        </Toolbar>
      </AppBar>
    </div>
  );
};

export default NavBar;
