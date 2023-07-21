
//import '../Home.css'
import { Routes, Route } from 'react-router-dom';
import { TableAutos } from './TableAutos'

import { CardAutos } from './CardAutos'
import { CreateCar } from './CreateCar'
import { EditCar } from './EditCar'
import stil from './Autos.module.css'

const Autos = () => {
  return (
    <div className={stil.contentAutos}>
      <Routes>
        <Route path='/' element={<TableAutos />} />
        <Route path='/:id' element={<CardAutos />} />
        <Route path='/crearAuto' element={<CreateCar />} />
        <Route path='/EditCar/:id' element={<EditCar />} />
      </Routes>
    </div>  
  )
}

export default Autos