import { Billboard, Image } from "@react-three/drei";
import React, { useContext } from "react";
import { v4 as uuidv4 } from "uuid";
import { ImageContext } from "./ImageContextProvider";
import { SphereContext } from "./SphereContextProvider";
import { Html } from "@react-three/drei";
import DisplayImage from "./DisplayImageThreeD.js";

export default function ThreeDImage({
  ideaId,
  position,
  onClick,
  onPointerOver,
  onPointerOut,
  scale,
  hover,
  clicked,
  setEnableCustomControls,
  distanceFactorForZoom,
  setScale,
  isThreeDModeActive,
}) {
  const context = useContext(ImageContext);
  const filteredImages = context.imageSrcList.filter(
    (img) => img.id === ideaId
  );

  const imageList = filteredImages.map((filename) => (
    <group position={position}>
      <Billboard key={uuidv4()}>
        <Image
          onClick={onClick}
          onPointerOver={onPointerOver}
          onPointerOut={onPointerOut}
          transparent
          radius={0.3}
          scale={[2, 2, 2]}
          url={`./Assets/${filename.src}`}
          onError={(e) => {
            console.error(`Could not load ${filename.src}:`, e);
            //e.target.src = "path/to/default/image.jpg"; // Fallback image
          }}
        />
      </Billboard>
      {!isThreeDModeActive ? (
        <Html distanceFactor={distanceFactorForZoom}>
          <DisplayImage
            ideaId={ideaId}
            hover={hover}
            clicked={clicked}
            setEnableCustomControls={setEnableCustomControls}
            setScale={setScale}
            scale={scale}
          />
        </Html>
      ) : null}
    </group>
  ));

  return <>halloo{imageList}</>;
}
