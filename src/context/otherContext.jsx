import React, { createContext, useState, useContext } from 'react';

const otherContext = createContext()

export const useOtherContext = () => useContext(otherContext)

export const OtherProvider = ({ children }) => {
    const [location, setLocation] = useState('')
    return (
        <otherContext.Provider value={{location, setLocation}}>
            {children}
        </otherContext.Provider>
    );
};
