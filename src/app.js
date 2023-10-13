// import "style.scss";
import React, { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "/src/pages/Login.jsx";
import Home from "/src/pages/Home.jsx";
import "./style/scss/main.scss";
import Favourites from "/src/pages/Favourites.jsx";
import Trending from "./pages/Trending";
import AdminPanel from "./pages/adminPanel/AdminPanel/AdminPanel";
import UsersList from "./pages/adminPanel/UsersList/UsersList";
import Layout from "./components/UI/Layout/Layout";
import FilmsList from "./pages/adminPanel/FilmsList/FilmsList";
import ChangeFilm from "./pages/adminPanel/FilmsList/ChangeFilm/ChangeFIlm";
import AddFilm from "./pages/adminPanel/FilmsList/AddFilm/AddFilm";
import SingleFilm from "./pages/singleFilm/SingleFilm";
import UserPage from "./pages/UserPage";
function App() {
  return (
    <>
      <BrowserRouter>
        <Layout>
          <Routes>
            <Route path="*" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/home" element={<Home />} />
            <Route path="/favorites" element={<Favourites />} />
            <Route path="/trending" element={<Trending />} />
            <Route path="/user-page" element={<UserPage />} />
            <Route path='/film/:id' element={<SingleFilm />} />
               <Route path="/admin-panel/*" element={<AdminPanel />}>
                <Route path="users" element={<UsersList />} />
                <Route path="films" element={<FilmsList />} />
                <Route path="films/change-film/:id" element={<ChangeFilm />} />
                <Route path="films/add-film" element={<AddFilm />} />
              </Route>
          </Routes>
        </Layout>
      </BrowserRouter>
    </>
  );
}

export default App;
