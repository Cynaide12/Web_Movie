import React, { useEffect, useState } from 'react'
import '../style/scss/main.scss'
import FilmList from '../components/UI/cardList/cardList'
import Trending from '../components/UI/card/Trending_card'
import MainSlider from '../components/UI/Slider/MainSlider'
import CenterCard from '../components/UI/card/Center_card'
import { useUserContext } from '../context/userContext'
import { useFilmsDataContext } from '../context/apiContext'
const Home = () => {
	const { user } = useUserContext()
	const { filmsData, filmsDataByCategories } = useFilmsDataContext()
	return (
		<>
			<div className="content home-content">
				{filmsData && filmsData.length > 0 ?
					<MainSlider>
						{filmsData.map((item) => {
							return (
								<CenterCard
									key={item._id}
									src={item.sliderThumbnail.split('src')[1]}
									title={item.title}
									date={item.date}
									category={item.category}
									isSlider={item.isSlider}
									id={item._id}
								/>
							)
						})}
					</MainSlider>
					: <MainSlider isPreloader={true} />
				}
				{filmsDataByCategories && filmsDataByCategories.length > 0 ?
					filmsDataByCategories.map((part) => {
						return (
							<FilmList title={part._id} key={part._id}>
								{part.films.map((item) => {
									return (
										<Trending
											key={item._id}
											src={item.thumbnail.split('src')[1]}
											title={item.title}
											description={item.category}
											date={item.date}
											id={item._id}
										/>
									)
								})}
							</FilmList>)
					}) : <FilmList isPreloader={true} />
				}
			</div>
		</>
	)
}
export default Home
