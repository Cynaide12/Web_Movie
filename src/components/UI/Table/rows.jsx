import react from "react";
import cs from './table.module.css'
const Rows = ({ className, children }) => {
    return (
        <tr className={[cs.rows, className].join(' ')}>
            {children}
        </tr>
    )
}
export default Rows