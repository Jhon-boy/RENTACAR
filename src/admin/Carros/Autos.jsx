
import '../Home.css'
import Button from 'react-bootstrap/Button';
import { TableAutos } from './TableAutos'
import { Link } from 'react-router-dom'
const Autos = () => {
  return (
    <div className='page-content'>
      <div className='home-container'>
        <div> ADMINISTRAR AUTOS</div>
        <Link to={`/crearAuto`}>
          <Button>Registrar Autos</Button>
        </Link>
        <TableAutos />

      </div>
    </div>
  )
}

export default Autos