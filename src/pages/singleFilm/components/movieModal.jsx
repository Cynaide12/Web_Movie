import React, { useEffect, useRef, useState, useCallback } from "react";
import cs from "./movieModal.module.css"
import ReactPlayer from "react-player";
import Preloader from "../../../components/UI/preloader/Preloader";
import Button from "../../../components/Button/Widget/Button";
const MovieModal = ({ type, video, setModal, setEnded, progressMoving, setIsYtb, id }) => {
    const [isLoading, setIsLoading] = useState(false)
    const [isConfirm, setIsConfirm] = useState(undefined)
    const [duration, setDuration] = useState(undefined)
    console.log(video)
    const hours = Math.floor(progressMoving / 60 / 60);

    const minutes = Math.floor(progressMoving / 60) - (hours * 60);

    const correctedSrc = video.replace(/\\/g, '/');
    const seconds = Math.floor(progressMoving % 60);
    const videoRef = useRef()
    const handleIsConfirm = (boolean) => {
        setIsConfirm(boolean)
        if(!boolean){
            localStorage.removeItem(`progress - ${id}`)
        }
    }
    const stylePlayer = () => {
        if (isLoading) {
            return 'block'
        }
    }
    useEffect(() => {
        if (isLoading && isConfirm && type !== 'yt') {
            videoRef.current.seekTo(progressMoving, 'seconds');
        }
        if ((progressMoving < 240 || ((duration - progressMoving) >= 100)) && type !== 'yt') {
            setIsConfirm(false)
        }
    }, [isLoading, progressMoving, isConfirm]);
    useEffect(() => {
        if (type == 'yt') {
            setIsYtb(true)
        } else {
            setIsYtb(false)
        }
    }, [])
    return (
        <div className={cs.popup} onClick={() => setModal(false)}>
            <div className={cs.popupContainer} style={type === 'yt' ? { height: 'calc(56.25vw - 56.25px)' } : null}>
                {!isLoading && <Preloader className={cs.player_preloader} />}
                <div className={cs.close}>
                    <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="100" height="100" viewBox="0 0 50 50">
                        <path d="M 7.71875 6.28125 L 6.28125 7.71875 L 23.5625 25 L 6.28125 42.28125 L 7.71875 43.71875 L 25 26.4375 L 42.28125 43.71875 L 43.71875 42.28125 L 26.4375 25 L 43.71875 7.71875 L 42.28125 6.28125 L 25 23.5625 Z"></path>
                    </svg>
                </div>
                <div onClick={(e) => e.stopPropagation()} className={cs.player_wrapper}>
                    {(progressMoving > 240 && ((duration - progressMoving) >= 100)) && isConfirm == undefined && type !== 'yt' && isLoading &&
                        <div className={cs.player_confirm}>
                            <h2 className={["page-title", cs.player_confirm_title].join(' ')}>В прошлый раз вы прекратили просмотр на  {hours + ':' + minutes + ':' + seconds}. Продолжить с этого момента?</h2>
                            <div className={cs.player_confirm_div}>
                                <Button text="Да" css={cs.player_confirm_btn} onClick={() => handleIsConfirm(true)} />
                                <Button text="Нет" css={cs.player_confirm_btn} onClick={() => handleIsConfirm(false)} />
                            </div>
                        </div>
                    }
                    <ReactPlayer ref={videoRef} url={correctedSrc} controls={true} playing={isConfirm !== undefined ? true : false} width="100%" height="100%" style={{ display: stylePlayer() }} className={cs.react_player} onReady={(red) => { setIsLoading(true); setDuration(red.player.player.player.duration) }}  onProgress={(prog) => { setEnded(prog.playedSeconds) }} />
                </div>
            </div>
        </div>
    )
}
export default MovieModal