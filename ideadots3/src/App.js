import React, { Suspense, useEffect, useRef, useState } from "react";
import "./App.css";
import API from "./Services/API";
import ThreeDContainer from "./Component/ThreeDContainer.js";
import "bootstrap/dist/css/bootstrap.min.css";
import image from "./Assets/shelf.jpg";
import Draggable from "react-draggable";
import { Resizable } from "react-resizable";
import { ResizableBox } from "react-resizable";

function Idea({ s, i, setActive, activeI }) {
  const [sphere, setSphere] = useState(s);
  const [activeIdea, setActiveIdea] = useState(false);
  const [img, setImg] = useState(s.img);

  useEffect(() => {
    console.log("imag ", img);
  }, []);

  const isActive =
    activeI &&
    activeI.x === s.position.x &&
    activeI.y === s.position.y &&
    activeI.z === s.position.z;

  const handleGo = () => {
    setActive(sphere);
  };

  return (
    <div
      key={i}
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
            // src={process.env.PUBLIC_URL + `${s.img}`}
            src={image}
            class=""
            alt="..."
          ></img>
        </div>
      ) : null}

      <button type="button" onClick={handleGo} class="btn btn-light">
        Go
      </button>
    </div>
  );
}

function Overview({ s, i }) {
  const handleClick = (event) => {
    event.preventDefault(); // Prevent default anchor click behavior
    const target = document.getElementById(`scrollspyHeading${i}`);
    const body = document.body;
    console.log(body);
    if (target) {
      target.scrollIntoView({ behavior: "smooth" }); // Smooth scroll to the target
      window.scrollTo(2, 0);
    }
  };
  return (
    <ul class="nav nav-pills">
      <li class="nav-item">
        <a
          class="nav-link"
          href={`#scrollspyHeading${i}`}
          onClick={handleClick}
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
  const [dimensions, setDimensions] = useState({
    width: 200,
    height: 200,
  });
  const apiInstance = API();

  const onResize = (event, { node, size, handle }) => {
    setDimensions({ width: size.width, height: size.height });
  };

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

  useEffect(() => {
    getSphereData();
  }, []);

  const getSphereData = async () => {
    const spheres = apiInstance.handleGetLocalSpheresJsonData();

    if (spheres) {
      for (const s of spheres) {
        setSpheres((prevs) => [...prevs, s]);
      }
    } else {
      console.log("no spheres in App");
    }
  };

  const overview = () => {
    return spheres.map((s, i) => <Overview s={s} i={i}></Overview>);
  };

  const listContent = () => {
    return spheres.map((s, i) => (
      <Idea
        key={i}
        activeI={activeIdea}
        setActive={(s) => setActiveSphere(s)}
        s={s}
        i={i}
      ></Idea>
    ));
  };

  return (
    <>
      <Suspense fallback={null}>
        <ThreeDContainer
          spheres={spheres}
          setActiveIdea={(s) => setActiveIdea(s)}
          cameraTarget={cameraTarget}
        />
      </Suspense>
      <Draggable>
        <div className="header">
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
      </Draggable>
    </>
  );
}
