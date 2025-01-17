import React, { useState } from "react";
import Draggable from "react-draggable";

export default function ImageIdea({
  setEnableCustomControls,
  hover,
  image,
  left,
  top,
  clicked,
}) {
  return (
    <div style={{ position: "fixed", width: "500px" }}>
      {clicked && (
        <Draggable>
          <div
            onPointerOver={() => hover(true)}
            onPointerLeave={() => hover(false)}
            onMouseDown={() => setEnableCustomControls(false)}
            onMouseUp={() => setEnableCustomControls(true)}
            onMouseLeave={() => setEnableCustomControls(true)}
            onMouseOver={() => setEnableCustomControls(false)}
            style={{
              width: "auto",
              position: "absolute",
              left: `${left}px`,
              top: `${top}px`,
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
                src={image}
              ></img>
            </div>
          </div>
        </Draggable>
      )}
    </div>
  );
}
