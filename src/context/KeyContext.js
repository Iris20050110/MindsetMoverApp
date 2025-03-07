import React, { createContext, useState, useContext } from 'react';

const KeyContext = createContext();

export const KeyProvider = ({ children }) => {
  const [fKeys, setfKeys] = useState([]);

  return (
    <KeyContext.Provider value={{ fKeys, setfKeys }}>
      {children}
    </KeyContext.Provider>
  );
};

export const useKey = () => useContext(KeyContext);