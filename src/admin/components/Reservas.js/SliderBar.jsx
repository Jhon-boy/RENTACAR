/* eslint-disable react/prop-types */
import '../../styles/SliderBarClient.css'
import { Link } from 'react-router-dom'

export const SliderBar = ({ activeTab, setActiveTab }) => {
    return (
        <div className="slider-bar">
            <Link to={`/Reservas`}>
                <div
                    className={`slider-item ${activeTab === 'lista' ? 'active' : ''}`}
                    onClick={() => setActiveTab('lista')}
                >
                    Listado  de todas las reservas
                </div>
            </Link>
            <Link to={`/ReservasPendientes`}>
                <div
                    className={`slider-item ${activeTab === 'pending' ? 'active' : ''}`}
                    onClick={() => setActiveTab('pending')}
                >
                    Reservas Pendientes
                </div>
            </Link>
            <Link to={`/ReservasConcretas`}>
                <div
                className={`slider-item ${activeTab === 'all' ? 'active' : ''}`}
                onClick={() => setActiveTab('all')}
            >
               Reservas Concretadas
            </div>
            </Link>
            
        </div>
    )
}
