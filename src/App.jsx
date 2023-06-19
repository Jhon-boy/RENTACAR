import { Route, Routes } from 'react-router-dom'
import Sidebar from './admin/menu/Sidebar'
import Error from './pages/Error'
import Home from './admin/Home'
import Autos from './admin/Carros/autos'
import Clientes from './admin/clientes/clientes'
function App() {


  return (
    <Routes>
      <Route>
        <Route path='/' element={<Sidebar />}>
          <Route index path='/Home' element={<Home />} />
          <Route path='/Autos' element={<Autos />} />
          <Route path='/Clientes' element={<Clientes />} />
        </Route>
      </Route>
      <Route path='*' element={<Error />} />
    </Routes>

  )
}

export default App
