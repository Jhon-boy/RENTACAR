import ErrorP from '../assets/ErrorP.png'
import { useNavigate } from 'react-router-dom'
  import '../client/styles/Error.css'
  
export const Error = () => {
  const history = useNavigate();

  const navigateTo = (path) => {
      history(path);
  }

    return (
        <div>
            <div className='ErrorComponent'>
                <img className='imagenError' alt='ErrorImg' src={ErrorP} />
                <div>
                    <h1>
                        Error 404
                    </h1>
                    <h2> La página que intentas acceder no existe o se ha movido </h2>
                    <button className='btnInicio' onClick={() => navigateTo('/inicio')} >Regresar a inicio</button>
                <button className='btnInformar' onClick={() => navigateTo('/about')} >Informar Error</button>
                </div>
            </div>

        </div>
    )
}

