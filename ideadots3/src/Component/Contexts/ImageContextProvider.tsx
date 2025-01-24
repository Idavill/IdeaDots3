import React, { PropsWithChildren, createContext, useState, useEffect, useContext } from "react";
import { db } from "../Database";
import { Image } from "../../Entities";

interface dbImage{
  ideaId: string;
  name?: string;
  src: string;
}

interface ImageContextType {
  imageSrcList: [] | null;
  setImageSrcList: React.Dispatch<React.SetStateAction<dbImage[] | null>>;
}
export const ImageContext =React.createContext<ImageContextType>( {} as ImageContextType);

export const ImageContextProvider = ({children}:PropsWithChildren) => {
  const [imageSrcList, setImageSrcList] = useState<Image[]|null>([]);

  useEffect(() => {
    getAllImageNames();
  }, []);

  useEffect(() => {
    console.log("inside image context provider: ", imageSrcList);
  }, [imageSrcList]);

  async function getAllImageNames() {
    const data = await db.images.toArray();
    if (data.length > 0) {
      data.forEach((e: dbImage) => {
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
