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
  const [selectedImage, setSelectedImage] = useState(null);

  useEffect(() => {
    downloadImage(ideaId);
  }, []);

  async function downloadImage(ideaId) {
    const data = await db.images.where("ideaId").equals(ideaId).toArray();
    console.log("inside sphere try to download img for : ", ideaId);

    var blob;
    if (data[0]) {
      blob = data[0].image;
      console.log("inside sphere BLOB DOWNLOAD: ", typeof blob);
      const text = await new Response(blob).text();
      console.log("inside sphere  TEXT OF BLOB: ", text);
      setSelectedImage(blob);
    }
  }

  return (
    <>
      {selectedImage && (
        <ImageIdea
          setEnableCustomControls={setEnableCustomControls}
          hover={hover}
          setScale={(e) => setScale(e)}
          image={URL.createObjectURL(selectedImage)}
        />
      )}
    </>
  );
}
