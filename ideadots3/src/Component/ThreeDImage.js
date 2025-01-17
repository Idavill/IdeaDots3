import { PivotControls, Billboard, Text, Image } from "@react-three/drei";
import React, { useEffect, useRef, useState, useContext } from "react";
import { db } from "./Database";

export default function ThreeDImage({ ideaId }) {
  const [selectedImages, setSelectedImages] = useState([]);

  useEffect(() => {
    downloadImages(ideaId);
  }, [ideaId]);

  async function downloadImages(ideaId) {
    const data = await db.images.where("ideaId").equals(ideaId).toArray();
    if (data.length > 0) {
      const blobs = data.map((item) => item.image);
      setSelectedImages(blobs);
    }
  }

  const imageList = () => {
    return selectedImages.map((src) => (
      <>
        <Image
          //ref={ref}
          transparent
          radius={0.3}
          position={[0, 1.5, 0]}
          scale={[1, 1, 1]}
          // url={`/img${Math.floor(hovered % 10) + 1}.jpg`}
          url={src}
        />
      </>
    ));
  };

  return <>{imageList()}</>;
}
