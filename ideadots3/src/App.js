import React, { Suspense, useEffect, useRef, useState } from "react";
import "./App.css";
import Draggable from "react-draggable";
import API from "./Services/API";
import ThreeDContainer from "./Component/ThreeDContainer.js";

function Idea({ s, i, setActive, setActiveI }) {
  const [sphere, setSphere] = useState(s);
  const [activeIdea, setActiveIdea] = useState(false);

  useEffect(() => {
    if (setActiveI) {
      if (setActiveI.position == s.position) {
        console.log("matches position", s.position);
        setActiveIdea(true);
      } else {
        setActiveIdea(false);
      }
    }
  }, [setActiveI]);

  const handleGo = () => {
    setActive(sphere);
  };

  return (
    <div
      key={i}
      className="listcontent"
      // style={{ border: activeIdea ? "3px solid" : "1px solid" }}
      style={{
        backgroundColor: activeIdea ? "rgb(55, 52, 255)" : "rgb(53, 53, 53)",
      }}
    >
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

function Overview({ s, i }) {
  return (
    <div className="overviewlist">
      <h4 className="overviewtext">{s.title}</h4>
    </div>
  );
}

export default function App() {
  const [spheres, setSpheres] = useState([]);
  const [activeSphere, setActiveSphere] = useState(null);
  const [cameraTarget, setCameraTarget] = useState(null);
  const [activeIdea, setActiveIdea] = useState(null);

  const apiInstance = API();

  useEffect(() => {
    console.log("inside app, possibly a circle was clicked", activeIdea);
    if (activeIdea) {
    }
  }, [activeIdea]);

  useEffect(() => {
    if (activeSphere) {
      console.log("active sphere: ", activeSphere);
      setCameraTarget(activeSphere);
      setActiveIdea(activeSphere);
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

  const overview = () => {
    return spheres.map((s, i) => <Overview s={s} i={i}></Overview>);
  };

  const listContent = () => {
    return spheres.map((s, i) => (
      <Idea
        setActiveI={activeIdea}
        setActive={(s) => setActiveSphere(s)}
        s={s}
        i={i}
      ></Idea>
    ));
  };

  return (
    <>
      <Suspense fallback={null}>
        <ThreeDContainer
          spheres={spheres}
          setActiveIdea={(s) => setActiveIdea(s)}
          cameraTarget={cameraTarget}
        />
      </Suspense>
      <div className="header">
        <div className="overviewContainer"> {overview()}</div>
        <div className="overviewContainer">{listContent()}</div>
      </div>
    </>
  );
}
