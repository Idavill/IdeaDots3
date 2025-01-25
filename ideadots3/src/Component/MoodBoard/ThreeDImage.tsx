import { Billboard, Image, Select } from "@react-three/drei";
import { useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { Html } from "@react-three/drei";
import { ImageType } from "../../Entities";

interface ThreeDImage {
  position: [x: number, y: number, z: number];
  onClick: (e: any) => void;
  onPointerOver: (e: any) => void;
  onPointerOut: (e: any) => void;
  scale: number;
  dimensions: number[];
  isThreeDModeActive: boolean;
  filteredImages: ImageType[] | undefined;
}

export default function ThreeDImage({
  position,
  onClick,
  onPointerOver,
  onPointerOut,
  scale,
  dimensions,
  isThreeDModeActive,
  filteredImages,
}: ThreeDImage) {
  const [currentImage, setCurrentImage] = useState(0); // 0, 1, or 2 for three images
  const [images, setImages] = useState(filteredImages || []);
  const [showButton, setShowButton] = useState(false);

  useEffect(() => {
    if (filteredImages)
      if (filteredImages.length > 1) {
        setShowButton(true);
        console.log("filtered images amount: ", filteredImages);
      }
  }, [filteredImages]);

  const handleNextImage = () => {
    if (filteredImages)
      setCurrentImage((prev) => (prev + 1) % filteredImages.length); // Cycle through images
  };

  //TODO: does select jsx work?
  const imageList = images.map((filename, i) => (
    <Select key={uuidv4()} position={position}>
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
    </Select>
  ));

  return <>halloo{imageList}</>;
}
