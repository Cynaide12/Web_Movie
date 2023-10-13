import React from 'react'
import Favourites from '../../Button/Widget/Favourites-widget'
const Continue = ({src, title, description}) => {
	return (
		<div className="continue_card-container  card-container">
			<img className="continue_card-img" src={src} draggable={false} />
			<Favourites/>
			<div className="continue_card_text-wrapper card-text">
				<h3 className="card_text-title">{title}</h3>
				<span className="trending_card_text-description">{description}</span>
			</div>
		</div>
	)
}
export default Continue
