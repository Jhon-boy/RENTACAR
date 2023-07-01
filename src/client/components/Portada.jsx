import React from 'react'
import Img1 from '../../assets/1.webp'
import '../styles/Portada.css'
import Buscador from '../components/Buscador'

export default function Portada() {
    return (
        <div className='hero'>
            <div className="card" >
                <div className="img-portada"></div>
                <img className='img' src={Img1} alt="Backgraound" />
                <div className="container-text">
                    <h5 className="card-title1" style={{ color: 'white', width: '500px', textAlign: 'center' }}>
                        ¡TENEMOS EL VEHÍCULO PARA TI!
                    </h5>
                    <h6 className="card-text" style={{ color: 'black', width: '500px', textAlign: 'center' }}>Los mejores vehiculos para que reserves y aproveches.</h6>
                </div>
            <Buscador/>
            </div>
        </div>
    )
}
