import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { useResponseContext } from "../../context/responseContext";
import "../../style/scss/SingleFilm.scss"
import Button from "../../components/Button/Widget/Button"
import Favourites from "../../components/Button/Widget/Favourites-widget";
import ItemList from "./components/itemList";
import Preloader from "../../components/UI/preloader/Preloader";
import MovieModal from "./components/movieModal";
import { useNavigate } from "react-router-dom";
const SingleFilm = () => {
    const { id } = useParams()
    const [data, setData] = useState(null)
    const [thumbnail, setThumbnail] = useState('')
    const { response, setResponse } = useResponseContext()
    const [type, setType] = useState('')
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [isYtb, setIsYtb] = useState(false)
    const [video, setVideo] = useState('')
    const [ended, setEnded] = useState(localStorage.getItem(`progress - ${id}`))
    const [progressMoving, setProgressMoving] = useState(localStorage.getItem(`progress - ${id}`))
    const navigate = useNavigate()
    const getFilm = async () => {
        try {
            const res = await axios.post("/movie/get-film", { id })
            if (res.data) {
                setData(res.data)
                setThumbnail(res.data.thumbnail.split('src')[1])
            }
            else {
                navigate("/home")
            }
        } catch (e) {
            setResponse(e.response.data.message)
            console.log(e.response.data)
        }
    }
    const handleModalState = (src, type) => {
        setIsModalOpen(true);
        setVideo(src)
        setType(type)
    }
    useEffect(() => {
        getFilm()
    }, [])
    useEffect(() => {
        if (!isModalOpen && !isYtb) {
            if (ended > 0) {
                localStorage.setItem(`progress - ${id}`, ended)
            }
        }
    }, [isModalOpen])
    useEffect(() => {
        if (!isModalOpen && !isYtb) {
            setProgressMoving(localStorage.getItem(`progress - ${id}`))
        }
    }, 
    [ended, isModalOpen])
    return (
        <>
            {isModalOpen && data &&
                <MovieModal video={video} type={type} setModal={() => setIsModalOpen()} setEnded={setEnded} progressMoving={progressMoving} setIsYtb={setIsYtb} />
            }
            <div className="content singleFilm__content">
                {!data ? <Preloader /> : <><div className="container singleFilm__headerContainer">
                    <div className="headerContainer__thumbnailContainer">
                        <img src={thumbnail} alt='thumbnail' className="headerContainer__thumbnail" />
                    </div>
                    <div className="headerContainer__filmDescription">
                        <h1 className="headerContainer__title">{data.title}<span>({data.date})</span></h1>
                        <div className="headerContainer__serviceContainer">
                            <Button text='Смотреть' css="headerContainer__play" onClick={() => handleModalState(data.filmSrc.split('src')[1])} />
                            <Button text="Смотреть трейлер" css="headerContainer__play" onClick={() => handleModalState(data.trailer, 'yt')} />
                            <Favourites css='headerContainer__favourites' filmId={data._id} />
                        </div>
                        <h2 className="page-title">О фильме</h2>
                        <ul className="headerContainer__descriptionList">
                            <ItemList text='Дата выхода' attribute={data.date} />
                            <ItemList text='Страна' attribute={data.country} />
                            <ItemList text='Актеры' attribute={data.actors} />
                            <ItemList text='Жанр' attribute={data.category} />
                        </ul>
                    </div>
                </div>
                    <div className="container singleFilm__filmDescription__container">
                        <h2 className="page-title">Описание</h2>
                        <div className="filmDescription__description">{data.description}</div>
                    </div></>}
            </div>
        </>
    )
}
export default SingleFilm