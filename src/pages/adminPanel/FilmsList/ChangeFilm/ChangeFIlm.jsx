import react, { useEffect, useState, useRef } from "react";
import cs from "./ChangeFilms.module.css"
import { useParams } from "react-router-dom";
import axios from "axios";
import { Link } from "react-router-dom";
import { useResponseContext } from "../../../../context/responseContext";
import DelBtn from "../../../../components/UI/adminPanel/Button/DelBtn";
import SaveFilm from "../../../../components/UI/adminPanel/Button/SaveFilm";
const ChangeFilm = () => {
    const [filmData, setData] = useState('')
    const [title, setTitle] = useState('')
    const [description, setDescription] = useState('')
    const [category, setCategory] = useState('')
    const [date, setDate] = useState()
    const { id } = useParams()
    const [textareaHeight, setTextareaHeight] = useState('auto');
    const [thumbnail, setThumbnail] = useState([])
    const [mainSlider, setMainSlider] = useState(undefined)
    const [sliderThumbnail, setSliderThumbnail] = useState('')
    const { response, setResponse } = useResponseContext()
    const [seeThumbnail, setSeeThumbnail] = useState('')
    const [trailerSrc, setTrailerSrc] = useState('')
    const [film, setFilm] = useState('')
    const [actors, setActors] = useState('')
    const checkboxChecked = useRef()
    const textarea = useRef()
    const token = localStorage.getItem("accessToken")
    const getFilm = async () => {
        try {
            const res = await axios.post("/movie/get-film", { id })
            if (res.data) {
                setData(res.data)
                setTitle(res.data.title)
                setCategory(res.data.category)
                setDescription(res.data.description)
                setDate(res.data.date)
                setThumbnail(res.data.thumbnail.split('src')[1])
                console.log(res.data.thumbnail.split('src')[1])
                setSeeThumbnail(res.data.thumbnail.split('src')[1])
                setSliderThumbnail(res.data.sliderThumbnail)
                setMainSlider(res.data.isSlider)
                setTrailerSrc(res.data.trailer)
                setFilm(res.data.filmSrc)
                setActors(res.data.actors)
            }
            console.log(res.data)
        } catch (e) {
            setResponse(e.response.data.message)
        }
    }
    useEffect(() => { getFilm() }, [id])
    useEffect(() => {
        getFilm()
    }, [response])
    const changeState = (e, setElem) => {
        setElem(e);
    }
    const adjustTextareaHeight = (element) => {
        element.style.height = 'auto';
        element.style.height = element.scrollHeight + 'px';
    };
    return (
        <section className={["sectionAdmin", cs.changeFilm].join(' ')}>
            <Link to="/admin-panel/films" className={cs.back}>
                <svg className={cs.arrowLeft} viewBox="0 0 9 14">
                    <path className={cs.svgArrow} d="M6.660,8.922 L6.660,8.922 L2.350,13.408 L0.503,11.486 L4.813,7.000 L0.503,2.515 L2.350,0.592 L8.507,7.000 L6.660,8.922 Z" />
                </svg>
            </Link>
            <h1>Редактирование фильма</h1>
            <DelBtn id={id} className={cs.addFilm__link} token={token} />
            <div className={cs.changeFilms__container}>
                {mainSlider !== undefined &&
                    <form method="post" className={cs.form} encType="multipart/form-data">
                        <div className={cs.controllerContainer}>
                            <div className={cs.controller}>
                                <span className={cs.controllerTitle}>Название фильма</span>
                                <input type="text" className={cs.input} defaultValue={title} onChange={(e) => changeState(e.target.value, setTitle)} />
                            </div>
                            <div className={cs.controller}>
                                <span className={cs.controllerTitle}>Категория</span>
                                <input type="text" className={cs.input} defaultValue={category} onChange={(e) => changeState(e.target.value, setCategory)} />
                            </div>
                            <div className={cs.controller}>
                                <span className={cs.controllerTitle}>Год выхода</span>
                                <input type="text" className={cs.input} defaultValue={date} onChange={(e) => changeState(e.target.value, setDate)} />
                            </div>
                            <div className={cs.controller}>
                                <span className={cs.controllerTitle}>Актеры</span>
                                <input type="text" className={cs.input} defaultValue={actors} onChange={(e) => changeState(e.target.value, setActors)} />
                            </div>
                            <div className={cs.controller}>
                                <span className={cs.controllerTitle}>Фильм</span>
                                <input type="file" name="filmSrc" accept=".mp4, .mov, .wvw, .avi, .flv" onChange={(e) => (changeState(e.target.files, setFilm))} />
                            </div>
                            <div className={cs.controller}>
                                <span className={cs.controllerTitle}>Трейлер. Код встраивания видео с ютуба</span>
                                <input type="text" className={cs.input} defaultValue={trailerSrc} onChange={(e) => changeState(e.target.value, setTrailerSrc)} />
                            </div>
                            <div className={cs.controller}>
                                <span className={cs.controllerTitle}>Миниатюра фильма <br /></span>
                                {seeThumbnail &&
                                    <img className={cs.thumbnail} src={`${seeThumbnail}`} alt='Миниатюра фильма' />}
                                <input type="file" name="thumbnail" accept=".jpg, .jpeg, .png, .webp, .svg" onChange={(e) => (changeState(e.target.files, setThumbnail))} />
                                <strong className={cs.warning}>поддерживаются jpg, png, svg, webp форматы</strong>
                            </div>
                            <div className={cs.controller}>
                                <span className={cs.controllerTitle}>Вывести в главный слайдер</span>
                                <input type="checkbox" ref={checkboxChecked} defaultChecked={mainSlider} className={[cs.input, cs.checkbox].join(' ')} onChange={(e) => { setMainSlider(e.target.checked) }} />
                            </div>
                            {mainSlider &&
                                <div className={cs.controller}>
                                    <span className={cs.controllerTitle}>Изображение в слайдер</span>
                                    <input type="file" name="sliderThumbnail" accept=".jpg, .jpeg, .png, .webp, .svg" onChange={(e) => (changeState(e.target.files, setSliderThumbnail))} />
                                </div>
                            }
                        </div>
                        <div className={cs.controller}>
                            <span className={cs.controllerTitle}>Описание</span>
                            <textarea className={cs.textEditor} defaultValue={description} style={{ height: textareaHeight }} ref={textarea} onChange={(e) => { changeState(e.target.value, setDescription); adjustTextareaHeight(e.target); }} />
                        </div>
                        <SaveFilm id={id} title={title} description={description} thumbnail={thumbnail[0]} date={date} category={category} sliderThumbnail={sliderThumbnail[0]} mainSlider={mainSlider} token={token} className={cs.button} setMainSlider={() => setMainSlider()} trailerSrc={trailerSrc} actors={actors} filmSrc={film[0]} />
                    </form>
                }
            </div>
        </section>
    )
}
export default ChangeFilm