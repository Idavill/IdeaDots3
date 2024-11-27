import React, { Suspense, useEffect, useRef, useState } from "react";
import "./App.css";
import API from "./Services/API";
import ThreeDContainer from "./Component/ThreeDContainer.js";

function Idea({ s, i, setActive }) {
  const [sphere, setSphere] = useState(s);

  const handleGo = () => {
    setActive(sphere);
  };

  return (
    <div key={i} className="listcontent">
      <div className="texts">
        <h4>{s.title}</h4>
      </div>
      <div className="texts">
        <p>{s.text}</p>
      </div>
      <button onClick={handleGo} className="textbutton">
        Go
      </button>
    </div>
  );
}

export default function App() {
  const [spheres, setSpheres] = useState([]);
  const [activeSphere, setActiveSphere] = useState(null);
  const [cameraTarget, setCameraTarget] = useState(null);
  const apiInstance = API();

  useEffect(() => {
    if (activeSphere) {
      console.log("active sphere: ", activeSphere);
      setCameraTarget(activeSphere);
    }
  }, [activeSphere]);

  useEffect(() => {
    getSphereData();
  }, []);

  const getSphereData = async () => {
    const spheres = apiInstance.handleGetLocalSpheresJsonData();

    if (spheres) {
      for (const s of spheres) {
        setSpheres((prevs) => [...prevs, s]);
      }
    } else {
      console.log("no spheres in App");
    }
  };

  const listContent = () => {
    if (spheres.length) {
    }
    return spheres.map((s, i) => (
      <Idea setActive={(s) => setActiveSphere(s)} s={s} i={i}></Idea>
    ));
  };

  return (
    <>
      <Suspense fallback={null}>
        <ThreeDContainer spheres={spheres} cameraTarget={cameraTarget} />
      </Suspense>
      <div className="header">{listContent()}</div>
    </>
  );
}
