import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { useUserContext } from '../../context/userContext'
import { useFilmsDataContext } from '../../context/apiContext'
import { useLocation } from 'react-router-dom'
const ApiFilmsFavorites = () => {
    const token = localStorage.getItem('accessToken')
    const { user, isAuth } = useUserContext()
    const [filmsId, setFilmId] = useState([])
    const { favoritesData, setFavoritesData, setIsFavoritesLoading, isUpdateFavoritesState } = useFilmsDataContext()
    const [id, setId] = useState('')
    const location = useLocation()
    const [prevFavoritesState, setPrevFavoritesState] = useState(isUpdateFavoritesState)
    const getFavoritesId = async () => {
        if(id){
        try {
            const res = await axios.post("/movie/get-favorites", { id },
                {
                    headers: {
                        "Authorization": "Bearer " + token
                    }
                })
            setFilmId(res.data)
        } catch (e) {
            console.log(e.response.data.message)

        }}
    }
    const getFavoritesFilm = async () => {
        try {
            const res = await axios.post("/movie/get-films", { ids: filmsId.length > 0 ? filmsId : ['123'] }, {
                headers: {
                    "Authorization": "Bearer " + token
                }
            })
            setFavoritesData(res.data)
            if(res.data){
            setIsFavoritesLoading(true)}
        } catch (e) {
            console.log(e.response.data.message)
            setIsFavoritesLoading(false)
        }
    }
    useEffect(() => {
        setIsFavoritesLoading(false)
    }, [token])
    useEffect(() => {
        if (user) {
            setId(user._id)
        }
    }, [user])
    useEffect(() => {
        if(location.pathname == '/favorites' || (prevFavoritesState !== isUpdateFavoritesState && location.pathname !== '/favorites')){
            setPrevFavoritesState(isUpdateFavoritesState)
            getFavoritesId()}
    }, [id, location])
    useEffect(() => {
        if (id) {
            getFavoritesFilm();
        }
    }, [filmsId])
    useEffect(() => {
        if(location.pathname !== '/favorites'){
        getFavoritesId()}
    }, [isUpdateFavoritesState])
    return null
}
export default ApiFilmsFavorites