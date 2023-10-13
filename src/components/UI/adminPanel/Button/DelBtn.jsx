import React from "react";
import { useResponseContext } from "../../../../context/responseContext";
import {useNavigate } from "react-router-dom";
import Button from "../../../Button/Widget/Button";
import axios from "axios";
const DelBtn = ({id, token, className}) => {
    const navigate = useNavigate()
    const {response, setResponse} = useResponseContext()
    const deleteFilm = async (e) => {
        e.preventDefault()
        try {
            const res = await axios.post("/movie/delete-film", { id }, {
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": "Bearer " + token
                }
            })
            setResponse(res.data.message)
            setTimeout(() => {
                navigate("/admin-panel/films")
            }, 500)
        } catch (e) {
            setResponse(e.response.data.message)
        }
    }
    return(
        <Button text="Удалить фильм" onClick={(e) => { deleteFilm(e) }} css={className} />
    )
}
export default DelBtn