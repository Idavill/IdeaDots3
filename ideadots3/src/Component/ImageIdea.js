import React, { useEffect, useState } from "react";
import Draggable from "react-draggable";

export default function ImageIdea({ setEnableCustomControls, src, clicked }) {
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
            onMouseLeave={() => setEnableCustomControls(true)}
            onMouseOver={() => setEnableCustomControls(false)}
            style={{
              width: "auto",
              position: "absolute",
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
