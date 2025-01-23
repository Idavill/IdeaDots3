import React, { useEffect, useContext } from "react";
import { v4 as uuidv4 } from "uuid";
import { SphereContext } from "./SphereContextProvider";
import Sphere from "./Sphere";

export default function Content({
  activeIdea,
  setActiveIdea,
  zoom,
  setZoom,
  setFocus,
  newSphere,
  scrollToIdea,
  gizmo,
  controlsRef,
  setEnableCustomControls,
  isThreeDModeActive,
  isListModeActive,
  isDotModeActive,
}) {
  const context = useContext(SphereContext);

  useEffect(() => {
    if (newSphere) {
      addNewSphere(newSphere);
    }
  }, [newSphere]);

  const addNewSphere = (ns) => {
    const newS = {
      id: uuidv4(),
      position: { x: ns.x, y: ns.y, z: ns.z },
      title: "New Idea",
      text: "New Idea Text",
      img: "",
    };
    context.setSpheres((prevSpheres) => [...prevSpheres, newS]);
    const newSTitleID = newS.id + "title";
    const newSTextID = newS.id + "text";
    localStorage.setItem(newSTitleID, newS.title);
    localStorage.setItem(newSTextID, newS.text);
  };

  const sphereList = () => {
    const spheres = context.spheres || []; // Fallback to an empty array if undefined

    return spheres.map((s, i) => (
      <>
        <Sphere
          s={s}
          key={uuidv4()}
          id={s.id}
          amountOfSpheres={context.spheres.length}
          gizmo={gizmo}
          zoomToView={(focusRef) => (
            setZoom(!zoom), setFocus(focusRef), scrollToIdea(s, i)
          )}
          position={[s.position.x, s.position.y, s.position.z]}
          title={s.title}
          isThreeDModeActive={isThreeDModeActive}
          isDotModeActive={isDotModeActive}
          controlsRef={controlsRef}
          setEnableCustomControls={(e) => setEnableCustomControls(e)}
          activeIdea={activeIdea}
          setActiveIdea={(e) => setActiveIdea(e)}
          isListModeActive={isListModeActive}
        />
      </>
    ));
  };

  return <>{sphereList()} </>;
}
