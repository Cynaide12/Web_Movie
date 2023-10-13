import react, { useEffect, useState } from "react";
import { Table, Item, Thead, Rows, Tbody, cs } from '../../../components/UI/Table/store';
import "../../../style/scss/FilmsList.scss"
import { Link } from "react-router-dom";
import axios from "axios";
import Button from "../../../components/Button/Widget/Button";
import { useNavigate } from "react-router-dom";
import { useResponseContext } from "../../../context/responseContext";
const FilmsList = () => {
    const [filmsData, setFilmsData] = useState([]);
    const [activeMenuItems, setActiveMenuItems] = useState(new Array(filmsData.length).fill(false));
    const token = localStorage.getItem("accessToken");
    const navigate = useNavigate()
    const [isUpdateList, setUpdateList] = useState(false)
    const { response, setResponse } = useResponseContext()
    const closeOnParentClick = (e) => {
        if (!e.target.classList.contains("toggleMenu__headerWrapper")) {
            setActiveMenuItems(new Array(filmsData.length).fill(false));
        }
    };
    const fetchFilmsData = async () => {
        try {
            const res = await axios.get("/movie/films", {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: "Bearer " + token,
                },
            });
            setFilmsData(res.data);
            setActiveMenuItems(new Array(res.data.length).fill(false));
        } catch (e) {
            console.error("Error sending request:", e.response.data.message);
        }
    };

    const toggleMenu = (index) => {
        setActiveMenuItems((prevItems) =>
            prevItems.map((item, i) => (i === index ? !item : false)
            )
        );
    };
    const deleteFilm = async (e, id) => {
        e.preventDefault()
        try {
            const res = await axios.post("/movie/delete-film", { id }, {
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": "Bearer " + token
                }
            })
            setUpdateList(true)
            setResponse(res.data.message)
            localStorage.removeItem(`progress - ${id}`)
        } catch (e) {
            setResponse(e.response.data.message)
        }
    }
    useEffect(() => {
        fetchFilmsData();
        setUpdateList(false)
    }, [token, isUpdateList]);

    return (
        <div className="sectionAdmin filmsList" onClick={(e) => closeOnParentClick(e)}>
            <h1>Фильмы</h1>
            <Link to="add-film" className="addFilm__link">
                <Button text="Добавить фильм" />
            </Link>
            <Table>
                <Thead>
                    <Rows className="filmsList__tableHead">
                        <Item type="th">Заголовок</Item>
                        <Item type="th">Категория</Item>
                        <Item type="th">Дата публикации</Item>
                        <Item type="th">Действия</Item>
                    </Rows>
                </Thead>
                <Tbody>
                    {filmsData.map((item, index) => {
                        const category = item.category.join(', ')
                        return (
                            <Rows key={item._id} className={'filmsList__rows'}>
                                <Item>{item.title}</Item>
                                <Item>{category}</Item>
                                <Item>{item.addedDate || "null"}</Item>
                                <Item>
                                    <div className={["toggleMenu", activeMenuItems[index] ? "toggleMenu-active" : ''].join(' ')}>
                                        <div className="toggleMenu__headerWrapper" onClick={() => toggleMenu(index)}>
                                            Действия

                                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={[
                                                "filmsList__menuIcon",
                                                activeMenuItems[index]
                                                    ? "filmsList__menuIcon-active"
                                                    : "",
                                            ].join(" ")}>
                                                <path d="M5 10l7 7 7-7"></path>
                                            </svg>

                                        </div>

                                        <>
                                            <div className="toggleMenu__bodyWrapper">
                                                <Link className="toggleMenu__item toggleMenu__itemSelect" onClick={(e) => { deleteFilm(e, item._id) }}>
                                                    Удалить
                                                </Link>
                                                <Link className="toggleMenu__item toggleMenu__itemSelect" to={`change-film/${item._id}`}>
                                                    Изменить
                                                </Link>
                                            </div>
                                        </>

                                    </div>
                                </Item>
                            </Rows>
                        )
                    })}
                </Tbody>
            </Table>
        </div>
    );
};
export default FilmsList;


