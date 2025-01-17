import React, { Suspense, useEffect, useState } from "react";
import "./App.css";
import ThreeDContainer from "./Component/ThreeDContainer.js";
import "bootstrap/dist/css/bootstrap.min.css";
import DraggableUI from "./Component/DraggableUI.js";
import { SphereContextProvider } from "./Component/SphereContextProvider.js";
export default function App() {
  const [sphereIsChanging, setSphereIsChanging] = useState(false);
  const [activeSphere, setActiveSphere] = useState(null);
  const [cameraTarget, setCameraTarget] = useState(null);
  const [activeIdea, setActiveIdea] = useState(null);
  const [gizmo, setGizmo] = useState(null);
  const [listActive, setListActive] = useState(false);
  const [modeButtonTest, setModeButtonTest] = useState("view model-mode");

  useEffect(() => {
    if (listActive) {
      setModeButtonTest("view model-mode");
    } else {
      setModeButtonTest("view list-mode");
    }
  }, [listActive]);

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
      <SphereContextProvider>
        <button onClick={() => setListActive(!listActive)}>
          {modeButtonTest}
        </button>
        <Suspense fallback={null}>
          <ThreeDContainer
            listActive={listActive}
            gizmo={gizmo}
            scrollToIdea={(s, i) => scrollToIdea(s, i)}
            setActiveIdea={(s) => setActiveIdea(s)}
            activeIdea={activeIdea}
            cameraTarget={cameraTarget}
          />
        </Suspense>
        {listActive ? (
          <DraggableUI
            activeSphere={activeSphere}
            setActiveSphere={(e) => setActiveSphere(e)}
            scrollToIdea={scrollToIdea}
            activeIdea={activeIdea}
            setActiveIdea={(e) => setActiveIdea(e)}
            gizmo={gizmo}
            setGizmo={(e) => setGizmo(e)}
            sphereIsChanging={sphereIsChanging}
            setSphereIsChanging={(e) => setSphereIsChanging(e)}
          />
        ) : null}
      </SphereContextProvider>
    </>
  );
}
