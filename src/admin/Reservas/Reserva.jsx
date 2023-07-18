import { useState } from 'react';
//import '../../Home.css';
import { SliderBar } from '/src/admin/SliderBar.jsx';
import { TableReservas } from './TableReservas';

import stil from './Reserva.module.css'

export const Reservas = () => {
	const [activeTab, setActiveTab] = useState('lista');

	return (
		<div className={stil.contentReserva}>
			<SliderBar activeTab={activeTab} setActiveTab={setActiveTab} />
			
			<TableReservas />
		</div>
	)
}
