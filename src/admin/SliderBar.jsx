import stil from './SliderBar.module.css'
import { Link } from 'react-router-dom'
import { PropTypes } from 'prop-types'


const SliderBar = ({ btnDatos }) => {
	return (
		<div className={stil.contentSliderBar}>
			{btnDatos.map((element) => {
				return(
					<Link
					to={element.url}
					key={element.url}
					className={stil.sliderBtn}>
						{element.name}
					</Link>
				)
			})}
			
		</div>
	)
}


SliderBar.propTypes = {
	btnDatos: PropTypes.arrayOf(
	PropTypes.oneOfType([
		PropTypes.shape({
			url: PropTypes.string,
			name: PropTypes.string
		})
	])).isRequired,
}

export default SliderBar