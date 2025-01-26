import { Billboard, Image } from "@react-three/drei";
import React, { useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { Html } from "@react-three/drei";

export default function ThreeDImage({
  position,
  onClick,
  onPointerOver,
  onPointerOut,
  scale,
  dimensions,
  isThreeDModeActive,
  filteredImages,
}) {
  const [currentImage, setCurrentImage] = useState(0);
  const [images, setImages] = useState(filteredImages || []);
  const [showButton, setShowButton] = useState(false);

  useEffect(() => {
    if (filteredImages.length > 1) {
      setShowButton(true);
      console.log("filtered images amount: ", filteredImages);
    }
  }, [filteredImages]);

  const handleNextImage = () => {
    setCurrentImage((prev) => (prev + 1) % filteredImages.length); // Cycle through images
  };

  const imageList = images.map((filename, i) => (
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
            }}
          />
        </Billboard>
      ) : (
        <Html key={uuidv4()} distanceFactor={10}>
          <div>
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
            {showButton ? (
              <button
                onClick={handleNextImage}
                style={{
                  position: "absolute",
                  top: "-50px",
                  left: "50px",
                  background: "white",
                  padding: "10px",
                }}
              >
                {">"}
              </button>
            ) : null}
          </div>
        </Html>
      )}
    </group>
  ));

  return <>halloo{imageList}</>;
}
