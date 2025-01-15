import React, { useState } from "react";
import Draggable from "react-draggable";

export default function ImageIdea({ setEnableCustomControls, hover, image }) {
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
          //style={{ position: "absolute" }}
          style={{
            translate: "-500px -500px",
            transform: `scale(${scale})`,
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
