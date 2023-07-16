import { useState } from 'react';
//import '../../Home.css';
import { SliderBar } from './SliderBar';
import { TableReservas } from './TableReservas';

export const Reservas = () => {
    const [activeTab, setActiveTab] = useState('lista');

    return (
        <div className="page-content">
            <div className="home-container">
                <div>
                    <SliderBar activeTab={activeTab} setActiveTab={setActiveTab} />
                </div>
                <div>
                    <TableReservas />
                </div>

            </div>
        </div>
    )
}
