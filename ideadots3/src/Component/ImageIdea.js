import React, { useEffect, useState } from "react";
import Draggable from "react-draggable";

export default function ImageIdea({
  setEnableCustomControls,
  hover,
  src,
  left,
  top,
  clicked,
}) {
  const handleMoveImage = (e) => {
    console.log("position:::", e.currentTarget);
  };

  useEffect(() => {
    console.log(" 2D image ", src);
  }, []);

  return (
    <div style={{ position: "fixed", width: "500px" }}>
      {clicked && (
        <Draggable>
          <div
            //onPointerOver={() => hover(true)}
            //onPointerLeave={() => hover(false)}
            // onMouseDown={(e) => (
            //   setEnableCustomControls(false), handleMoveImage(e)
            // )}
            //onMouseUp={() => setEnableCustomControls(true)}
            onMouseLeave={() => setEnableCustomControls(true)}
            onMouseOver={() => setEnableCustomControls(false)}
            style={{
              width: "auto",
              position: "absolute",
              // left: `${left}px`,
              // top: `${top}px`,
            }}
          >
            <div className="threedImage">
              <img
                draggable={false}
                style={{
                  height: "200px",
                  width: "200px",
                  borderRadius: "10%",
                }}
                src={src}
              ></img>
            </div>
          </div>
        </Draggable>
      )}
    </div>
  );
}
