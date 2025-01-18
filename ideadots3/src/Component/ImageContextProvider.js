import React, { createContext, useState, useEffect, useContext } from "react";
import { db } from "./Database";

export const ImageContext = createContext();

export const ImageContextProvider = ({ children }) => {
  const [imageSrcList, setImageSrcList] = useState([]);

  useEffect(() => {
    getAllImageNames();
  }, []);

  async function getAllImageNames() {
    const data = await db.images
      .where("ideaId")
      .equals("6680d8c3-11fa-40ea-96b1-e0c2ba4f7df5")
      .toArray();
    if (data.length > 0) {
      data.forEach((d) => {
        setImageSrcList((prev) => [...prev, d.name]);
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
