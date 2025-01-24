import React, { PropsWithChildren, createContext, useState, useEffect, useContext } from "react";
import { db } from "../Database";
import { Image } from "../../Entities";

interface ImageContextType {
  imageSrcList: Image[] | null;
  setImageSrcList: React.Dispatch<React.SetStateAction<Image[] | null>>;
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


  //TODO: TEST THIS::
  async function getAllImageNames() {
    const data = await db.images.toArray();
    if (data.length > 0) {
      setImageSrcList((prevs) => [
        ...(prevs || []),
        ...data.map((e: Image) => ({
          ideaId: e.ideaId,
          src: e.src || "no name was found", // Fill with defaults if not present
          type: e.type || "no file path",  // Use type from the database or a default
          size: e.size || 0,          // Use size from the database or a default
          image: e.image || null,        // Ensure `image` is included
        })),
      ]);
    }
  }

  return (
    <ImageContext.Provider value={{ imageSrcList, setImageSrcList }}>
      {children}
    </ImageContext.Provider>
  );
};

export const useImageContext = () => useContext(ImageContext);
