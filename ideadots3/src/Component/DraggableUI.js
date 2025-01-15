import React, { useEffect, useState, useContext } from "react";
import "../App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Draggable from "react-draggable";
import { v4 as uuidv4 } from "uuid";
import { SphereContext } from "./SphereContextProvider";
import Idea from "./Idea";
import Overview from "./Overview";

export default function DraggableUI({
  activeSphere,
  setActiveSphere,
  scrollToIdea,
  activeIdea,
  gizmo,
  setGizmo,
  sphereIsChanging,
  setSphereIsChanging,
}) {
  const context = useContext(SphereContext);
  const [titleChangeId, setTitleChangeId] = useState("");

  useEffect(() => {
    if (sphereIsChanging) {
      setSphereIsChanging(false);
    }
  }, [sphereIsChanging]);

  const deleteIdea = (s) => {
    const newList = context.spheres.filter((sphere) => sphere.id !== s.id);
    context.setSpheres(newList);
  };

  const overview = () => {
    return context.spheres.map((s, i) => (
      <Overview
        scrollToIdea={scrollToIdea}
        activeSphere={activeSphere}
        setActiveSphere={(e) => setActiveSphere(e)}
        s={s}
        sphereArray={context.spheres}
        i={i}
        titleIsChanged={sphereIsChanging}
        titleChangeId={titleChangeId}
      ></Overview>
    ));
  };

  const handleAddIdea = () => {
    const newS = {
      id: uuidv4(),
      position: { x: 0, y: 0, z: 0 },
      title: "New Idea",
      text: "New Idea Text",
      img: "",
    };
    context.setSpheres((prevs) => [...prevs, newS]);
    const newSTitleID = newS.id + "title";
    const newSTextID = newS.id + "text";
    localStorage.setItem(newSTitleID, newS.title);
    localStorage.setItem(newSTextID, newS.text);
  };

  const listContent = () => {
    return context.spheres.map((s, i) => (
      <Idea
        gizmo={gizmo}
        setGizmo={(e) => setGizmo(e)}
        key={i}
        activeI={activeIdea}
        setActive={(s) => setActiveSphere(s)}
        s={s}
        i={i}
        deleteThis={(s) => deleteIdea(s)}
        setSpheres={(e) => context.setSpheres(e)}
        sphereArray={context.spheres} // redundant, need to call context.spheres inside idea
        setSphereArray={(e) => context.setSpheres(e)} // thereby also this is reduncant
        titleIsChanged={sphereIsChanging}
        setTitleIsChanged={(e) => setSphereIsChanging(e)}
        titleChangeId={titleChangeId}
        setTitleChangeId={(e) => setTitleChangeId(e)}
      ></Idea>
    ));
  };

  return (
    <>
      <Draggable>
        <div className="mainContainer">
          <div className="header"></div>
          <div className="contentContainer">
            <div className="overviewContainer">
              <nav id="navbar-example2" class="navbar px-3 mb-3">
                <ul class="nav nav-pills">{overview()}</ul>
              </nav>
            </div>
            <div className="overviewContainer">
              {" "}
              <div
                data-bs-spy="scroll"
                data-bs-target="#navbar-example2"
                data-bs-root-margin="0px 0px -40%"
                data-bs-smooth-scroll="true"
                class="scrollspy-example p-3 rounded-2"
                tabIndex={0}
              >
                {listContent()}
              </div>
            </div>
          </div>
        </div>
      </Draggable>
    </>
  );
}
