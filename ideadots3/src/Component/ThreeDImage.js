import { Billboard, Image } from "@react-three/drei";
import React, { useContext, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";
import { ImageContext } from "./ImageContextProvider";
import ImageIdea from "./ImageIdea.js";
import { Html } from "@react-three/drei";
import DisplayImage from "./DisplayImageThreeD.js";

export default function ThreeDImage({
  ideaId,
  position,
  offset,
  onClick,
  onPointerOver,
  onPointerOut,
  scale,
  setEnableCustomControls,
  distanceFactorForZoom,
  setScale,
  dimensions,
  isThreeDModeActive,
}) {
  const context = useContext(ImageContext);
  const filteredImages = context.imageSrcList.filter(
    (img) => img.id === ideaId // TODO: move this computation to parent
  );

  const imageList = filteredImages.map((filename) => (
    <group key={uuidv4()} position={position}>
      {isThreeDModeActive ? (
        <Billboard key={uuidv4()}>
          <Image
            key={uuidv4()}
            onClick={onClick}
            onPointerOver={onPointerOver}
            onPointerOut={onPointerOut}
            transparent
            radius={0.3}
            scale={scale}
            url={`./Assets/${filename.src}`}
            onError={(e) => {
              console.error(`Could not load ${filename.src}:`, e);
              //e.target.src = "path/to/default/image.jpg"; // Fallback image
            }}
          />
        </Billboard>
      ) : (
        <Html key={uuidv4()} distanceFactor={10}>
          <div className="threedImage">
            <img
              draggable={false}
              style={{
                position: "absolute",
                height: `${dimensions[0]}px`,
                width: `${dimensions[1]}px`,
                top: "-100px",
                left: "-100px",
                borderRadius: "10%",
              }}
              src={`./Assets/${filename.src}`}
            ></img>
          </div>
        </Html>
      )}
    </group>
  ));

  return <>halloo{imageList}</>;
}
