import { Suspense, useEffect, useState } from "react";
import "./App.css";
import ThreeDContainer from "./Component/MoodBoard/ThreeDContainer";
import "bootstrap/dist/css/bootstrap.min.css";
import DraggableUI from "./Component/Notebook/DraggableUI";
import { SphereContextProvider } from "./Component/Contexts/SphereContextProvider";
import { ImageContextProvider } from "./Component/Contexts/ImageContextProvider";
import { ActiveIdeaContextProvider } from "./Component/Contexts/ActiveIdeaContextProvider";
import { IdeaType } from "./Entities";
import Header from "./Component/Header";

export default function App() {
  const [titleIsChanged, setTitleIsChanged] = useState(false);
  const [cameraTarget, setCameraTarget] = useState<IdeaType | null>(null);
  const [activeIdea, setActiveIdea] = useState<IdeaType | null>(null);
  const [gizmo, setGizmo] = useState<string | null>(null);
  const [isListModeActive, setIsListModeActive] = useState(false);
  const [isThreeDModeActive, setIsThreeDModeActive] = useState(false);
  const [isDotModeActive, setIsDotModeActive] = useState(false);
  const [dotModeButtonText, setDotModeButtonText] = useState("dot-mode");
  const [modelListViewButtonText, setModelListViewButtonText] =
    useState("model-focus-mode");
  const [spatialModeButtonText, setSpatialModeButtonText] = useState("3D");
  //const [imageSrcList, setImageSrcList] = useState([]);

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

  useEffect(() => {
    if (activeIdea && activeIdea.position) {
      setActiveIdea(activeIdea);
      setCameraTarget(activeIdea);
      console.log("active Idea is: ", activeIdea);
    }
  }, [activeIdea]);

  const scrollToIdea = (s: IdeaType, i: number) => {
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
        <ImageContextProvider>
          <ActiveIdeaContextProvider>
            <Header
              modelListViewButtonText={modelListViewButtonText}
              isListModeActive={isListModeActive}
              setIsListModeActive={setIsListModeActive}
              isThreeDModeActive={isThreeDModeActive}
              spatialModeButtonText={spatialModeButtonText}
              setIsThreeDModeActive={setIsThreeDModeActive}
              dotModeButtonText={dotModeButtonText}
              //setDotModeButtonText={setDotModeButtonText}
              isDotModeActive={isDotModeActive}
              setIsDotModeActive={setIsDotModeActive}
            />
            <Suspense fallback={null}>
              <ThreeDContainer
                isListModeActive={isListModeActive}
                gizmo={gizmo}
                scrollToIdea={(idea: IdeaType, i: number) =>
                  scrollToIdea(idea, i)
                }
                setActiveIdea={(idea: IdeaType) => setActiveIdea(idea)}
                activeIdea={activeIdea}
                cameraTarget={cameraTarget}
                isThreeDModeActive={isThreeDModeActive}
                isDotModeActive={isDotModeActive}
              />
            </Suspense>
            {isListModeActive ? (
              <DraggableUI
                scrollToIdea={(idea: IdeaType, i: number) =>
                  scrollToIdea(idea, i)
                }
                //activeIdea={activeIdea}
                //setActiveIdea={(idea:IdeaType) => setActiveIdea(idea)}
                gizmo={gizmo}
                setGizmo={(id: string) => setGizmo(id)}
                titleIsChanged={titleIsChanged}
                setTitleIsChanged={(bool: boolean) => setTitleIsChanged(bool)}
              />
            ) : null}
          </ActiveIdeaContextProvider>
        </ImageContextProvider>
      </SphereContextProvider>
    </>
  );
}
