import "../../App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import React, { useEffect, useState, useContext } from "react";
import Draggable from "react-draggable";
import { v4 as uuidv4 } from "uuid";
import { SphereContext } from "../Contexts/SphereContextProvider";
import Idea from "./Idea";
import Overview from "./Overview";

export default function DraggableUI({
  setActiveIdea,
  scrollToIdea,
  activeIdea,
  gizmo,
  setGizmo,
  titleIsChanged,
  setTitleIsChanged,
}) {
  const context = useContext(SphereContext);
  const [titleChangeId, setTitleChangeId] = useState("");

  useEffect(() => {
    if (titleIsChanged) {
      setTitleIsChanged(false);
    }
  }, [titleIsChanged]);

  const deleteIdea = (s) => {
    const newList = context.spheres.filter((sphere) => sphere.id !== s.id);
    context.setSpheres(newList);
  };

  useEffect(() => {
    console.log(spheres);
  }, [spheres]);

  const updateText = ({ id, text }) => {
    setSpheres((prevSpheres) =>
      prevSpheres.map((sphere) =>
        sphere.id === id ? { ...sphere, text } : sphere
      )
    );
  };

  const updateTitle = ({ id, title }) => {
    setSpheres((prevSpheres) =>
      prevSpheres.map((sphere) =>
        sphere.id === id ? { ...sphere, title } : sphere
      )
    );
  };

  const overview = () => {
    return context.spheres.map((s, i) => (
      <Overview
        updateTitle={(e) => updateTitle(e)}
        updateText={(e) => updateText(e)} // Pass the updateText function
        scrollToIdea={scrollToIdea}
        activeSphere={activeSphere}
        setActiveSphere={(e) => setActiveSphere(e)}
        s={s}
        i={i}
        //scrollToIdea={scrollToIdea}
        titleIsChanged={titleIsChanged}
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
        s={s}
        i={i}
        scrollToIdea={scrollToIdea}
        key={i}
        gizmo={gizmo}
        setGizmo={(e) => setGizmo(e)}
        activeIdea={activeIdea}
        setActiveIdea={(s) => setActiveIdea(s)}
        deleteIdea={(s) => deleteIdea(s)}
        setTitleIsChanged={(e) => setTitleIsChanged(e)}
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
