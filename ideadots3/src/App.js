import React, { Suspense, useEffect, useState } from "react";
import "./App.css";
import ThreeDContainer from "./Component/ThreeDContainer.js";
import "bootstrap/dist/css/bootstrap.min.css";
import DraggableUI from "./Component/DraggableUI.js";
import { SphereContextProvider } from "./Component/SphereContextProvider.js";
import Header from "./Component/Header.js";

export default function App() {
  const [titleIsChanged, setTitleIsChanged] = useState(false);
  const [cameraTarget, setCameraTarget] = useState(null);
  const [activeIdea, setActiveIdea] = useState(null);
  const [gizmo, setGizmo] = useState(null);
  const [isListModeActive, setIsListModeActive] = useState(false);
  const [viewModeButton, setViewModeButton] = useState("view model-mode");

  useEffect(() => {
    setViewModeButton(isListModeActive ? "view model-mode" : "view list-mode");
  }, [isListModeActive]);

  useEffect(() => {
    if (activeIdea && activeIdea.position) {
      setActiveIdea(activeIdea);
      setCameraTarget(activeIdea);
    }
  }, [activeIdea]);

  const scrollToIdea = (s, i) => {
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
        <Header
          activeIdea={activeIdea}
          viewModeButton={viewModeButton}
          isListModeActive={isListModeActive}
          setIsListModeActive={setIsListModeActive}
        />
        <Suspense fallback={null}>
          <ThreeDContainer
            isListModeActive={isListModeActive}
            gizmo={gizmo}
            scrollToIdea={(s, i) => scrollToIdea(s, i)}
            setActiveIdea={(s) => setActiveIdea(s)}
            activeIdea={activeIdea}
            cameraTarget={cameraTarget}
          />
        </Suspense>
        {isListModeActive ? (
          <DraggableUI
            scrollToIdea={scrollToIdea}
            activeIdea={activeIdea}
            setActiveIdea={(e) => setActiveIdea(e)}
            gizmo={gizmo}
            setGizmo={(e) => setGizmo(e)}
            titleIsChanged={titleIsChanged}
            setTitleIsChanged={(e) => setTitleIsChanged(e)}
          />
        ) : null}
      </SphereContextProvider>
    </>
  );
}
