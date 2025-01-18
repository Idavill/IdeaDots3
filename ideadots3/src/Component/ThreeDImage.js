import { Billboard, Image } from "@react-three/drei";
import React, { useContext } from "react";
import { v4 as uuidv4 } from "uuid";
import { ImageContext } from "./ImageContextProvider";
import ImageIdea from "./ImageIdea.js";
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
    <group key={uuidv4()} position={position}>
      <Billboard key={uuidv4()}>
        <Image
          key={uuidv4()}
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
      <Html key={uuidv4()} distanceFactor={distanceFactorForZoom}>
        <div className="threedImage">
          <img
            draggable={false}
            style={{
              height: "200px",
              width: "200px",
              borderRadius: "10%",
            }}
            src={`./Assets/${filename.src}`}
          ></img>
        </div>
        {/* <ImageIdea
          setEnableCustomControls={setEnableCustomControls}
          hover={hover}
          //image={URL.createObjectURL(src)}
          src={`./Assets/${filename.src}`}
          //left={left}
          //top={top}
          clicked={clicked}
        /> */}

        {/* <DisplayImage
          key={uuidv4()}
          filename={filename}
          ideaId={ideaId}
          hover={hover}
          clicked={clicked}
          setEnableCustomControls={setEnableCustomControls}
          setScale={setScale}
          scale={scale}
        /> */}
      </Html>
    </group>
  ));

  return <>halloo{imageList}</>;
}
