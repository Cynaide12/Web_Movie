import React, { useEffect, useState } from "react";
import Button from "../../../Button/Widget/Button";
import { useResponseContext } from "../../../../context/responseContext";
import axios from "axios";
const SaveFilm = (props) => {
    const { response, setResponse } = useResponseContext()
    const { setUploadProgress, setMainSlider } = props
    const saveFilm = async (e) => {
        e.preventDefault();
        try {
            const formData = new FormData();
            formData.append('id', props.id);
            formData.append('title', props.title);
            formData.append('description', props.description);
            formData.append('category', props.category);
            formData.append('date', props.date);
            formData.append('thumbnail', props.thumbnail);
            formData.append('trailer', props.trailerSrc)
            formData.append('filmSrc', props.filmSrc)
            formData.append('actors', props.actors)
            formData.append('country', props.country)
            if (props.sliderThumbnail !== undefined || props.sliderThumbnail !== '/') {
                formData.append('sliderThumbnail', props.sliderThumbnail)
            }
            formData.append('isSlider', props.mainSlider)
            const res = await axios.post("/movie/change-film", formData, {
                headers: {
                    "Authorization": "Bearer " + props.token,
                },
                onUploadProgress: (progressEvent) => {
                    const progress = Math.round((progressEvent.loaded / progressEvent.total) * 100);
                    setUploadProgress(progress);
                },
            });
            setResponse(res.data.message);
            setUploadProgress(0);
        } catch (e) {
            e.response.data.error ? setResponse(e.response.data.error) : setResponse(e.response.data.message)
            setMainSlider(false)
        }
    }
    return (
        <Button type="submit" css={props.className} dis={props.uploadProgress > 0 && props.uploadProgress < 100} text="Сохранить" onClick={(e) => saveFilm(e)} />
    )
}
export default SaveFilm