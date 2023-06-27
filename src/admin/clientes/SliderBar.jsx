/* eslint-disable react/prop-types */
import '../styles/SliderBarClient.css'
import { Link } from 'react-router-dom'

export const SliderBar = ({ activeTab, setActiveTab }) => {
    return (
        <div className="slider-bar">
            <Link to={`/Clientes`}>
                <div
                    className={`slider-item ${activeTab === 'lista' ? 'active' : ''}`}
                    onClick={() => setActiveTab('lista')}
                >
                    Listado Clientes
                </div>
            </Link>
            <Link to={`/CardClient`}>
                <div
                    className={`slider-item ${activeTab === 'all' ? 'active' : ''}`}
                    onClick={() => setActiveTab('all')}
                >
                    Todos los Clientes
                </div>
            </Link>

            <div
                className={`slider-item ${activeTab === 'pending' ? 'active' : ''}`}
                onClick={() => setActiveTab('pending')}
            >
                Clientes Pendientes
            </div>
            <div
                className={`slider-item ${activeTab === 'active' ? 'active' : ''}`}
                onClick={() => setActiveTab('active')}
            >
                Clientes Activos
            </div>
            <div
                className={`slider-item ${activeTab === 'No' ? 'active' : ''}`}
                onClick={() => setActiveTab('No')}
            >
                Clientes  No Habilitados
            </div>
        </div>
    )
}
