import react from "react";
const Burger = ({ onClick, isActive }) => {

    return (
        isActive ? <svg onClick={onClick} className='aside_nav_burgerMenu aside_nav_burgerMenu-open' viewBox="0 0 100 100" width="40" height="40">
            <line x1="0" y1="0" x2="100" y2="100" stroke="black" strokeWidth="10" />
            <line x1="0" y1="100" x2="100" y2="0" stroke="black" strokeWidth="10" />
        </svg> : <svg onClick={onClick} className='aside_nav_burgerMenu aside_nav_burgerMenu-open' viewBox="0 0 100 80" width="40" height="40">
            <rect width="100" height="20"></rect>
            <rect y="30" width="100" height="20"></rect>
            <rect y="60" width="100" height="20"></rect>
        </svg>
    )

}
export default Burger