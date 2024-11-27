import React, { Suspense, useEffect, useRef, useState } from "react";
import "./App.css";
import API from "./Services/API";
import ThreeDContainer from "./Component/ThreeDContainer.js";

function App() {
  const [spheres, setSpheres] = useState([]);
  const apiInstance = API();

  useEffect(() => {
    getSphereData();
    console.log("useffect in App ");
  }, []);

  const getSphereData = async () => {
    const spheres = apiInstance.handleGetLocalSpheresJsonData();
    console.log("get spheres : ", spheres);

    if (spheres) {
      for (const s of spheres) {
        setSpheres((prevs) => [...prevs, s]);
      }
    } else {
      console.log("no spheres in App");
    }
  };

  const listContent = () => {
    return spheres.map((s, i) => (
      <div className="header">
        <span>{s.title}</span>
        <span>{s.text}</span>
      </div>
    ));
  };

  return (
    <>
      <Suspense fallback={null}>
        <ThreeDContainer spheres={spheres} />
      </Suspense>
      <div>{listContent()}</div>
    </>
  );
}

export default App;
