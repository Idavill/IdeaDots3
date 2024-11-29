import React, { Suspense, useEffect, useRef, useState } from "react";
import "./App.css";
import API from "./Services/API";
import ThreeDContainer from "./Component/ThreeDContainer.js";
import "bootstrap/dist/css/bootstrap.min.css";
import image from "./Assets/shelf.jpg";
import Draggable from "react-draggable";
import { v4 as uuidv4 } from "uuid";

function Idea({ s, i, setActive, activeI, deleteThis }) {
  const [sphere, setSphere] = useState(s);
  const [isActive, setIsActive] = useState(false);
  const [img, setImg] = useState(s.img);

  useEffect(() => {
    console.log("imag ", img);
    if (
      activeI &&
      activeI.x === s.position.x &&
      activeI.y === s.position.y &&
      activeI.z === s.position.z
    ) {
      setIsActive(true);
    } else {
      setIsActive(false);
    }
  }, [activeI]);

  const scrollToIdea = () => {};

  const handleGo = () => {
    setActive(sphere);
  };

  const handleRemoveIdea = () => {
    deleteThis(s);
  };

  const editIdea = (id, textContext) => {
    console.log("parameters : ", id, textContext);
    setIsActive(true);

    // save to local storage
  };

  return (
    <div
      key={i}
      onMouseOver={() => setIsActive(true)}
      onMouseLeave={() => setIsActive(false)}
      contenteditable="true"
      onInput={(e) => editIdea(s.id, e.currentTarget.textContent)}
      className="listcontent"
      style={{
        backgroundColor: isActive ? "rgb(55, 52, 255)" : "rgb(53, 53, 53)",
      }}
    >
      <h4 id={`scrollspyHeading${i}`}>{s.title}</h4>
      <p>{s.text}</p>

      {img != "" ? (
        <div className="square">
          <img
            style={{ display: "flex", width: "100%", height: "auto" }} // Set width to 100% and height to auto
            src={image}
            class=""
            alt="..."
          ></img>
        </div>
      ) : null}
      <div className="IdeaButtons">
        <button type="button" onClick={handleGo} class="btn btn-light">
          Go
        </button>
        <button type="button" class="btn btn-light headerButton">
          Move
        </button>
        <button
          type="button"
          onClick={handleRemoveIdea}
          class="btn btn-light headerButton"
        >
          -
        </button>
      </div>
    </div>
  );
}

function Overview({ s, i, activeSphere, setActiveSphere, scrollToIdea }) {
  return (
    <ul class="nav nav-pills">
      <li class="nav-item">
        <a
          class="nav-link"
          href={`#scrollspyHeading${i}`}
          onClick={() => scrollToIdea(s, i)}
        >
          {s.title}
        </a>
      </li>
    </ul>
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
      setActiveIdea(activeIdea);
    }
  }, [activeIdea]);

  useEffect(() => {
    if (activeSphere) {
      console.log("active sphere: ", activeSphere);
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

  const overview = () => {
    return spheres.map((s, i) => (
      <Overview
        scrollToIdea={scrollToIdea}
        activeSphere={activeSphere}
        setActiveSphere={(e) => setActiveSphere(e)}
        s={s}
        i={i}
      ></Overview>
    ));
  };

  const deleteIdea = (s) => {
    console.log("delete s ", s);
    const newList = spheres.filter((sphere) => sphere.id !== s.id);
    setSpheres(newList);
  };

  const listContent = () => {
    return spheres.map((s, i) => (
      <Idea
        key={i}
        activeI={activeIdea}
        setActive={(s) => setActiveSphere(s)}
        s={s}
        i={i}
        deleteThis={(s) => deleteIdea(s)}
      ></Idea>
    ));
  };

  const handleAddIdea = () => {
    const newS = {
      id: uuidv4(),
      position: { x: 0, y: 0, z: 0 },
      title: "",
      text: "",
      img: "",
    };
    setSpheres((prevs) => [newS, ...prevs]);
    console.log("ADD");
  };

  return (
    <>
      <Suspense fallback={null}>
        <ThreeDContainer
          scrollToIdea={(s, i) => scrollToIdea(s, i)}
          sphere={spheres}
          setSpheres={(e) => setSpheres(e)}
          setActiveIdea={(s) => setActiveIdea(s)}
          activeIdea={activeIdea}
          cameraTarget={cameraTarget}
        />
      </Suspense>
      <Draggable>
        <div className="mainContainer">
          <div className="header">
            <button
              type="button"
              onClick={handleAddIdea}
              class="btn btn-light headerButton"
            >
              +
            </button>
          </div>
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
