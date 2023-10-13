import react, { useState, useEffect, useRef } from "react";
import { useResponseContext } from "../../../../context/responseContext";
import Button from "../../../Button/Widget/Button";
import axios from "axios";
const ChangeRoleForm = ({ username, newRole, setNewRole, isOpen, setIsOpen, adminCheck, userCheck, watcherCheck, userRole, fetchUserData }) => {
    const token = localStorage.getItem("accessToken")
    const { response, setResponse } = useResponseContext()
    const closeFormOnParentClick = (e) => {
        if (!e.target.closest(".changeRole__form")) {
            setIsOpen(false);
        }
    }
    const changeRole = async (e) => {
        e.preventDefault()
        setIsOpen(false)
        try {
            const res = await axios.post("/auth/change-role", { username, newRole }, {
                header: {
                    "Authorization": "Bearer " + token
                }
            })
            setResponse(res.data.film)
        } catch (e) {
            setResponse(e.response.data.message)
        }
        fetchUserData()
    }
    if (userRole == "ADMIN") {
        adminCheck.current.checked = true
        watcherCheck.current.checked = false
        userCheck.current.checked = false
        setNewRole("ADMIN")
    }
    if (userRole == "USER") {
        adminCheck.current.checked = false
        watcherCheck.current.checked = false
        userCheck.current.checked = true
        setNewRole("USER")
    }
    if (userRole == "WATCHER") {
        adminCheck.current.checked = false
        userCheck.current.checked = false
        watcherCheck.current.checked = true
        setNewRole("WATCHER")
    }
    return (
        <div className={"changeRole__formContainer " + (isOpen ? "changeRole__form-open" : '')} onClick={((e) => closeFormOnParentClick(e))}>
            <form method="post" className="changeRole__form" onSubmit={(e) => { changeRole(e) }}  >
                <svg className='changeRole__form-close' viewBox="0 0 100 100" width="40" height="40" onClick={() => setIsOpen(false)}>
                    <line x1="0" y1="0" x2="100" y2="100" stroke="black" strokeWidth="10" />
                    <line x1="0" y1="100" x2="100" y2="0" stroke="black" strokeWidth="10" />
                </svg>
                <div className="changeRole__controllerContainer">
                    <input type="radio" ref={adminCheck} value="ADMIN" name='role' id="ADMIN" onClick={(e) => { setNewRole("ADMIN") }} />
                    <label htmlFor="ADMIN">Admin</label>
                </div>
                <div className="changeRole__controllerContainer">
                    <input type="radio" ref={userCheck} value="USER" name='role' id="USER" onClick={() => { setNewRole("USER") }} />
                    <label htmlFor="USER">User</label>
                </div>
                <div className="changeRole__controllerContainer">
                    <input type="radio" ref={watcherCheck} value="WATCHER" name='role' id="WATCHER" onClick={() => { setNewRole("WATCHER") }} />
                    <label htmlFor="WATCHER">Watcher</label>
                </div>
                <div className="changeRole__controllerContainer">
                    <Button type="submit" text="Готово" />
                </div>
            </form>
        </div>
    )
}
export default ChangeRoleForm