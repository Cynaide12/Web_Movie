import React, { useEffect, useState } from "react";
import axios from "axios";
import Button from "../../../Button/Widget/Button";
import cs from './Authorization.module.css';
import { useNavigate } from "react-router-dom";

const Authorization = ({ onClick }) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [isUsernameValid, setUsernameValid] = useState(true);
    const [isPasswordValid, setPasswordValid] = useState(true);
    const [isShowWarning, setShowWarning] = useState(false);
    const [message, setMessage] = useState('')
    const navigate = useNavigate()
    const validateInput = (input, minLength) => {
        return input.length >= minLength;
    }
    useEffect(() => { }, [])
    const handleSubmit = async (e) => {
        e.preventDefault();
        const isUsernameValid = validateInput(username, 1);
        const isPasswordValid = validateInput(password, 1);

        if (isUsernameValid && isPasswordValid) {
            try {
                const res = await axios.post('/auth/login', { username, password });
                localStorage.setItem("accessToken", res.data.token)
                setMessage('')
                setTimeout(() => { navigate("/home") }, 1)

            } catch (e) {
                setMessage(e.response.data.message)
            }
            setUsernameValid(true);
            setPasswordValid(true);
            setShowWarning(false);
        } else {
            setShowWarning(true);
            setUsernameValid(isUsernameValid);
            setPasswordValid(isPasswordValid);
        }
    }

    return (
        <>
            <div className={cs.auth__container}>
                <div className={cs.auth__formWrapper}>
                    <div className={`logo ${cs.logoCenter}`}>
                        <img alt="watch" src="../../../../assets/img/login/watch.png" />
                    </div>
                    <svg className={cs.auth__close} viewBox="0 0 100 100" width="40" height="40" onClick={onClick}>
                        <line x1="0" y1="0" x2="100" y2="100" stroke="black" strokeWidth="10" />
                        <line x1="0" y1="100" x2="100" y2="0" stroke="black" strokeWidth="10" />
                    </svg>
                    <form className={cs.auth__form} onSubmit={handleSubmit}>
                        <label>
                            {isShowWarning && !isUsernameValid && (
                                <p className={cs.form__warningMessage}>Вы не указали логин</p>
                            )}
                            <input
                                className={`auth-control ${cs.auth__input}`}
                                placeholder="Login"
                                autoComplete="on"
                                onChange={(e) => setUsername(e.target.value)}
                            />
                        </label>
                        <label>
                            {isShowWarning && !isPasswordValid && (
                                <p className={cs.form__warningMessage}>Вы не указали пароль</p>
                            )}
                            <input
                                className={`auth-control ${cs.auth__input}`}
                                placeholder="Password"
                                type='password'
                                autoComplete="on"
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </label>
                        <label>
                            <Button text='Войти' css={`${cs.auth__submit} js-send-request`} type='submit' />
                        </label>
                    </form>
                    {!isShowWarning &&
                        <p className={cs.form__sendResult}>{message}</p>}
                </div>
            </div>
        </>
    )
}

export default Authorization;
