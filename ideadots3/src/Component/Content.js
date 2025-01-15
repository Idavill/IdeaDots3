import React, { useEffect, useContext } from "react";
import { v4 as uuidv4 } from "uuid";
import { SphereContext } from "./SphereContextProvider";
import Sphere from "./Sphere";

export default function Content({
  zoom,
  setZoom,
  setFocus,
  focusSphere,
  newSphere,
  scrollToIdea,
  gizmo,
  listActive,
  controlsRef,
  currentZoom,
  enableCustomControls,
  setEnableCustomControls,
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
    return context.spheres.map((s, i) => (
      <>
        <Sphere
          listActive={listActive}
          gizmo={gizmo}
          zoomToView={(focusRef) => (
            setZoom(!zoom), setFocus(focusRef), scrollToIdea(s, i)
          )}
          key={i}
          position={[s.position.x, s.position.y, s.position.z]}
          title={s.title}
          text={s.text}
          focus={focusSphere}
          id={s.id}
          controlsRef={controlsRef}
          currentZoom={currentZoom}
          enableCustomControls={enableCustomControls}
          setEnableCustomControls={(e) => setEnableCustomControls(e)}
          image={s.img}
        />
      </>
    ));
  };

  return <>{sphereList()} </>;
}
