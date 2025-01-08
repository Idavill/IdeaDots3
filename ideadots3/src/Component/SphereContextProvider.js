import { Sphere } from "@react-three/drei";
import React, { createContext, useState, useEffect, useContext } from "react";

export const SphereContext = createContext();

export const SphereContextProvider = ({ children }) => {
  //const [sphere, setSphere] = useState([]);
  const value = { name: "John Doe", age: 30 };

  return (
    <SphereContext.Provider value={value}>{children}</SphereContext.Provider>
  );
};

export const useSphereContext = () => useContext(SphereContext);
