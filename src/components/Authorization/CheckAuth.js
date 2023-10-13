import axios from "axios";
import React, { useEffect } from "react";
import { useUserContext } from "../../context/userContext";
const AccessControl = () => {
  const { isAuth, setIsAuth, setUser, setIsRequest, setIsAdmin } =
    useUserContext();
  const token = localStorage.getItem("accessToken");
  const checkAdmin = async () => {
    try {
      const res = await axios.get("/auth/users", {
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + token,
        },
      });
      res.data.isAdmin == false ? setIsAdmin(false) : setIsAdmin(true);
    } catch (e) {
      setIsAdmin(false);
    }
  };
  useEffect(() => {
    if(token == '' || !token){
    setUser(null)}
  }, [token])
  const fetchUserData = async () => {
    if (!isAuth) {
      try {
        const res = await axios.post(
          "/auth/user-info",
          {},
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: "Bearer " + token,
            },
          }
        );
        if (res.data.message !== "Вы не авторизованы") {
          setUser(res.data);
          setIsAuth(true);
        }
        if(res.data === '[object Object]'){
          localStorage.removeItem("accessToken")
        }
        setIsRequest(true);
      } catch (e) {
        setIsAuth(false);
        setUser(null);
        setIsRequest(true);
      }
    }
  };
  useEffect(() => {
    if(isAuth !== null){
    setIsAuth(false);}
    fetchUserData();
  }, [token]);
  useEffect(() => {
    checkAdmin();
  }, [isAuth]);
  return null;
};
export default AccessControl;
