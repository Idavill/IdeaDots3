import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { db } from "./Database";
import ImageIdea from "./ImageIdea";

export default function DisplayImage({
  ideaId,
  hover,
  setEnableCustomControls,
  setScale,
  scale,
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

  async function deleteImageFromDB() {
    await db.images.where("ideaId").equals(ideaId).delete();
  }

  return (
    <>
      {selectedImage && (
        // <div>
        //   <img
        //     alt="not found"
        //     width={"250px"} // TODO: needs to be flex
        //     src={URL.createObjectURL(selectedImage)}
        //   />
        // </div>
        <ImageIdea
          setEnableCustomControls={setEnableCustomControls}
          hover={hover}
          setScale={(e) => setScale(e)}
          image={URL.createObjectURL(selectedImage)}
        />
      )}
      {/* <div>
        <input
          id="getFile"
          style={{ display: "none" }}
          type="file"
          name="myImage"
          onChange={(event) => {
            console.log(event.target.files[0]); // Log the selected file
            setSelectedImage(event.target.files[0]); // Update the state with the selected file
            storeImage(event.target.files[0], ideaId);
          }}
        />
      </div> */}
    </>
  );
}
