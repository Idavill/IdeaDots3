import API from "../../Services/API.js";
import React, { createContext, useState, useEffect, useContext, PropsWithChildren } from "react";
import IdeaType from '../Entities';

export interface SphereContextType {
  spheres: IdeaType[] | null;
  setSpheres: React.Dispatch<React.SetStateAction<IdeaType[] | null>>;
}

export const SphereContext = React.createContext<SphereContextType>( {} as SphereContextType );

export const SphereContextProvider = ({ children }:PropsWithChildren) => {
  const [spheres, setSpheres] = useState<IdeaType[]| null>([]);
  const apiInstance = API();

  useEffect(() => {
    getSphereData();
    //updateDataWithLocalStorage();
  }, []);

  const getSphereData = async () => {
    var spheresFromAPI = apiInstance.handleGetLocalSpheresJsonData();
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
