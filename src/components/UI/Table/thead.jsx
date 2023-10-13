import react from "react";
import cs from './table.module.css'
const Thead = ({className, children}) => {
    return (
        <thead className={className}>
            {children}
        </thead>
    )
}
export default Thead;