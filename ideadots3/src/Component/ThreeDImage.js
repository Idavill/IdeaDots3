import { PivotControls, Billboard, Text, Image } from "@react-three/drei";
import React, { useEffect, useRef, useState, useContext, useMemo } from "react";
import { db } from "./Database";
import testImage from "/Users/idavilladsen/Desktop/IdeaDots3/ideadots3/src/Assets/shelf.jpg";

export default function ThreeDImage({ ideaId, pos }) {
  const [selectedImages, setSelectedImages] = useState([]);

  useEffect(() => {
    const downloadImages = async () => {
      const data = await db.images.where("ideaId").equals(ideaId).toArray();
      if (data.length > 0) {
        const blobs = data.map((item) => item.image);
        setSelectedImages(blobs);
      }
    };

    downloadImages(ideaId);
    console.log(ideaId);
  }, [ideaId]);

  const imageList = () => {
    //console.log("Selected Images: ", selectedImages);
    return selectedImages.map((src, index) => {
      const objectUrl = URL.createObjectURL(src);
      return (
        <Billboard key={index}>
          <Image
            transparent
            radius={0.3}
            position={pos}
            scale={[3, 3, 3]}
            url={testImage}
          />
        </Billboard>
      );
    });
  };

  return <>{imageList()}</>;
}
