import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { db } from "./Database";
import ImageIdea from "./ImageIdea";

export default function DisplayImage({
  ideaId,
  hover,
  setEnableCustomControls,
  setScale,
}) {
  const [selectedImages, setSelectedImages] = useState([]);

  useEffect(() => {
    downloadImages(ideaId);
  }, []);

  async function downloadImages(ideaId) {
    const data = await db.images.where("ideaId").equals(ideaId).toArray();
    var blob;
    if (data.length > 0) {
      for (let i = 0; i < data.length; i++) {
        blob = data[i].image;
        console.log("INSIDE 3D BLOB DOWNLOAD: ", typeof blob);
        const text = await new Response(blob).text();
        console.log("INSIDE 3D TEXT OF BLOB: ", text);
        setSelectedImages((prevs) => [...prevs, blob]);
      }
    }
  }

  const imageList = () => {
    return selectedImages.map((src) => (
      <img
        alt="not found"
        style={{ paddingBottom: "20px" }}
        width={"250px"} // TODO: needs to be flex
        src={URL.createObjectURL(src)}
      ></img>
    ));
  };
  return <>{selectedImages && <div>{imageList()}</div>}</>;
}
