import { Billboard, Image } from "@react-three/drei";
import React, { useEffect, useContext, useRef, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { ImageContext } from "./ImageContextProvider";

export default function ThreeDImage({
  ideaId,
  position,
  handleClick,
  onPointerOver,
  onPointerOut,
}) {
  const context = useContext(ImageContext);
  const [hovered, setHovered] = useState(false);
  const sphereRef = useRef();

  useEffect(() => {
    console.log("hover ", hovered);
  }, [hovered]);

  const imageList = context.imageSrcList.map((filename) => (
    <group position={position}>
      <Billboard key={uuidv4()}>
        <Image
          handleClick={handleClick}
          onPointerOver={onPointerOver}
          onPointerOut={onPointerOut}
          transparent
          radius={0.3}
          scale={[2, 2, 2]}
          url={`./Assets/${filename}`}
          onError={(e) => {
            console.error(`Could not load ${filename}:`, e);
            e.target.src = "path/to/default/image.jpg"; // Fallback image
          }}
        />
      </Billboard>
    </group>
  ));

  return <>halloo{imageList}</>;
}
