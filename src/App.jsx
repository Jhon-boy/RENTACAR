import { Route, Routes } from 'react-router-dom'
import Sidebar from './admin/menu/Sidebar'
import Error from './pages/Error'
import Home from './admin/Home'
import Autos from './admin/Carros/autos'
import { CardAutos } from './admin/Carros/CardAutos'
import { CreateCar } from './admin/components/forms/CreateCar'
import { EditCar } from './admin/components/forms/EditCar'
import { CardClientes } from './admin/clientes/CardClientes'
import Clientes from './admin/clientes/Clientes'
import { InfoClien } from './admin/clientes/InfoClien'
import  {Config } from './admin/components/config/Config'
import { Reservas } from './admin/components/Reservas.js/Reservas'
import { InfoReserva } from './admin/components/Reservas.js/InfoReserva'
import { CardsReservas } from './admin/components/Reservas.js/CardsReservas'
import { TablePending } from './admin/components/Reservas.js/TablePending'
import { TableConcret } from './admin/components/Reservas.js/TableConcret'
import { ClientsPending } from './admin/clientes/ClientsPending'
import { ClientsNo } from './admin/clientes/ClientsNo'
import { Pagos } from './admin/components/pagos/pagos'
import { Historial } from './admin/components/historial/Historial'


function App() {

  return (
    <Routes>
      <Route>
        <Route path='/' element={<Sidebar />}>
          <Route index path='/Home' element={<Home />} />
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
          <Route path='/Historial/:id' element={<Historial />} /> 
        </Route>
      </Route>
      <Route path='*' element={<Error />} />
    </Routes>
  )
}

export default App