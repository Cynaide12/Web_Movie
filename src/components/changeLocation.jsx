import React, { useEffect } from "react";
import { useOtherContext } from "../context/otherContext";
const ChangeLocation = () => {
    // const currentLocation = window.location.pathname
    const {setLocation} = useOtherContext()
    useEffect(() => {
        setLocation(window.location.pathname)
    }, [window.location.pathname])
    return null
}
export default ChangeLocation