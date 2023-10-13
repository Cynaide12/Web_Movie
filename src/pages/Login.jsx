import React, { useState } from "react";
import "../style/scss/login.scss";
import { Link } from "react-router-dom";
import Authorization from "../components/UI/form/Authorization/Authorization";
import Registration from "../components/UI/form/Registration/Registration";
import { useUserContext } from "../context/userContext";
const Login = () => {
  const [isShowAuth, setShowAuth] = useState(false)
  const [result, setResult] = useState('')
  const {setUser, setIsAuth } = useUserContext()
  
  function handleChangeShow(popup, setShow, show) {
    setShow(!show)
    setResult(popup)
  }
  const logout = () => {
		localStorage.removeItem("accessToken")
		setUser(undefined)
		setIsAuth(false)
	}
  return (
    <>

      <div className="login">
        {isShowAuth ? result : (
          <div className="login-form">
            <img alt="watch" src='/assets/img/login/watch.png' />
            <p className='login-form__title login-form__text'>Наслаждайтесь лучшими фильмами</p>
            <button className="login-form__button" onClick={() => handleChangeShow(<Authorization onClick={() => setShowAuth(false)}/>, setShowAuth, isShowAuth)}>Войти</button>
            <p className="login-form__description">
              Нет аккаунта? <Link onClick={() => handleChangeShow(<Registration onClick={() => setShowAuth(false)}/>, setShowAuth, isShowAuth)}>Регистрация</Link><br/> или войти как <Link to='/home' onClick={logout}> Гость</Link>
            </p>
          </div>)
        }
      </div>
    </>
  );
};
export default Login;
