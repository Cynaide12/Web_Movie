import axios from "axios";
import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useResponseContext } from "../../context/responseContext";
const AdminControl = () => {
  const token = localStorage.getItem("accessToken");
  const [isAdmin, setIsAdmin] = useState(null)
  const navigate = useNavigate()
  const location = useLocation()
  const {response, setResponse} = useResponseContext()
  const fetchUserData = async () => {
    try {
        const res = await axios.get("/auth/users", {
            headers: {
                "Content-Type": "application/json",
                Authorization: "Bearer " + token,
            },
        });
        setIsAdmin(true)
    } catch (e) {
        console.error(e.response.data.message);
        setIsAdmin(false)
        setResponse(e.response.data.message)
    }
};
useEffect(() => {
    fetchUserData();
}, [token]);
useEffect(() => {
    if (!isAdmin && isAdmin !== null) {
        navigate("/home")
        
    }
}, [isAdmin, location.pathname])
  return null

};

export default AdminControl;
