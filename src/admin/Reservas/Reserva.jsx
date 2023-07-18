import { Routes, Route, useNavigate } from 'react-router-dom';
import { useState } from 'react';
//import '../../Home.css';
import { SliderBar } from '/src/admin/SliderBar.jsx';
import { TableReservas } from './TableReservas';
import { TablePending } from './TablePending'
import { TableConcret } from './TableConcret'

import { InfoReserva } from './InfoReserva'
import { CardsReservas } from './CardsReservas'

import stil from './Reserva.module.css'

export const Reservas = () => {
	const [activeTab, setActiveTab] = useState('lista');

	return (
		<div className={stil.contentReserva}>
			<SliderBar activeTab={activeTab} setActiveTab={setActiveTab} />
			<Routes>
				<Route path='/' element={<TableReservas />} />
				<Route path='/Pendientes' element={<TablePending />} />
        <Route path='/Concretadas' element={<TableConcret />} />
				<Route path='/InfoReserva/:id' element={<InfoReserva />} />
            <Route path='/ReservaCard' element={<CardsReservas />} />
			</Routes>
		</div>
	)
}
