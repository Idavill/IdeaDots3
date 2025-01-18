import { Billboard, Image } from "@react-three/drei";
import React, { useEffect, useRef, useState, useContext, useMemo } from "react";
//import { db } from "./Database";
//import { useLiveQuery } from "dexie-react-hooks";
import { v4 as uuidv4 } from "uuid";
//import testImage from "/Users/idavilladsen/Desktop/IdeaDots3/ideadots3/src/Assets/shelf.jpg";
import { ImageContext } from "./ImageContextProvider";

export default function ThreeDImage({ ideaId, pos }) {
  //const [selectedImages, setSelectedImages] = useState([]);
  const context = useContext(ImageContext);
  //   const [url, setUrl] = useState([]);
  //   const data = useLiveQuery(async () => {
  //     return await db.images.where("ideaId").equals(ideaId).toArray();
  //   });

  useEffect(() => {
    console.log("context ", context.imageSrcList);
  }, [context]);

  const imageList = context.imageSrcList.map((filename) => (
    <Billboard key={uuidv4()}>
      <Image
        transparent
        radius={0.3}
        position={pos}
        scale={[3, 3, 3]}
        url={`./Assets/${filename}`}
        onError={(e) => {
          console.error(`Could not load ${filename}:`, e);
          e.target.src = "path/to/default/image.jpg"; // Fallback image
        }}
      />
    </Billboard>
  ));

  return <>halloo{imageList}</>;
}
