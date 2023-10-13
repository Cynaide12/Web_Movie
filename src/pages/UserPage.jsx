import React, { useEffect, useState } from "react";
import { useUserContext } from "../context/userContext";
import "/src/style/scss/UserPage.scss"
import Preloader from "../components/UI/preloader/Preloader";
const UserPage = () => {
    const { user, setUser } = useUserContext()
    const [userKeys, setUserKeys] = useState([])
    useEffect(() => {
        if (user) {
            setUserKeys(Object.keys(user))
        }
    }, [user])
    return (
        <div className="content userPage-content">
            {!user && <Preloader />}
            {user && (
                <section className="user">
                    <div className="container user__userContainer">
                        <div className="userContainer__imgContainer">
                            <img src="/assets/img/main/5a89be7fade1e7fe15096b085913e123.webp" alt="user-thumbnail" className="userContainer__img" />
                        </div>
                        <div className="userContainer__textContainer">
                            <p>{user.username}</p>
                        </div>
                    </div>
                </section>
            )
            }
        </div>
    )
}
export default UserPage