// context/StateContext.js
"use client"
import { createContext, useContext, useState } from 'react';

const StateContext = createContext();

export const StateProvider = ({ children }) => {
  const [stateType, setStateType] = useState();
  const [status, setStatus] = useState();

  return (
    <StateContext.Provider value={{ stateType, setStateType, status, setStatus}}>
      {children}
    </StateContext.Provider>
  );
};

export const useStateContext = () => useContext(StateContext);
