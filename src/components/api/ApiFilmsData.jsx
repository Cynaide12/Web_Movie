import React, { useEffect, useState } from "react";
import { useFilmsDataContext } from "../../context/apiContext";
import axios from "axios";
const ApiFilmsData = () => {
    const { setFilmsData, setFilmsDataByCategories } = useFilmsDataContext()
    const fetchFilmsData = async () => {
        try {
            const res = await axios.get("/movie/films", {
            });
            setFilmsData(res.data)
        } catch (e) {
            console.error("Error sending request:", e.response.data.message);
        }
    };
    const fetchByCategory = async () => {
        try {
            const res = await axios.get("/movie/get-filmsByCategories", {})
            setFilmsDataByCategories(res.data);

        } catch (e) {
            console.log(e.response.data.message)
        }
    }
    useEffect(() => {
        fetchFilmsData()
        fetchByCategory()
    }, [])
    return null
}
export default ApiFilmsData