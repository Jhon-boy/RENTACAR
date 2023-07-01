import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import { Link } from 'react-router-dom';
import { Home, DirectionsCar, Contacts, Business, AccountCircle } from '@mui/icons-material';
import Button from '@mui/material/Button';

const NavBar = () => {
  return (
    <AppBar className='NavBar' style={{ height: '100px' }}>
      <Toolbar style={{ marginTop: '2%' }}>
        <Typography variant="h6" style={{ flexGrow: 17, fontWeight: 'bold' }}>
          <b>R</b>enta<b>C</b>ar
        </Typography>
        <Link to="/cliente" style={{ color: 'white', textDecoration: 'none', marginRight: '96px' }}>
          <Home />
          <Typography variant="subtitle1" style={{ marginLeft: '4px' }}>Home</Typography>
        </Link>
        <Link to="/cliente/vehiculos" style={{ color: 'white', textDecoration: 'none', marginRight: '96px' }}>
          <DirectionsCar />
          <Typography variant="subtitle1" style={{ marginLeft: '4px' }}>Vehiculos</Typography>
        </Link>
        <Link to="#" style={{ color: 'white', textDecoration: 'none', marginRight: '96px' }}>
          <Contacts />
          <Typography variant="subtitle1" style={{ marginLeft: '4px' }}>Contactos</Typography>
        </Link>
        <Link to="#" style={{ color: 'white', textDecoration: 'none', marginRight: '96px' }}>
          <Business />
          <Typography variant="subtitle1" style={{ marginLeft: '4px' }}>Oficina</Typography>
        </Link>
        <div style={{ marginLeft: '76px', display: 'flex' }}>
          <Link to="/login" component={Button} variant="outlined" color="red" style={{ marginRight: '88px' }}>
            <AccountCircle style={{ color: 'white' }} />
            <Typography variant="outlined" style={{ marginLeft: '4px', color: 'white' }}>Login</Typography>
          </Link>
        </div>
      </Toolbar>
    </AppBar>
  );
};

export default NavBar;
