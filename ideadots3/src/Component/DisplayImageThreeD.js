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
  //const [selectedImage, setSelectedImage] = useState(null);
  const [selectedImages, setSelectedImages] = useState([]);

  useEffect(() => {
    //downloadImage(ideaId);
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

  // async function downloadImage(ideaId) {
  //   const data = await db.images.where("ideaId").equals(ideaId).toArray();
  //   console.log("inside sphere try to download img for : ", ideaId);

  //   var blob;
  //   if (data[0]) {
  //     blob = data[0].image;
  //     console.log("inside sphere BLOB DOWNLOAD: ", typeof blob);
  //     const text = await new Response(blob).text();
  //     console.log("inside sphere  TEXT OF BLOB: ", text);
  //     setSelectedImage(blob);
  //   }
  // }

  return (
    <>
      {selectedImages && (
        <div>
          {imageList()}
          {/* <ImageIdea
            setEnableCustomControls={setEnableCustomControls}
            hover={hover}
            setScale={(e) => setScale(e)}
            image={URL.createObjectURL(selectedImage)}
          /> */}
        </div>
      )}
    </>
  );
}
