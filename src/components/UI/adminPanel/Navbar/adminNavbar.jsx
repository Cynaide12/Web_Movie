import React, { useEffect, useState } from "react";
import cs from './adminNavbar.module.css'
import { Link, useNavigate } from "react-router-dom";
import Burger from "../Button/Burger";
import '../../../../style/scss/AdminPanel.scss'
import { useUserContext } from "../../../../context/userContext";
const AdminNavbar = ({ }) => {
    const [activeMenu, setActiveMenu] = useState(false)
    const { isAdmin } = useUserContext()
    const [burgerSrc, setBurgerSrc] = useState('../../../assets/img/widget/burger-menu-svgrepo-com.svg')
    const setMenu = () => {
        setActiveMenu(!activeMenu)
        activeMenu ? setBurgerSrc('../../../assets/img/widget/burger-menu-svgrepo-com.svg') : setBurgerSrc('')
    }
    const navigate = useNavigate()
    if(isAdmin == false){
        navigate('/home')
    }
    return (
        <>
            {isAdmin && <>
                <Burger
                    onClick={() => setMenu()}
                    isActive={activeMenu}
                />
                <div className={`${cs.aside__nav} ${activeMenu ? cs.responsiveMenu_open : ''}`}>
                    <div className={cs.logo__container}>
                        <Link className={`${cs.logo__wrapper} logo`} to='/home'>
                            <img src="../../../../assets/img/login/watch.png" className={cs.logo}></img>
                        </Link>
                        <div className={cs.aside__nav__linkWrapper}>
                            <div className={cs.aside__nav__linkContainer}>
                                <li>
                                    <Link to='/admin-panel/users' onClick={() => setActiveMenu(false)}><img className={cs.aside__nav__icon} src="../../../../assets/img/widget/multiple-users.png" />Пользователи</Link>
                                </li>
                                <li>
                                    <Link to='/admin-panel/films' onClick={() => setActiveMenu(false)}><img className={cs.aside__nav__icon} src="/assets/img/favicon.png"/>Фильмы</Link>
                                </li>
                            </div>
                        </div>
                    </div>
                </div></>}
        </>
    )
}
export default AdminNavbar