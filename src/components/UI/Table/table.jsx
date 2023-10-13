import react from "react";
import cs from './table.module.css'
const Table = ({ children, className }) => {
    return (
        <table className={[cs.table, className].join(' ')}>
            {children}
        </table>
    )
}
export default Table