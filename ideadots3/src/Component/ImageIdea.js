import React, { useState } from "react";
import Draggable from "react-draggable";

export default function ImageIdea({
  setEnableCustomControls,
  hover,
  image,
  left,
  top,
}) {
  const [scale, setScale] = useState(5);

  return (
    <div>
      <Draggable>
        <div
          onPointerOver={(i) => (hover(i), setScale(4))}
          onPointerLeave={() => (hover(null), setScale(3))}
          onMouseDown={() => setEnableCustomControls(false)}
          onMouseUp={() => setEnableCustomControls(true)}
          onMouseLeave={() => setEnableCustomControls(true)}
          onMouseOver={() => setEnableCustomControls(false)}
          className="contentContainer"
          // style={{
          //   translate: "-500px -500px",
          //   transform: `scale(${scale})`,
          // }}
          style={{
            position: "absolute",
            left: `${left}px`,
            top: `${top}px`,
            paddingBottom: "20px",
            width: "250px",
          }}
        >
          <div className="threedImage">
            <img
              draggable={false}
              style={{
                height: "400px",
                width: "400px",
              }}
              src={image}
            ></img>
          </div>
        </div>
      </Draggable>
    </div>
  );
}
