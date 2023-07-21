/* eslint-disable react/prop-types */
import { Routes, Route } from 'react-router-dom';
import stil from './HomeAdmin.module.css';
import Autos from './Carros/Autos'
import Clientes from './clientes/Clientes'
import { Config } from './config/Config'
import { Reservas } from './Reservas/Reserva'
import { Pagos } from './Pagos/pagos'

import Sidebar from './Sidebar'
import { HomeData } from './Datos/HomeData';

export default function HomeAdmin({ correo, id_user }) {
  return (
    <div style={{display: 'flex'}}>
      <section className={stil.content}>
        <Sidebar correo={correo} />
     
        <div className={stil.contentPage}>
        
          <Routes>
            <Route path='/Autos/*' element={<Autos />} />
            <Route path='/Clientes/*' element={<Clientes />} />
            <Route path='/Reservas/*' element={<Reservas />} />
            <Route index  element={<HomeData />} />
            <Route path='/Pagos' element={<Pagos />} />

            <Route path='/Configuracion' element={<Config />} />
          </Routes>
        </div>
      </section>
    </div>

  )
}
