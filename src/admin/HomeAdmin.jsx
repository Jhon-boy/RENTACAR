/* eslint-disable react/prop-types */
import { Routes, Route } from 'react-router-dom';
import stil from './HomeAdmin.module.css';


import Autos from './Carros/Autos'
import { CardAutos } from './Carros/CardAutos'
import { CreateCar } from './components/forms/CreateCar'
import { EditCar } from './components/forms/EditCar'
import { CardClientes } from './clientes/CardClientes'
import Clientes from './clientes/Clientes'
import { InfoClien } from './clientes/InfoClien'
import { Config } from './config/Config'
import { Reservas } from './Reservas/Reserva'


import { ClientsPending } from './clientes/ClientsPending'
import { ClientsNo } from './clientes/ClientsNo'
import { Pagos } from './components/pagos/pagos'
import { Historial } from './components/historial/Historial'
import { Profile } from './components/Profile/Profile'



import Sidebar from './Sidebar'
import { HomeData } from './Datos/HomeData';

export default function HomeAdmin({ correo, id_user }) {
  return (
    <div style={{display: 'flex'}}>
      <section className={stil.content}>
        <Sidebar correo={correo} />
     
        <div className={stil.contentPage}>
        
          <Routes>
            <Route path='/Autos' element={<Autos />} />
            <Route path='/Autos/:id' element={<CardAutos />} />
            <Route path='/Clientes' element={<Clientes />} />
            <Route path='/crearAuto' element={<CreateCar />} />
            <Route path='/EditCar/:id' element={<EditCar />} />
            <Route path='/CardClient' element={<CardClientes />} />
            <Route path='/InfoClient/:id' element={<InfoClien />} />
            <Route path='/Reservas/*' element={<Reservas />} />
            <Route index  element={<HomeData />} />


            <Route path='/clientesPending' element={<ClientsPending />} />
            <Route path='/clientesNo' element={<ClientsNo />} />
            <Route path='/Pagos' element={<Pagos />} />
            <Route path='/Perfil' element={<Profile id={id_user} />} />
            <Route path='/Historial/:id' element={<Historial />} />

            <Route path='/Configuracion' element={<Config />} />
          </Routes>
        </div>
      </section>
    </div>

  )
}
