import API from "../Services/API";
import React, { createContext, useState, useEffect, useContext } from "react";

export const SphereContext = createContext();

export const SphereContextProvider = ({ children }) => {
  const [spheres, setSpheres] = useState([]);
  const apiInstance = API();

  useEffect(() => {
    getSphereData();
    //updateDataWithLocalStorage();
  }, []);

  const updateDataWithLocalStorage = () => {
    spheres.forEach((s) => {
      console.log("TESSST", s);

      if (localStorage.getItem(s.id + "title") !== null) {
        s.title = localStorage.getItem(s.id + "title");
        console.log("TESSST", s.title);
      }
    });
  };

  const getSphereData = async () => {
    const spheresFromAPI = apiInstance.handleGetLocalSpheresJsonData();
    if (spheresFromAPI) {
      for (const s of spheresFromAPI) {
        if (localStorage.getItem(s.id + "title") !== null) {
          s.title = localStorage.getItem(s.id + "title");
          console.log("TESSST", s.title);
        }
        setSpheres((prevs) => [...prevs, s]);
      }
    } else {
      console.log("no spheres in CONTEXT");
    }
  };

  return (
    <SphereContext.Provider value={{ spheres, setSpheres }}>
      {children}
    </SphereContext.Provider>
  );
};

export const useSphereContext = () => useContext(SphereContext);
