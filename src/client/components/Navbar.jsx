
import { Link,  Outlet, } from 'react-router-dom';
import { AppBar, Toolbar, Typography, Button } from '@mui/material/';
import { Home, DirectionsCar, Contacts, EventNote, Business, AccountCircle } from '@mui/icons-material';

export default function Navbar() {
    return (
        <div className='NavBar'>
            <AppBar className='NavBar' style={{height: '100px'}}>
                <Toolbar  style={{marginTop: '1%'}}>
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
                        <EventNote />
                        <Typography variant="subtitle1" style={{ marginLeft: '4px' }}>Reserva</Typography>
                    </Link>
                    <Link to="#" style={{ color: 'white', textDecoration: 'none', marginRight: '96px' }}>
                        <Business />
                        <Typography variant="subtitle1" style={{ marginLeft: '4px' }}>Oficina</Typography>
                    </Link>
                    <div style={{ marginLeft: '76px', display: 'flex'}}>
                        <Link to="/login" component={Button} variant="outlined" color="red" style={{ marginRight: '88px' }}>
                            <AccountCircle style={{color: 'white'}} />
                            <Typography variant="outlined" style={{ marginLeft: '4px', color: 'white' }}>Login</Typography>
                        </Link>
                    </div>
                </Toolbar>
            </AppBar>
            <Outlet />
        </div>

    );
}
