import React, { useEffect } from "react";
import { Outlet } from "react-router-dom";
import "/src/style/scss/main.scss"
import { useUserContext } from "../../../context/userContext";
import Preloader from "../../../components/UI/preloader/Preloader";
import { useNavigate, useLocation} from "react-router-dom";
import { useOtherContext } from "../../../context/otherContext";
const AdminPanel = ({ }) => {
    const { isAdmin } = useUserContext()
    const navigate = useNavigate()
    const location = useLocation()
    useEffect(() => {
        if(location.pathname == '/admin-panel'){
            navigate('users')
        }
    }, [])
    return (
        <>
        {!isAdmin && <Preloader className='center-preloader'/>}
        {isAdmin &&
        <main>
            <Outlet />
        </main>}
        </>
    )
}
export default AdminPanel