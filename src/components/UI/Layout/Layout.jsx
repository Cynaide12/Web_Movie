import React, { useState, useEffect } from "react";
import CheckAuth from "../../Authorization/CheckAuth";
import { WidgetProvider } from "../../../context/widgetContext";
import { ResponseProvider } from "../../../context/responseContext";
import Navbar from '../Navbar/Navbar';
import AdminNavbar from "../adminPanel/Navbar/adminNavbar";
import { useLocation } from "react-router-dom";
import { UserProvider, useUserContext } from "../../../context/userContext";
import ApiFilmsData from "../../api/ApiFilmsData";
import { FilmsProvider } from "../../../context/apiContext";
import ApiFilmsFavorites from "../../api/ApiFilmsFavorites";
import { OtherProvider } from "../../../context/otherContext";
import ChangeLocation from "../../changeLocation";
const Layout = ({ children }) => {
    const [navPanel, setNavPanel] = useState('');
    const location = useLocation();
    useEffect(() => {
        if (location.pathname.startsWith("/admin-panel")) {
            setNavPanel(<AdminNavbar />);
        } else if (!location.pathname.startsWith("/login")) {
            setNavPanel(<Navbar />);
        } else {
            setNavPanel(null);
        }
    }, [location.pathname]);
    return (
        <>
            <UserProvider>
                <ResponseProvider>
                    <FilmsProvider>
                        <OtherProvider>
                            <CheckAuth />
                            <ApiFilmsData />
                            <ApiFilmsFavorites />
                            <ChangeLocation />
                            <WidgetProvider>
                                {navPanel}
                                {children}
                            </WidgetProvider>
                        </OtherProvider>
                    </FilmsProvider>
                </ResponseProvider>
            </UserProvider>
        </>
    );
};

export default Layout;
