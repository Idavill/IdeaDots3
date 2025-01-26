import React, { createContext, useState, useEffect, useContext } from "react";
import { db } from "./../Database";

export const ImageContext = createContext();

export const ImageContextProvider = ({ children }) => {
  const [imageSrcList, setImageSrcList] = useState([]);

  useEffect(() => {
    getAllImageNames();
  }, []);

  useEffect(() => {
    console.log("inside image context provider: ", imageSrcList);
  }, [imageSrcList]);

  async function getAllImageNames() {
    const data = await db.images.toArray();
    if (data.length > 0) {
      data.forEach((e) => {
        setImageSrcList((prev) => [...prev, { id: e.ideaId, src: e.name }]);
      });
    }
  }

  return (
    <ImageContext.Provider value={{ imageSrcList, setImageSrcList }}>
      {children}
    </ImageContext.Provider>
  );
};

export const useImageContext = () => useContext(ImageContext);
