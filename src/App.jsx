import { Routes, Route, useNavigate } from 'react-router-dom';
import { useEffect } from 'react';

import  { Error } from './pages/Error'
import HomeAdmin from './admin/HomeAdmin'

import Navbar from './client/components/Navbar'
import { HomeClient } from './client/components/HomeClient'
import { Cars } from './client/components/Cars'
import { Login } from './pages/Login'
import { Inicio } from './pages/Inicio'
import InformacionAuto from './client/components/InformacionAuto'
import { ProtectedRoute } from './Router/ProtectedRoutes';
import { ProtectedRouteClient } from './Router/ProtectedRouteClient';
import Registro from './pages/Registro'
import { PagosC } from './client/components/PagosC';
import { ReservasC } from './client/components/ReservasC';
import { ContactForm } from './client/components/ContactForm';

import { EditPerfil } from './client/components/EditPerfil';
import { RecuperacionContrasena } from './pages/RecuperacionContrasena ';
import { ContactosG } from './pages/ContactosG';
import Oficina from './client/components/Oficina';

function App() {
  // Obtener el usuario del almacenamiento local
  const storedCredentials = localStorage.getItem('credentials');
  const { correo, rol, id_user, cliente } = storedCredentials ? JSON.parse(storedCredentials) : {};


  // Verificar si el usuario está logeado
  const isUserLoggedIn = correo && rol && id_user;

  // Navegación programática
  const navigate = useNavigate();

  // Función para redirigir al sistema correspondiente
  const redirectToSystem = () => {
    if (isUserLoggedIn) {
      if (rol === 1) {
        navigate('/Home');
      } else if (rol === 2) {
        navigate('/cliente');
      }
    } else {
      navigate('/inicio');
    }
  };

  // Redireccionar al sistema si el usuario ya está logeado
  useEffect(() => {
    redirectToSystem();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      {/* ================= ADMINISTRADOR ============0z */}
      <Routes>
        <Route element={<ProtectedRoute usuario={correo} />}>
          <Route path='/'>
            {isUserLoggedIn && (
              <Route path='/Home/*' element={<HomeAdmin id_user={id_user} correo={correo}/>} />
            )}
          </Route>

          {/* ========================CLIENT ===========================000 */}

          <Route>
            {isUserLoggedIn && (
              <Route element={<ProtectedRouteClient usuario={correo} />}>
                <Route path='/cliente' element={<Navbar usuario={correo} cliente={cliente}/>}>
                  <Route index element={<HomeClient />} />
                  <Route path='/cliente/vehiculos' element={<Cars />} />
                  <Route path='/cliente/misPagos' element={<PagosC cliente={cliente}/>} />
                  <Route path='/cliente/contactos' element={<ContactForm />} />
                  <Route path='/cliente/misReservas' element={<ReservasC cliente={cliente}/>} />
                  <Route path='/cliente/editPerfil' element={<EditPerfil id={id_user}  cliente={cliente} />} />
                  <Route path='/cliente/vehiculos/:id_auto' element={<InformacionAuto cliente={cliente} />} />
                  <Route path='/cliente/oficina2' element={<Oficina />} />
                </Route>
              </Route>
            )}
          </Route>
        </Route>
        <Route path='/login' element={<Login />} />
        <Route path='/inicio' index element={<Inicio />} />
        <Route path='/registro' element={<Registro />} />
        <Route path='/recuperarContraseña' element={<RecuperacionContrasena />} />
        <Route path='*' element={<Error />} />
        <Route path='/oficina' element={<Oficina />} />
        <Route path='/contacts' element={<ContactosG />} />
      </Routes>
    </>
  );
}

export default App;