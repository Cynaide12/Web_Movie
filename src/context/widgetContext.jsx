import React, { createContext, useState, useContext } from 'react';

const WidgetContext = createContext();

export const useWidgetContext = () => useContext(WidgetContext);

export const WidgetProvider = ({ children }) => {
  const [activeWidget, setActiveWidget] = useState('home');

  return (
    <WidgetContext.Provider value={{ activeWidget, setActiveWidget }}>
      {children}
    </WidgetContext.Provider>
  );
};
