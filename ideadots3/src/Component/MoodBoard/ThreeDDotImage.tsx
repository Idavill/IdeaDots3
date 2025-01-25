import { Billboard, Image, Select } from "@react-three/drei";
import { v4 as uuidv4 } from "uuid";
import { Html } from "@react-three/drei";
import { Vector3 } from "three";
import { ImageType } from "../../Entities";

interface ThreeDDotImageProps {
  position: Vector3;
  offset: number[];
  //onClick: (e: any) => void;
  //onPointerOver:()
  //onPointerOut,
  scale: number;
  dimensions: number[];
  isThreeDModeActive: boolean;
  filename: ImageType;
}

export default function ThreeDDotImage({
  position,
  offset,
  //onClick,
  //onPointerOver,
  //onPointerOut,
  scale,
  dimensions,
  isThreeDModeActive,
  filename,
}: ThreeDDotImageProps) {
  return (
    <>
      <Select key={uuidv4()} position={position}>
        {isThreeDModeActive ? (
          <Billboard key={uuidv4()}>
            <Image
              key={uuidv4()}
              //onClick={onClick}
              //onPointerOver={onPointerOver}
              //onPointerOut={onPointerOut}
              transparent
              radius={0.3}
              scale={scale}
              url={`./Assets/${filename.src}`}
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
                  top: `${offset[1]}px`,
                  left: `${offset[0]}px`,
                  borderRadius: "10%",
                }}
                src={`./Assets/${filename.src}`}
              ></img>
            </div>
          </Html>
        )}
      </Select>
    </>
  );
}
