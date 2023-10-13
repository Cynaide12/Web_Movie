import React from "react";
const ItemList = ({className, text, attribute}) => {
    return(
        <li><span>{text} </span>{attribute ? attribute : '--'}</li>
    )
}
export default ItemList