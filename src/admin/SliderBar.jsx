import stil from './SliderBar.module.css'
import { Link } from 'react-router-dom'
import { BtnReserva } from './data/BtnAdmin'
/**
 * {SidebarData.map((item, index) => {
				return (
					<Link
						className={selected === index ? stil.menuItemActive : stil.menuItem}
						key={index}
						onClick={() => setSelected(index)}
						to={'/Home/' + item.heading}>
						<item.icon />
						<span>{item.heading}</span>
					</Link>
				);
			})}
 */
export const SliderBar = ({ activeTab, setActiveTab }) => {
	return (
		<div className={stil.contentSliderBar}>
			{BtnReserva.map((element) => {
				return(
					<Link
					to={element.url}
					key={element.url}
					onClick={()=> setActiveTab('')}
					className=''>
						{element.name}
					</Link>
				)
			})}
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
