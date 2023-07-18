import stil from './SliderBar.module.css'
import { Link } from 'react-router-dom'
import { BtnReserva } from './data/BtnAdmin'

export const SliderBar = ({ activeTab, setActiveTab }) => {
	return (
		<div className={stil.contentSliderBar}>
			{BtnReserva.map((element) => {
				return(
					<Link
					to={element.url}
					key={element.url}
					onClick={()=> setActiveTab('')}
					className={stil.sliderBtn}>
						{element.name}
					</Link>
				)
			})}
			
		</div>
	)
}
