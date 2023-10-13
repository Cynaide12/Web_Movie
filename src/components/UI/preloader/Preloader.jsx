import React from "react";
import cs from './Preloader.module.css'
const Preloader = ({ className }) => {
    return (
        <div className={[cs.loader_container, className].join(' ')}>
            <div className={cs.loader}></div>
        </div>
    )
}
export default Preloader