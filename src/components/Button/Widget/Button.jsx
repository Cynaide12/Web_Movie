import React from 'react'
import cs from '../css/Button.module.css'
const Button = ({ css, text, onClick, dis, bg, disBtn, type }) => {
	let styleArray = [cs.btn, css];
	!dis ? '' : styleArray.push(disBtn);
	return <button className={styleArray.join(' ')} type = {type} onClick = {onClick} disabled ={dis} >{text ? text: (<img src = {bg} alt='icon'></img>)}</button>
}
export default Button
