import * as THREE from "three";

import React, {
  useEffect,
  useState,
  useContext,
  useLayoutEffect,
  useRef,
} from "react";
import Draggable from "react-draggable";
import { Sphere } from "@react-three/drei";
import { v4 as uuidv4 } from "uuid";
import { Html, Line } from "@react-three/drei";
import { SphereContext } from "./SphereContextProvider";

export default function ThreeDDot({
  position,
  text,
  id,
  activeIdea,
  setActiveIdea,
  setEnableCustomControls,
}) {
  const [ideaPosition, setideaPosition] = useState([
    position[0] * 2,
    position[1] * 2,
    position[2] * 2,
  ]);
  const [dotPosition, setDotPosition] = useState(position);
  const [hoverDot, setHoverDot] = useState(false);
  const [clicked, click] = useState(false);
  const sphereContext = useContext(SphereContext);

  useEffect(() => {
    if (activeIdea) {
      click(activeIdea.id === id ? true : false);
      console.log("!", clicked);
    }
  }, [activeIdea]);

  const handleClick = () => {
    const thisSphere = sphereContext.spheres.filter((s) => s.id === id);
    setActiveIdea(thisSphere);
    console.log("!", thisSphere);
  };

  return (
    <>
      {clicked && (
        <>
          <Draggable>
            <Html position={ideaPosition} key={uuidv4()} distanceFactor={10}>
              <div
                // onMouseEnter={() => setEnableCustomControls(false)}
                // onMouseLeave={() => setEnableCustomControls(true)}
                style={{
                  width: "200px",
                  height: "200px",
                  background: "red",
                  opacity: "50%",
                  borderRadius: "100px",
                  position: "absolute",
                  top: "-100px",
                  left: "-100px",
                }}
              ></div>

              <div className="threedDot">
                <p style={{ color: "white" }}> {activeIdea.text}</p>
              </div>
            </Html>
          </Draggable>
          <Line
            //ref={lineRef}
            points={[
              dotPosition,
              [ideaPosition[0], ideaPosition[1], ideaPosition[2]],
            ]}
            color="black"
            lineWidth={1}
            segments={false}
            dashed={false}
          />
          <Sphere
            onPointerOver={() => setHoverDot(true)}
            onPointerLeave={() => setHoverDot(false)}
            position={ideaPosition}
            scale={0.1}
          >
            <meshStandardMaterial
              color={hoverDot ? "rgb(55, 52, 255)" : "grey"}
            />
          </Sphere>{" "}
        </>
      )}
      <Sphere
        onClick={() => handleClick()}
        onPointerOver={() => setHoverDot(true)}
        onPointerLeave={() => setHoverDot(false)}
        position={dotPosition}
        scale={0.2}
      >
        <meshStandardMaterial color={hoverDot ? "rgb(55, 52, 255)" : "grey"} />
      </Sphere>
    </>
  );
}
