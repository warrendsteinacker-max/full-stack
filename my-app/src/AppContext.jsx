import React, { createContext, useState, useContext } from 'react';

// 1. Create the Context
const GlobalContext = createContext();

// 2. Create a Provider component
export const GlobalProvider = ({ children }) => {
  const [count, setCount] = useState(0);
  const [user, setUser] = useState({ name: "Explorer", loggedIn: true });

  // Example functions to pass down
  const increment = () => setCount(prev => prev + 1);
  const resetCount = () => setCount(0);
  const updateUsername = (newName) => setUser({ ...user, name: newName });

  const value = {
    count,
    user,
    increment,
    resetCount,
    updateUsername
  };

  return (
    <GlobalContext.Provider value={value}>
      {children}
    </GlobalContext.Provider>
  );
};

// 3. Custom hook for easy usage
export const useGlobalContext = () => {
  const context = useContext(GlobalContext);
  if (!context) {
    throw new Error("useGlobalContext must be used within a GlobalProvider");
  }
  return context;
};