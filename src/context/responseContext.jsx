import { createContext, useContext, useEffect, useState, useRef } from 'react';
import ResponsiveModal from '../components/UI/ResponsiveModal/ResponsiveModal';
const ResponseContext = createContext();
const CounterContext = createContext();

export const useResponseContext = () => useContext(ResponseContext);
export const useCounterContext = () => useContext(CounterContext);
export const ResponseProvider = ({ children }) => {
  const [response, setResponse] = useState('');
  const [counterResponse, setCounterResponse] = useState(0)
  const [forceUpdate, setForceUpdate] = useState(false);
  const updateResponseAndCounter = (newResponse) => {
    setResponse(newResponse);
    setCounterResponse(counterResponse + 1)
  };


  return (
    <ResponseContext.Provider value={{ response, setResponse: updateResponseAndCounter }}>
      <CounterContext.Provider value={{counterResponse}}>
      <ResponsiveModal key={counterResponse}/>
        {children}
      </CounterContext.Provider>
    </ResponseContext.Provider>
  );
};
