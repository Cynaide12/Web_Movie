import react, { useEffect, useState } from "react";
import cs from "./AddFilm.module.css"
import Button from "../../../../components/Button/Widget/Button";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Link } from "react-router-dom";
import { useResponseContext } from "../../../../context/responseContext";
const AddFilm = () => {
    const [title, setTitle] = useState('')
    const [description, setDescription] = useState('')
    const [category, setCategory] = useState('')
    const [date, setDate] = useState(new Date().toJSON().slice(0, 10))
    const [textareaHeight, setTextareaHeight] = useState('auto');
    const [thumbnail, setThumbnail] = useState('')
    const [mainSlider, setMainSlider] = useState(false)
    const [sliderThumbnail, setSliderThumbnail] = useState('')
    const [trailerSrc, setTrailerSrc] = useState('')
    const [film, setFilm] = useState('')
    const [actors, setActors] = useState('')
    const [today, setToday] = useState(new Date().toJSON().slice(0, 10))
    const { response, setResponse } = useResponseContext()
    const navigate = useNavigate()
    const token = localStorage.getItem("accessToken")
    const addFilm = async (e) => {
        e.preventDefault();
        try {
            const formData = new FormData();
            formData.append('title', title);
            formData.append('description', description);
            formData.append('category', category);
            formData.append('date', date);
            formData.append('thumbnail', thumbnail[0]);
            formData.append('sliderThumbnail', sliderThumbnail[0])
            formData.append('isSlider', mainSlider)
            formData.append('trailer', trailerSrc)
            formData.append('filmSrc', film[0])
            formData.append('actors', actors)
            const res = await axios.post("/movie/add-film", formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    "Authorization": "Bearer " + token
                },
            });
            setResponse(res.data.message)
            if(res.data.message == 'Фильм добавлен'){
            setTimeout(() => {
                navigate("/admin-panel/films")
            }, 500)}
        } catch (e) {
            e.response.data.error ? setResponse(e.response.data.error) : setResponse(e.response.data.message)
        }
    }
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
            <h1>Добавление фильма</h1>
            <div className={cs.changeFilms__container}>
                <form method="post" encType="multipart/form-data" className={cs.form}>
                    <div className={cs.controllerContainer}>
                        <div className={cs.controller}>
                            <span className={cs.controllerTitle}>Название фильма</span>
                            <input type="text" className={cs.input} onChange={(e) => changeState(e.target.value, setTitle)} />
                        </div>
                        <div className={cs.controller}>
                            <span className={cs.controllerTitle}>Категория</span>
                            <input type="text" className={cs.input} onChange={(e) => changeState(e.target.value, setCategory)} />
                        </div>
                        <div className={cs.controller}>
                            <span className={cs.controllerTitle}>Год выхода</span>
                            <input type="text" className={cs.input} onChange={(e) => changeState(e.target.value, setDate)} />
                        </div>
                        <div className={cs.controller}>
                            <span className={cs.controllerTitle}>Актеры</span>
                            <input type="text" className={cs.input} onChange={(e) => changeState(e.target.value, setActors)} />
                        </div>
                        <div className={cs.controller}>
                                <span className={cs.controllerTitle}>Фильм</span>
                                <input type="file" name="filmSrc" accept=".mp4, .mov, .wvw, .avi, .svg" onChange={(e) => (changeState(e.target.files, setFilm))} />
                            </div>
                        <div className={cs.controller}>
                            <span className={cs.controllerTitle}>Трейлер. Код встраивания видео с ютуба</span>
                            <input type="text" className={cs.input} onChange={(e) => changeState(e.target.value, setTrailerSrc)} />
                        </div>
                        <div className={cs.controller}>
                            <span className={cs.controllerTitle}>Миниатюра фильма</span>
                            <input type="file" name="thumbnail" accept=".jpg, .jpeg, .png, .webp, .svg" onChange={(e) => (changeState(e.target.files, setThumbnail))} />
                        </div>
                        <div className={cs.controller}>
                            <span className={cs.controllerTitle}>Вывести в главный слайдер</span>
                            <input type="checkbox" className={[cs.input, cs.checkbox].join(' ')} onChange={(e) => changeState(e.target.checked, setMainSlider)} />
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
                        <textarea className={cs.textEditor} style={{ height: textareaHeight }} onChange={(e) => { changeState(e.target.value, setDescription); adjustTextareaHeight(e.target); }} />
                    </div>
                    <Button type="submit" css={cs.button} text="Сохранить" onClick={(e) => addFilm(e)} />
                </form>
            </div>
        </section>
    )
}
export default AddFilm