import { Billboard, Image } from "@react-three/drei";
import { v4 as uuidv4 } from "uuid";
import { Html } from "@react-three/drei";

export default function ThreeDDotImage({
  position,
  offset,
  onClick,
  onPointerOver,
  onPointerOut,
  scale,
  dimensions,
  isThreeDModeActive,
  filename,
}) {
  return (
    <>
      halloo{" "}
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
                  top: `${offset[1]}px`,
                  left: `${offset[0]}px`,
                  borderRadius: "10%",
                }}
                src={`./Assets/${filename.src}`}
              ></img>
            </div>
          </Html>
        )}
      </group>
    </>
  );
}
