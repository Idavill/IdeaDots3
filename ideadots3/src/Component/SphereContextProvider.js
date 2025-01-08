import { Sphere } from "@react-three/drei";
import API from "../Services/API";
import React, { createContext, useState, useEffect, useContext } from "react";

export const SphereContext = createContext();

export const SphereContextProvider = ({ children }) => {
  const [spheres, setSpheres] = useState([]);
  const value = { name: "John Doe", age: 30 };
  const apiInstance = API();

  useEffect(() => {
    console.log("CONTEXT");
    const fetchData = async () => {
      await getSphereData();
    };
    fetchData();
  }, []);

  const getSphereData = async () => {
    const spheresFromAPI = apiInstance.handleGetLocalSpheresJsonData();
    if (spheresFromAPI) {
      for (const s of spheresFromAPI) {
        console.log("CONTEXT", s);

        setSpheres((prevs) => [...prevs, s]);
      }
    } else {
      console.log("no spheres in CONTEXT");
    }
  };

  return (
    <SphereContext.Provider value={spheres}>{children}</SphereContext.Provider>
  );
};

export const useSphereContext = () => useContext(SphereContext);
