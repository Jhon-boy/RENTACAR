import React from 'react';
import SearchIcon from '@mui/icons-material/Search';
import '../styles/Buscador.css';

export default function Buscador() {
    return (
        <div>
            <div className="hero-image">
                <div className="overlay">
                    <h1>¿Buscas rentar un vehículo?</h1>
                    <div className="search-box">
                        <span className="text">Fecha alquiler: </span>
                        <input type="date" placeholder="Fecha de inicio" style={{textAlign:'center'}} />
                        <span className="text">Fecha devolución: </span>
                        <input type="date" placeholder="Fecha de fin" style={{textAlign:'center'}} />
                        <span className="text">Tipo de vehículo</span>
                        <select className='box-tip'>
                            <option value="">Tipo de vehículo</option>
                            <option value="compacto">Camión</option>
                            <option value="sedan">Auto</option>
                            <option value="suv">Camioneta</option>
                        </select>
                        <button style={{display: 'flex'}}>
                            <SearchIcon />Buscar
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
