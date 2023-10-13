import react from "react";
import cs from './table.module.css'
const Tbody = ({children, className}) => {
    return(
        <tbody className={className}>
            {children}
        </tbody>
    )
}
export default Tbody