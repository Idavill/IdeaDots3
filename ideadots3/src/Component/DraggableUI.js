import React, { useEffect, useState, useContext } from "react";
import "../App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import image from "../Assets/shelf.jpg";
import Draggable from "react-draggable";
import { v4 as uuidv4 } from "uuid";
import { SphereContext } from "./SphereContextProvider";
import UploadAndDisplayImage from "./UploadAndDisplayImage";

function Idea({
  s,
  i,
  setActive,
  activeI,
  deleteThis,
  gizmo,
  setGizmo,
  sphereArray,
  setSphereArray,
  setTitleIsChanged,
  setTitleChangeId,
}) {
  const [isActive, setIsActive] = useState(false);
  const [img, setImg] = useState(null); // TOOD: or s.img?
  const [title, setTitle] = useState(s.title);
  const [text, setText] = useState(s.text);
  const context = useContext(SphereContext);
  const [images, setImages] = useState([]);

  const getImages = () => {
    console.log("Fetching images from localStorage...");
    for (var key in localStorage) {
      console.log("Checking key:", key); // Log each key
      if (key.endsWith("img")) {
        const searchString = key.replace("img", "");
        if (searchString === s.id) {
          const foundImage = localStorage.getItem(key);
          console.log(
            "Found image for ID:",
            searchString,
            "Value:",
            foundImage
          );
          setImg(foundImage);
          return; // Exit the function after setting the image
        }
      }
    }
    setImg(null); // Clear the image if not found
  };

  useEffect(() => {
    console.log("IMG HAS CHANGED", img);
  }, [img]);

  useEffect(() => {
    getImages();

    const titleId = s.id + "title";
    const textId = s.id + "text";

    const localStorageTitle = localStorage.getItem(titleId);
    const localStorageText = localStorage.getItem(textId);

    if (localStorageTitle) {
      setTitle(localStorageTitle);
    } else {
      setTitle(s.title);
    }

    if (localStorageText) {
      setText(localStorageText);
    } else {
      setText(s.text);
    }

    console.log("test ", images);
  }, []);

  useEffect(() => {
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

  //TODO: test this method especially if e is updated data
  const handleGo = () => {
    context.spheres.forEach((e) => {
      if (e.id == s.id) {
        setActive(e);
      }
    });
  };

  const handleRemoveIdea = () => {
    deleteThis(s);
  };

  //TODO: WHen title is edited, then context should
  const editTitle = (id, textContext) => {
    setIsActive(true);
    const titleId = id + "title";
    localStorage.setItem(titleId, textContext);
    sphereArray.forEach((sp) => {
      if (sp.id == id) {
        sp.title = textContext;
      }
    });

    setSphereArray(sphereArray);
    setTitleIsChanged(true);
    setTitleChangeId(id);
  };

  const editText = (id, textContext) => {
    setIsActive(true);
    s.text = textContext;
    const textId = id + "text";
    localStorage.setItem(textId, textContext);
  };

  const handleMoveClicked = () => {
    if (gizmo) {
      setGizmo(null);
    } else {
      setGizmo(s.id);
    }
  };

  return (
    <div
      key={i}
      onMouseOver={() => setIsActive(true)}
      onMouseLeave={() => setIsActive(false)}
      className="listcontent"
      style={{
        backgroundColor: isActive ? "rgb(55, 52, 255)" : "rgb(53, 53, 53)",
      }}
    >
      <h4
        id={`scrollspyHeading${i}`}
        contenteditable="true"
        onDoubleClick={(e) => {
          const range = document.createRange();
          range.selectNodeContents(e.currentTarget);
          const selection = window.getSelection();
          selection.removeAllRanges();
          selection.addRange(range);
        }}
        onInput={(e) => editTitle(s.id, e.currentTarget.textContent)}
      >
        {title}
      </h4>
      <p
        contenteditable="true"
        onDoubleClick={(e) => {
          const range = document.createRange();
          range.selectNodeContents(e.currentTarget);
          const selection = window.getSelection();
          selection.removeAllRanges();
          selection.addRange(range);
        }}
        onInput={(e) => editText(s.id, e.currentTarget.textContent)}
      >
        {text}
      </p>
      <UploadAndDisplayImage ideaId={s.id} displayButtons={true} />
      <div className="IdeaButtons">
        <button type="button" onClick={handleGo} class="btn btn-light">
          Go
        </button>
        <button
          type="button"
          onClick={handleMoveClicked}
          class="btn btn-light headerButton"
        >
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

function Overview({ s, i, scrollToIdea, titleIsChanged, titleChangeId }) {
  const [title, setTitle] = useState(s.title);
  useEffect(() => {
    if (titleChangeId == s.id) {
      setTitle(s.title);
    }
  }, [titleIsChanged]);

  useEffect(() => {
    const titleId = s.id + "title";
    const localStorageTitle = localStorage.getItem(titleId);

    if (localStorageTitle) {
      setTitle(localStorageTitle);
    } else {
      setTitle(s.title);
    }
  }, []);

  return (
    <ul class="nav nav-pills">
      <li class="nav-item">
        <a
          class="nav-link"
          href={`#scrollspyHeading${i}`}
          onClick={() => scrollToIdea(s, i)}
        >
          {title}
        </a>
      </li>
    </ul>
  );
}

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
          <div className="header">
            {/* <button
              type="button"
              onClick={handleAddIdea}
              class="btn btn-light headerButton"
            >
              +
            </button> */}
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
