import { Billboard, Image } from "@react-three/drei";
import React, { useContext, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { ImageContext } from "./ImageContextProvider";
import { Html, Sphere } from "@react-three/drei";
import Draggable from "react-draggable";

export default function ThreeDImage({
  ideaId,
  position,
  onClick,
  onPointerOver,
  onPointerOut,
  scale,
  dimensions,
  isThreeDModeActive,
}) {
  const context = useContext(ImageContext);
  const filteredImages = context.imageSrcList.filter(
    (img) => img.id === ideaId // TODO: move this computation to parent
  );
  const [currentImage, setCurrentImage] = useState(0); // 0, 1, or 2 for three images

  const handleNextImage = () => {
    setCurrentImage((prev) => (prev + 1) % filteredImages.length); // Cycle through images
  };

  const imageList = filteredImages.map((filename, i) => (
    <group key={uuidv4()} position={position}>
      {isThreeDModeActive ? (
        <Billboard key={uuidv4()}>
          <Image
            key={uuidv4()}
            onClick={onClick}
            visible={currentImage === i} // Only show if currentImage is 2
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
          {/* <Draggable> */}
          <div /*className="threedImage"*/>
            <img
              draggable={false}
              style={{
                position: "absolute",
                height: `${dimensions[0]}px`,
                width: `${dimensions[1]}px`,
                top: "-100px",
                left: "-100px",
                borderRadius: "10%",
                visibility: `${currentImage === i ? "visible" : "hidden"}`,
              }}
              src={`./Assets/${filename.src}`}
            ></img>
            <button
              onClick={handleNextImage}
              style={{
                position: "absolute",
                top: "20px",
                left: "20px",
                background: "white",
                padding: "10px",
              }}
            >
              Next Image
            </button>
          </div>
          {/* </Draggable> */}
        </Html>
      )}
    </group>
  ));

  return <>halloo{imageList}</>;
}
