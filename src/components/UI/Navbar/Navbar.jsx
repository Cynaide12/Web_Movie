import React, { useContext, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { useWidgetContext } from '../../../context/widgetContext'
import Burger from '../adminPanel/Button/Burger'
import { useUserContext } from '../../../context/userContext'
import { useOtherContext } from '../../../context/otherContext'
const Navbar = () => {
	const { activeWidget, setActiveWidget } = useWidgetContext()
	const [activeMenu, setActiveMenu] = useState(false)
	const [burgerSrc, setBurgerSrc] = useState('../../..//assets/img/widget/burger-menu-svgrepo-com.svg')
	const token = localStorage.getItem("accessToken")
	const { isAuth, user, setUser, setIsAuth, isRequest, setIsRequest } = useUserContext()
	const {location} = useOtherContext()
	function handleWidget(widget) {
		setActiveWidget(widget);
		setActiveMenu(false)
	}
	const setMenu = () => {
		setActiveMenu(!activeMenu)
		activeMenu ? setBurgerSrc('../../..//assets/img/widget/burger-menu-svgrepo-com.svg') : setBurgerSrc('')
	}
	const logout = () => {
		localStorage.removeItem("accessToken")
		setUser(undefined)
		setIsAuth(false)
	}
	const checkPage = () => {
		handleWidget(location.split("/")[1])
	}
	useEffect(() => {
		checkPage()
	}, [])
	return (
		<>
			<Burger
				onClick={() => setMenu()}
				isActive={activeMenu}
			/>
			<aside className={`aside_nav ${activeMenu ? 'responsiveMenu-open' : ''}`}>
				<Link className="logo" to='/home' onClick={() => { handleWidget('home') }}>
					<img alt="watch" src="/assets/img/login/watch.png" />
				</Link>
				<div className='aside_nav__container'>
					<div className="aside_nav_widget-container">
						<ul>
							<li className={`aside_nav_widget ${activeWidget === 'home' ? 'aside_active' : ''}`}>
								<Link to="/home" onClick={() => handleWidget('home')}>
									<img
										src="/assets/img/home/film.png"
										className="aside_nav_widget-marker"
									/>
									Главная
								</Link>
							</li>
							<li className={`aside_nav_widget ${activeWidget === 'favorites' ? 'aside_active' : ''}`}>
								<Link to="/favorites" onClick={() => handleWidget('favorites')}>
									<img
										src="/assets/img/home/Vector.png"
										className="aside_nav_widget-marker"
									/>
									Избранное
								</Link>
							</li>
							<li className={`aside_nav_widget ${activeWidget === 'trending' ? 'aside_active' : ''}`}>
								<Link to="/trending" onClick={() => handleWidget('trending')}>
									<img
										src="/assets/img/home/trending-up.png"
										className="aside_nav_widget-marker"
									/>
									В тренде
								</Link>
							</li>
						</ul>
						<ul>
							{token && (
								<li className={`aside_nav_widget ${activeWidget === 'logout' ? 'aside_active' : ''}`}>
									<Link onClick={logout} to="/login">
										<img
											src="/assets/img/home/log-out.png"
											className="aside_nav_widget-marker"
										/>
										Выйти
									</Link>
								</li>
							)}

							{!token && (<li className={`aside_nav_widget ${activeWidget === 'login' ? 'aside_active' : ''}`}>
								<Link to="/login">
									<img
										src="/assets/img/home/log-out.png"
										className="aside_nav_widget-marker"
									/>
									Авторизоваться
								</Link>
							</li>)}
						</ul>
					</div>
				</div>
			</aside>
			<div className="menu_header-nav">
				<ul className="menu_header_nav-widget">

					{/* {isAuth &&
						<>
							<li>
								<img src="/assets/img/widget/search.png" />
							</li>
							<li>
								<img src="/assets/img/widget/bell.png" />
							</li>
						</>
					} */}
					{isRequest == true && user &&
						<li>
							<Link to='/user-page' className='user-link menu_header_nav_widget-user'>
								<img src={user ? "/assets/img/main/5a89be7fade1e7fe15096b085913e123.webp" : "/assets/img/widget/user-notAuth.png"} /> {user.username}
							</Link>
						</li>

					}
				</ul>
			</div >
		</>
	)
}
export default Navbar
