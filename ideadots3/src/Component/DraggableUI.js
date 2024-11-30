import React, {
  setSelectionRange,
  Suspense,
  useEffect,
  useRef,
  useState,
} from "react";
import "../App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import image from "../Assets/shelf.jpg";
import Draggable from "react-draggable";
import { v4 as uuidv4 } from "uuid";

function Idea({
  updateText,
  updateTitle,
  s,
  i,
  setActive,
  activeI,
  deleteThis,
  gizmo,
  setGizmo,
}) {
  const [sphere, setSphere] = useState(s);
  const [isActive, setIsActive] = useState(false);
  const [img, setImg] = useState(s.img);
  const [moveButtonText, setMoveButtonText] = useState("Move Sphere");
  const titleRef = useRef(null); // Create a ref for the title element

  const handleEditText = (newText) => {
    const result = { id: s.id, text: newText };
    updateText(result);
  };

  const handleEditTitle = (e) => {
    const newTitle = e.currentTarget.textContent;

    const start = e.target.selectionStart;
    const end = e.target.selectionEnd;

    titleRef.current.setSelectionRange(start, end);

    const result = { id: s.id, title: newTitle };
    updateTitle(result);
    //titleRef.current.focus(); // Keep the focus on the title element
  };

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
    setActive(sphere);
  };

  const handleRemoveIdea = () => {
    deleteThis(s);
  };

  const editTitle = (id, textContext) => {
    setIsActive(true);
    console.log(textContext);
    // save to local storage
  };

  const handleMoveClicked = () => {
    if (gizmo) {
      setGizmo(null);
      setMoveButtonText("Move Sphere");
    } else {
      setGizmo(s.id);
      setMoveButtonText("Save Postition");
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
      {/* <h4
        ref={titleRef} // Attach the ref to the h4 element
        id={`scrollspyHeading${i}`}
        contenteditable="true"
        onInput={(e) => {
          //e.preventDefault(); // Prevent default behavior
          handleEditTitle(e);
          //setIsActive(true);
        }}
      >
        {s.title}
      </h4> */}
      <textarea
        ref={titleRef} // Attach the ref to the h4 element
        id={`scrollspyHeading${i}`}
        contenteditable="true"
        onInput={(e) => {
          //e.preventDefault(); // Prevent default behavior
          handleEditTitle(e);
          //setIsActive(true);
        }}
      >
        {s.title}
      </textarea>
      <p
        contenteditable="true"
        onInput={(e) => handleEditText(e.currentTarget.textContent)}
      >
        {s.text}
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
          {moveButtonText}
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
  updateText,
  s,
  i,
  activeSphere,
  setActiveSphere,
  scrollToIdea,
}) {
  const handleEditText = (newText) => {
    updateText(s.id, newText); // Call the function to update text
  };

  return (
    <ul class="nav nav-pills">
      <li class="nav-item">
        <a
          class="nav-link"
          href={`#scrollspyHeading${i}`}
          onClick={() => scrollToIdea(s, i) && handleEditText}
        >
          {s.title}
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
}) {
  const deleteIdea = (s) => {
    console.log("delete s ", s);
    const newList = spheres.filter((sphere) => sphere.id !== s.id);
    setSpheres(newList);
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
    return spheres.map((s, i) => (
      <Overview
        updateTitle={(e) => updateTitle(e)}
        updateText={(e) => updateText(e)} // Pass the updateText function
        scrollToIdea={scrollToIdea}
        activeSphere={activeSphere}
        setActiveSphere={(e) => setActiveSphere(e)}
        s={s}
        i={i}
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
    setSpheres((prevs) => [newS, ...prevs]);
    console.log("ADD");
  };

  const listContent = () => {
    return spheres.map((s, i) => (
      <Idea
        gizmo={gizmo}
        setGizmo={(e) => setGizmo(e)}
        key={i}
        activeI={activeIdea}
        setActive={(s) => setActiveSphere(s)}
        s={s}
        i={i}
        deleteThis={(s) => deleteIdea(s)}
        setSpheres={(e) => setSpheres(e)}
        updateText={(e) => updateText(e)}
        updateTitle={(e) => updateTitle(e)}
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
