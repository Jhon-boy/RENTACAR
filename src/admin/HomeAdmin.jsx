import { Routes, Route, useNavigate } from 'react-router-dom';
import stil from './HomeAdmin.module.css';


import Autos from './Carros/Autos'
import { CardAutos } from './Carros/CardAutos'
import { CreateCar } from './components/forms/CreateCar'
import { EditCar } from './components/forms/EditCar'
import { CardClientes } from './clientes/CardClientes'
import Clientes from './clientes/Clientes'
import { InfoClien } from './clientes/InfoClien'
import { Config } from './components/config/Config'
import { Reservas } from './components/Reservas.js/Reservas'
import { InfoReserva } from './components/Reservas.js/InfoReserva'
import { CardsReservas } from './components/Reservas.js/CardsReservas'
import { TablePending } from './components/Reservas.js/TablePending'
import { TableConcret } from './components/Reservas.js/TableConcret'
import { ClientsPending } from './clientes/ClientsPending'
import { ClientsNo } from './clientes/ClientsNo'
import { Pagos } from './components/pagos/pagos'
import { Historial } from './components/historial/Historial'
import { Profile } from './components/Profile/Profile'

import Sidebar from './Sidebar'

export default function HomeAdmin({ correo, id_user }) {
  return (
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
          <Route path='/Configuracion' element={<Config />} />
          <Route path='/Reservas' element={<Reservas />} />
          <Route path='/InfoReserva/:id' element={<InfoReserva />} />
          <Route path='/ReservaCard' element={<CardsReservas />} />
          <Route path='/ReservasPendientes' element={<TablePending />} />
          <Route path='/ReservasConcretas' element={<TableConcret />} />
          <Route path='/clientesPending' element={<ClientsPending />} />
          <Route path='/clientesNo' element={<ClientsNo />} />
          <Route path='/Pagos' element={<Pagos />} />
          <Route path='/Perfil' element={<Profile id={id_user} />} />
          <Route path='/Historial/:id' element={<Historial />} />
        </Routes>
      </div>
    </section>
  )
}
