import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { useUserContext } from '../../../context/userContext';
import { useResponseContext } from '../../../context/responseContext';
import { useFilmsDataContext } from '../../../context/apiContext';
import Preloader from '../../UI/preloader/Preloader';
const Favourites = ({ css, filmId }) => {
	const [isActive, setActive] = useState(0);
	const { user } = useUserContext()
	const [id, setId] = useState('')
	const { response, setResponse } = useResponseContext()
	const token = localStorage.getItem("accessToken")
	const [isLoading, setIsLoading] = useState(false)
	const {isUpdateFavoritesState, setIsUpdateFavoritesState} = useFilmsDataContext()
	// useEffect(())
	const getFavorites = async () => {
		try {
			const res = await axios.post("/movie/get-favorites", { id }, {
				headers: {
					"Authorization": "Bearer " + token
				}
			})
			checkFavorites(res.data)
			setIsLoading(true)
		} catch (e) {
			setResponse(e.response.data.message)
		}
	}
	const checkFavorites = (favorites) => {
		favorites.forEach(item => {
			if (item == filmId) {
				setActive(1)
			}
		});
	}
	const addFavorites = async (e) => {
		e.stopPropagation()
		try {
			const res = await axios.post('/movie/add-favorites', { id, filmId }, {
				headers: {
					"Authorization": "Bearer " + token
				}
			});
			setActive(1)
			setIsUpdateFavoritesState(isUpdateFavoritesState + 1)
		} catch (e) {
			console.log(e.response.data.message)
		}
	}
	const delFavorites = async (e) => {
		e.stopPropagation()
		try {
			const res = await axios.post("/movie/del-favorites", { id, filmId }, {
				headers: {
					Authorization: "Bearer " + token
				}
			})
			setActive(0)
			setIsUpdateFavoritesState(isUpdateFavoritesState + 1)
		} catch (e) {
			console.log(e.response.data.message)
		}
	}
	useEffect(() => {
		if (user)
			setId(user._id)
	}, [user])
	useEffect(() => {
		if (id) {
			getFavorites()
		}
	}, [id])
	useEffect(() => {
		if (user && user.message) {
			setIsLoading(true)
		}
	}, [user])
	return (
		<>
			{user && !user.message &&
				<>
					{!isLoading && <button
						className={
							['trending_card-widget card-widget trending_card-preloader',
								(isActive ? 'trending_widget-active ' : ''), css].join(' ')
						}
						onClick={(e) => { isActive == 0 ? addFavorites(e) : delFavorites(e) }}
					>
					</button>}
					{isLoading &&
						<button
							className={
								['trending_card-widget card-widget ',
									(isActive ? 'trending_widget-active ' : ''), css].join(' ')
							}
							onClick={(e) => { isActive == 0 ? addFavorites(e) : delFavorites(e) }}
						>
							<img src={isActive ? '/assets/img/card/unfavourites.svg' : '/assets/img/card/favourites.svg'} />
						</button>}</>
			}
		</>
	)
}
export default Favourites
