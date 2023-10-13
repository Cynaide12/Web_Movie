import react, { useState } from "react";
import cs from './Registration.module.css'
import axios from "axios";
import Button from "../../../Button/Widget/Button";
import { useNavigate } from "react-router-dom";
const Registration = ({ onClick }) => {
    const [email, setEmail] = useState('')
    const [firstname, setName] = useState('');
    const [lastname, setLastName] = useState('');
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [isUsernameValid, setUsernameValid] = useState(true);
    const [isPasswordValid, setPasswordValid] = useState(true);
    const [isShowWarning, setShowWarning] = useState(false);
    const [isEmailValid, setEmailValid] = useState(true);
    const [message, setMessage] = useState('')
    const [messageStyle, setMessageStyle] = useState(cs.warning)
    const navigate = useNavigate()
    const EMAIL_REGEXP = /^(([^<>()[\].,;:\s@"]+(\.[^<>()[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/iu;
    const validateInput = (input, check) => {
        return input.length >= check || EMAIL_REGEXP.test(input);
    }
    const handleSubmit = async (e) => {
        e.preventDefault();
        const isUsernameValid = validateInput(username, 1);
        const isPasswordValid = validateInput(password, 4);
        const isEmailValid = validateInput(email, EMAIL_REGEXP)
        if (isUsernameValid && isPasswordValid && isEmailValid) {
            try {
                const res = await axios.post('/auth/registration', { email, firstname, lastname, username, password });
                setMessage(res.data.message)
                setMessageStyle(cs.request)
                navigate("/home")
                localStorage.setItem("accessToken", res.data.token)
            } catch (e) {
                console.error("Error sending request:", e.response.data.message);
                setMessage(e.response.data.message)
                setMessageStyle(cs.warning)
            }
            setUsernameValid(true);
            setPasswordValid(true);
            setEmailValid(true);
            setShowWarning(false);
        } else {
            setShowWarning(true);
            setUsernameValid(isUsernameValid);
            setPasswordValid(isPasswordValid);
            setEmailValid(isEmailValid);
        }
    }
    return (
        <>
            <div className={cs.reg__container}>
                <div className={cs.reg__formWrapper}>
                    <div className={`logo ${cs.logoCenter}`}>
                        <img alt="watch" src="../../../../assets/img/login/watch.png" />
                    </div>
                    <svg className={cs.reg__close} viewBox="0 0 100 100" width="40" height="40" onClick={onClick}>
                        <line x1="0" y1="0" x2="100" y2="100" stroke="black" strokeWidth="10" />
                        <line x1="0" y1="100" x2="100" y2="0" stroke="black" strokeWidth="10" />
                    </svg>
                    <form className={cs.reg__form} onSubmit={handleSubmit}>
                        <label>
                        {isShowWarning && !isEmailValid && (
                                <p className={cs.form__warningMessage}>Вы не указали электронную почту</p>
                            )}
                            <input className={`auth-control ${cs.reg__input}`} placeholder="E-mail"  autoComplete="on" onChange={(e) => setEmail(e.target.value)}></input>
                        </label>
                        <label>
                            <input className={`auth-control ${cs.reg__input}`} placeholder="Имя" onChange={(e) => setName(e.target.value)}></input>
                        </label>
                        <label>
                            <input className={`auth-control ${cs.reg__input}`} placeholder="Фамилия" onChange={(e) => setLastName(e.target.value)}></input>
                        </label>
                        <label>
                            {isShowWarning && !isUsernameValid && (
                                <p className={cs.form__warningMessage}>Вы не указали логин</p>
                            )}
                            <input className={`auth-control ${cs.reg__input}`} placeholder="Логин" autoComplete="on" onChange={(e) => setUsername(e.target.value)}></input>
                        </label>
                        <label>
                            {isShowWarning && !isPasswordValid && (
                                <p className={cs.form__warningMessage}>Пароль должен быть не менее 4 символов</p>
                            )}
                                
                            <input className={`auth-control ${cs.reg__input}`} placeholder="Пароль" type='password' autoComplete="on" onChange={(e) => setPassword(e.target.value)}></input>
                        </label>
                        <label>
                            <Button text='Зарегистрироваться' css={`${cs.reg__submit} js-send-request`} type='submit'></Button>
                        </label>
                    </form>
                    {!isShowWarning &&
                    <p className={cs.form__sendResult + ' ' + messageStyle}>{message}</p>}
                </div>
            </div>
        </>
    )
}
export default Registration;