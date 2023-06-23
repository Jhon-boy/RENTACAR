import { Route, Routes } from 'react-router-dom'
import Sidebar from './admin/menu/Sidebar'
import Error from './pages/Error'
import Home from './admin/Home'
import Autos from './admin/Carros/autos'
import Clientes from './admin/clientes/clientes'
import { CardAutos } from './admin/Carros/CardAutos'
import { CreateCar } from './admin/components/forms/CreateCar'
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
        </Route>
      </Route>

      <Route path='*' element={<Error />} />
    </Routes>

  )
}

export default App
