import React, { createContext, useState, useContext, useEffect } from 'react';

const filmsDataContext = createContext()

export const useFilmsDataContext = () => useContext(filmsDataContext)

export const FilmsProvider = ({ children }) => {
    const [filmsData, setFilmsData] = useState(null)
    const [filmsDataByCategories, setFilmsDataByCategories] = useState([])
    const [favoritesData, setFavoritesData] = useState([])
    const [isFavoritesLoading, setIsFavoritesLoading] = useState(false)
    const [isUpdateFavoritesState, setIsUpdateFavoritesState] = useState(0)
    const [isLoadingFavoritesWidget, setIsLoadingFavoritesWidget] = useState(false)
    return (
        <filmsDataContext.Provider value={{ filmsData, setFilmsData, filmsDataByCategories, setFilmsDataByCategories, favoritesData, setFavoritesData, isFavoritesLoading, setIsFavoritesLoading, isUpdateFavoritesState, setIsUpdateFavoritesState, isLoadingFavoritesWidget, setIsLoadingFavoritesWidget}}>
            {children}
        </filmsDataContext.Provider>
    );
};
