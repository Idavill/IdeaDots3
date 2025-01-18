import { PivotControls, Billboard, Text, Image } from "@react-three/drei";
import React, { useEffect, useRef, useState, useContext, useMemo } from "react";
import { db } from "./Database";
import { useLiveQuery } from "dexie-react-hooks";
import { v4 as uuidv4 } from "uuid";
import testImage from "/Users/idavilladsen/Desktop/IdeaDots3/ideadots3/src/Assets/shelf.jpg";

export default function ThreeDImage({ ideaId, pos }) {
  const [selectedImages, setSelectedImages] = useState([]);
  const [url, setUrl] = useState([]);

  const data = useLiveQuery(async () => {
    return await db.images.where("ideaId").equals(ideaId).toArray();
  });

  useEffect(() => {
    downloadImages(ideaId);
    console.log(ideaId);
  }, [ideaId, data]);

  useEffect(() => {
    if (url.length === selectedImages.length) {
      console.log("yes");
    }
  }, [url]);

  const downloadImages = async () => {
    try {
      //const data = await db.images.where("ideaId").equals(ideaId).toArray();
      console.log("DATA: ", data);
      if (data) {
        const blobs = data.map((item) => item.image);
        setSelectedImages(blobs);
      }
      srcList();
    } catch (e) {
      console.log("failed to fetch images: ", e);
    }
  };

  const srcList = () => {
    selectedImages.forEach((src) => {
      setUrl((prev) => [...prev, URL.createObjectURL(src)]);
      console.log(URL.createObjectURL(src));
    });
  };

  const imageList = url.map((src) => (
    //const objectUrl = URL.createObjectURL(src);
    <Billboard key={uuidv4()}>
      <Image
        transparent
        radius={0.3}
        position={pos}
        scale={[3, 3, 3]}
        url={src}
      />
    </Billboard>
  ));

  return <>halloo{imageList}</>;
}
