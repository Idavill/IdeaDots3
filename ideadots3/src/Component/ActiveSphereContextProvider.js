import API from "../Services/API";
import React, { createContext, useState, useEffect, useContext } from "react";

export const ActiveSphereContext = createContext();

export const ActiveSphereContextProvider = ({ children }) => {
  const [activeSpheres, setActiveSpheres] = useState([]);

  return (
    <ActiveSphereContext.Provider value={{ activeSpheres, setActiveSpheres }}>
      {children}
    </ActiveSphereContext.Provider>
  );
};

export const useActiveSphereContext = () => useContext(ActiveSphereContext);
