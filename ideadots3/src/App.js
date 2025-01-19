import React, { Suspense, useEffect, useState } from "react";
import "./App.css";
import ThreeDContainer from "./Component/ThreeDContainer.js";
import "bootstrap/dist/css/bootstrap.min.css";
import DraggableUI from "./Component/DraggableUI.js";
import { SphereContextProvider } from "./Component/SphereContextProvider.js";
import { ImageContextProvider } from "./Component/ImageContextProvider.js";
import { ActiveSphereContextProvider } from "./Component/ActiveSphereContextProvider.js";

import Header from "./Component/Header.js";

export default function App() {
  const [titleIsChanged, setTitleIsChanged] = useState(false);
  const [cameraTarget, setCameraTarget] = useState(null);
  const [activeIdea, setActiveIdea] = useState(null);
  const [gizmo, setGizmo] = useState(null);
  const [isListModeActive, setIsListModeActive] = useState(false);
  const [isThreeDModeActive, setIsThreeDModeActive] = useState(false);
  const [isDotModeActive, setIsDotModeActive] = useState(false);
  const [dotModeButtonText, setDotModeButtonText] = useState("dot-mode");
  const [modelListViewButtonText, setModelListViewButtonText] =
    useState("model-focus-mode");
  const [spatialModeButtonText, setSpatialModeButtonText] = useState("3D");
  const [imageSrcList, setImageSrcList] = useState([]);

  useEffect(() => {
    setModelListViewButtonText(
      isListModeActive ? "list-mode" : "model-focus-mode"
    );
  }, [isListModeActive]);

  useEffect(() => {
    setSpatialModeButtonText(isThreeDModeActive ? "3D" : "2D");
  }, [isThreeDModeActive]);

  useEffect(() => {
    setDotModeButtonText(isDotModeActive ? "image-mode" : "dot-mode");
  }, [isDotModeActive]);

  useEffect(() => {
    if (activeIdea && activeIdea.position) {
      setActiveIdea(activeIdea);
      setCameraTarget(activeIdea);
      console.log("active Idea is: ", activeIdea);
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
        <ImageContextProvider value={{ imageSrcList, setImageSrcList }}>
          <ActiveSphereContextProvider>
            <Header
              activeIdea={activeIdea}
              modelListViewButtonText={modelListViewButtonText}
              isListModeActive={isListModeActive}
              setIsListModeActive={setIsListModeActive}
              isThreeDModeActive={isThreeDModeActive}
              spatialModeButtonText={spatialModeButtonText}
              setIsThreeDModeActive={setIsThreeDModeActive}
              dotModeButtonText={dotModeButtonText}
              setDotModeButtonText={setDotModeButtonText}
              isDotModeActive={isDotModeActive}
              setIsDotModeActive={setIsDotModeActive}
            />
            <Suspense fallback={null}>
              <ThreeDContainer
                isListModeActive={isListModeActive}
                gizmo={gizmo}
                scrollToIdea={(s, i) => scrollToIdea(s, i)}
                setActiveIdea={(s) => setActiveIdea(s)}
                activeIdea={activeIdea}
                cameraTarget={cameraTarget}
                isThreeDModeActive={isThreeDModeActive}
                isDotModeActive={isDotModeActive}
              />
            </Suspense>
            {isListModeActive ? (
              <DraggableUI
                scrollToIdea={(s, i) => scrollToIdea(s, i)}
                activeIdea={activeIdea}
                setActiveIdea={(e) => setActiveIdea(e)}
                gizmo={gizmo}
                setGizmo={(e) => setGizmo(e)}
                titleIsChanged={titleIsChanged}
                setTitleIsChanged={(e) => setTitleIsChanged(e)}
              />
            ) : null}
          </ActiveSphereContextProvider>
        </ImageContextProvider>
      </SphereContextProvider>
    </>
  );
}
