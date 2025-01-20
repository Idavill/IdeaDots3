import React, { useState, useContext, useEffect } from "react";
import Draggable from "react-draggable";
import { Sphere } from "@react-three/drei";
import { v4 as uuidv4 } from "uuid";
import { Html, Line } from "@react-three/drei";
import { SphereContext } from "./SphereContextProvider";
import { ActiveIdeaContext } from "./ActiveIdeaContextProvider";
import ThreeDImage from "./ThreeDImage";

export default function ThreeDDot({
  s,
  position,
  id,
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
  const ideaContext = useContext(ActiveIdeaContext);
  const thisSphere = sphereContext.spheres.filter((s) => s.id === id); // pass prop down instead?

  useEffect(() => {
    if (ideaContext.activeIdea) {
      if (ideaContext.activeIdea.id === s.id) {
        click(true);
      } else {
        click(false);
      }
    }
  }, [ideaContext]);

  useEffect(() => {
    if (clicked) {
      ideaContext.setActiveIdea(thisSphere[0]);
    }
  }, [clicked]);

  const handleClick = () => {
    click(true);
    // if (clicked) {
    //   const thisSphere = sphereContext.spheres.filter((s) => s.id === id);
    //   ideaContext.setActiveIdea(thisSphere[0]);
    // }
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
                  display: "flex",
                  justifyItems: "center",
                  justifyContent: "center",
                  width: "200px",
                  height: "200px",
                  //background: "red",
                  opacity: "50%",
                  borderRadius: "100px",
                  position: "absolute",
                  top: "-100px",
                  left: "-100px",
                }}
              ></div>

              <div className="threedDot">
                <p
                  style={{
                    color: "white",
                    display: "flex",
                    justifySelf: "center",
                  }}
                >
                  {" "}
                  {s.text}
                </p>
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
            // onPointerOver={() => setHoverDot(true)}
            // onPointerLeave={() => setHoverDot(false)}
            position={ideaPosition}
            scale={0.1}
          >
            <meshStandardMaterial color={"grey"} />
          </Sphere>{" "}
          <ThreeDImage
            id={id}
            setEnableCustomControls={setEnableCustomControls}
            ideaId={id}
            position={ideaPosition}
            scale={0.1}
            dimensions={[150, 150]}
          ></ThreeDImage>
        </>
      )}
      <Sphere onClick={() => handleClick()} position={dotPosition} scale={0.2}>
        <meshStandardMaterial
          color={hoverDot || clicked ? "rgb(55, 52, 255)" : "grey"}
        />
      </Sphere>
    </>
  );
}
