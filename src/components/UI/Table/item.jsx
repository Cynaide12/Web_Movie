import react from "react";
import cs from './table.module.css'
const Item = ({ children, className, type }) => {
    return (
        <>
            {type == 'th' ? <th className={[cs.item, className].join(' ')} >{children}</th> : <td className={[cs.item, className].join(' ')} >{children}</td> }
        </>
    )
}
export default Item