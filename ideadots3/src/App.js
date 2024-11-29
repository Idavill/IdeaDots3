import React, { Suspense, useEffect, useRef, useState } from "react";
import "./App.css";
import ThreeDContainer from "./Component/ThreeDContainer.js";
import "bootstrap/dist/css/bootstrap.min.css";
import image from "./Assets/shelf.jpg";
import Draggable from "react-draggable";
import { v4 as uuidv4 } from "uuid";
import API from "./Services/API";
import DraggableUI from "./Component/DraggableUI.js";

export default function App() {
  const [spheres, setSpheres] = useState([]);
  const [activeSphere, setActiveSphere] = useState(null);
  const [cameraTarget, setCameraTarget] = useState(null);
  const [activeIdea, setActiveIdea] = useState(null);
  const [gizmo, setGizmo] = useState(null);
  const apiInstance = API();

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

  useEffect(() => {
    if (gizmo) {
      console.log("gizmo: ", gizmo);
    } else {
      console.log("gizmo null");
    }
  }, [gizmo]);

  useEffect(() => {
    if (activeIdea) {
      setActiveIdea(activeIdea);
    }
  }, [activeIdea]);

  useEffect(() => {
    if (activeSphere) {
      setCameraTarget(activeSphere);
      setActiveIdea(activeSphere);
    }
  }, [activeSphere]);

  const scrollToIdea = (s, i) => {
    setActiveSphere(s);
    setActiveIdea(s);
    //event.preventDefault(); // Prevent default anchor click behavior
    const target = document.getElementById(`scrollspyHeading${i}`);
    const body = document.body;
    console.log(body);
    if (target) {
      target.scrollIntoView({ behavior: "smooth" }); // Smooth scroll to the target
      window.scrollTo(2, 0);
    }
  };

  return (
    <>
      <Suspense fallback={null}>
        <ThreeDContainer
          gizmo={gizmo}
          scrollToIdea={(s, i) => scrollToIdea(s, i)}
          sphere={spheres}
          setSpheres={(e) => setSpheres(e)}
          setActiveIdea={(s) => setActiveIdea(s)}
          activeIdea={activeIdea}
          cameraTarget={cameraTarget}
        />
      </Suspense>
      <DraggableUI
        activeSphere={activeSphere}
        setActiveSphere={(e) => setActiveSphere(e)}
        scrollToIdea={scrollToIdea}
        spheres={spheres}
        setSpheres={(e) => setSpheres(e)}
        activeIdea={activeIdea}
        setActiveIdea={(e) => setActiveIdea(e)}
        gizmo={gizmo}
        setGizmo={(e) => setGizmo(e)}
      />
    </>
  );
}
