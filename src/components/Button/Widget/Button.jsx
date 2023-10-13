import React from 'react'
import cs from '../css/Button.module.css'
const Button = ({ css, text, onClick, dis, bg, disBtn, type }) => {
	let styleArray = [cs.btn, css];
	!dis ? '' : styleArray.push(disBtn);
	return <button className={styleArray.join(' ')} type = {type} onClick = {onClick} disabled ={dis} style={!dis ? {cursor: 'pointer'} : {cursor: 'default'}} >{text ? text: (<img src = {bg} alt='icon'></img>)}</button>
}
export default Button
