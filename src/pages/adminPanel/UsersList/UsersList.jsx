import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import Button from "../../../components/Button/Widget/Button"
import { useResponseContext } from "../../../context/responseContext";
import { Table, Item, Thead, Rows, Tbody, cs } from '../../../components/UI/Table/store';
import "style/scss/UsersList.scss"
const UsersList = () => {
    const token = localStorage.getItem("accessToken");
    const [userData, setUserData] = useState([])
    const [newRole, setNewRole] = useState([''])
    const [username, setUsername] = useState('')
    const [isOpen, setIsOpen] = useState(false)
    const adminCheck = useRef(null)
    const userCheck = useRef(null)
    const watcherCheck = useRef(null)
    const { response, setResponse } = useResponseContext()
    const fetchUserData = async () => {
        try {
            const res = await axios.get("/auth/users", {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: "Bearer " + token,
                },
            });
            setUserData(res.data)
        } catch (e) {
            console.error("Error sending request:", e.response.data.message);
        }
    };
    useEffect(() => {
        fetchUserData()
    }, [token])
    const changeRole = async (e) => {
        e.preventDefault()
        setIsOpen(false)
        try {
            const res = await axios.post("/auth/change-role", { username, newRole }, {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: "Bearer " + token,
                },
            })
            setResponse(res.data.message)
        } catch (e) {
            setResponse(e.response.data.message)
        }
        fetchUserData()
    }
    const changeRoleOpen = (username, userRole) => {
        setUsername(username)
        setIsOpen(!isOpen)
        if (userRole == "ADMIN") {
            adminCheck.current.checked = true
            userCheck.current.checked = false
            watcherCheck.current.checked = false
            setNewRole("ADMIN")
        }
        if (userRole == "USER") {
            adminCheck.current.checked = false
            userCheck.current.checked = true
            watcherCheck.current.checked = false
            setNewRole("USER")
        }
        if (userRole == "WATCHER") {
            adminCheck.current.checked = false
            userCheck.current.checked = false
            watcherCheck.current.checked = true
            setNewRole("WATCHER")
        }


    }
    const closeFormOnParentClick = (e) => {
        if (!e.target.closest(".changeRole__form")) {
            setIsOpen(false);
        }
    }
    return (
        <>
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
            <section className="sectionAdmin usersList">
                <h1>Пользователи</h1>
                <div className="usersList__container">
                    <Table>
                        <Thead>
                            <Rows className='usersList__tableHead'>
                                <Item type='th'>ID</Item>
                                <Item type='th'>Login</Item>
                                <Item type='th'>Firstname</Item>
                                <Item type='th'>Lastname</Item>
                                <Item type='th'>email</Item>
                                <Item type='th'>Role</Item>
                            </Rows>
                        </Thead>
                        <Tbody>
                            {userData.map((item) => {
                                return (
                                    <Rows key={item._id}>
                                        <Item>{item._id || 'null'}</Item>
                                        <Item>{item.username || 'null'}</Item>
                                        <Item>{item.firstname || 'null'}</Item>
                                        <Item>{item.lastname || 'null'}</Item>
                                        <Item>{item.email || 'null'}</Item>
                                        <Item>{item.roles || 'null'}</Item>
                                        <Item>
                                            <Button text='Сменить роль' onClick={() => changeRoleOpen(item.username, item.roles)} css='usersList__button' /></Item>
                                    </Rows>
                                )
                            })
                            }
                        </Tbody>
                    </Table>

                </div>
            </section>
        </>
    )
}
export default UsersList;