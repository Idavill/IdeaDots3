import React, {
  Suspense,
  useEffect,
  useRef,
  useState,
  createContext,
  useContext,
} from "react";
import "../App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import image from "../Assets/shelf.jpg";
import Draggable from "react-draggable";
import { v4 as uuidv4 } from "uuid";
import { SphereContext } from "./SphereContextProvider";

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
  titleIsChanged,
  setTitleIsChanged,
  setTitleChangeId,
  TitleChangeId,
}) {
  const [sphere, setSphere] = useState(s);
  const [isActive, setIsActive] = useState(false);
  const [img, setImg] = useState(s.img);
  const [title, setTitle] = useState(s.title);
  const [text, setText] = useState(s.text);
  const context = useContext(SphereContext);

  useEffect(() => {
    console.log("CONTEXT IS: ", context);
  }, [context]);

  useEffect(() => {
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
  }, []);

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

  const handleGo = () => {
    context.spheres.forEach((e) => {
      if (e.id == s.id) {
        setActive(e); // context.spheres is not updated
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
        onInput={(e) => editTitle(s.id, e.currentTarget.textContent)}
      >
        {title}
      </h4>
      <p
        contenteditable="true"
        onInput={(e) => editText(s.id, e.currentTarget.textContent)}
      >
        {text}
      </p>

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

function Overview({
  s,
  i,
  activeSphere,
  setActiveSphere,
  scrollToIdea,
  sphereArray,
  titleIsChanged,
  titleChangeId,
}) {
  const [title, setTitle] = useState(s.title);
  useEffect(() => {
    if (titleChangeId == s.id) {
      console.log("inside overview, something about titles were changed");
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
  spheres,
  setSpheres,
  activeIdea,
  setActiveIdea,
  gizmo,
  setGizmo,
  sphereIsChanging,
  setSphereIsChanging,
}) {
  const context = useContext(SphereContext);
  const [titleChangeId, setTitleChangeId] = useState("");

  useEffect(() => {
    if (sphereIsChanging) {
      console.log("draggable UI");
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
      title: "",
      text: "",
      img: "",
    };
    context.setSpheres((prevs) => [newS, ...prevs]);
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
        sphereArray={context.spheres}
        setSphereArray={(e) => context.setSpheres(e)}
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
