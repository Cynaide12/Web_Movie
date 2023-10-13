import React, { useEffect, useState } from 'react'
import '../style/scss/favourites.scss'
import '../style/scss/main.scss'
import TrendingList from '../components/UI/cardList/cardList'
import Trending from '../components/UI/card/Trending_card'
import { useFilmsDataContext } from '../context/apiContext'
import { useUserContext } from '../context/userContext'
const Favourites = () => {
	const { favoritesData, isFavoritesLoading } = useFilmsDataContext()
	const {user, isAuth, isRequest	} = useUserContext()
	return (
		<>
			<div className="content">
				{!user && !isAuth && isRequest && <TrendingList title="Избранное" preloaderText="Авторизируйтесь, чтобы добавлять фильмы в избранное" isPreloader={true} />}
				{isFavoritesLoading == false && user && <TrendingList title='Избранное' isPreloader={true} />}
				{isFavoritesLoading == true && (favoritesData.length == undefined || favoritesData.length == 0) && isAuth &&
					<TrendingList title='Избранное' isPreloader={true} preloaderText='Ничего нет.' />
				}
				{favoritesData.length > 0 &&
					<TrendingList title="Избранное" css="favourites">
						{favoritesData.map((item) => {
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
					</TrendingList>}
			</div>
		</>

	)
}
export default Favourites
