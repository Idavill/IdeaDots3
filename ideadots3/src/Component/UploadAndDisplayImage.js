import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Dexie from "dexie";

import { db } from "./Database";

const UploadAndDisplayImage = ({ ideaId }) => {
  const [selectedImage, setSelectedImage] = useState(null);

  useEffect(() => {
    downloadImage(ideaId);
  }, []);

  async function downloadImage(ideaId) {
    const data = await db.images.where("ideaId").equals(ideaId).toArray();
    var blob;
    if (data[0]) {
      blob = data[0].image;
      console.log("BLOB DOWNLOAD: ", typeof blob);
      const text = await new Response(blob).text();
      console.log("TEXT OF BLOB: ", text);
      setSelectedImage(blob);
    }

    // const reader = new FileReader();
    // reader.addEventListener("loadend", () => {
    //   const result = reader.result();
    //   console.log("READER RESULT : ", result);
    // });
    // reader.readAsArrayBuffer(blob);
  }

  async function storeImage(file, ideaId) {
    try {
      const img = new Image(); // Create a new Image object
      const reader = new FileReader();
      console.log("IMG? :,", img);

      reader.onload = async (event) => {
        img.src = event.target.result; // Set the image source to the file data
        img.onload = async () => {
          const blob = await makeBlobFromImage(img); // Pass the image to makeBlobFromImage
          await db.images.put({
            ideaId: ideaId,
            name: "Hello World",
            name: file.name, // Use the original file name
            type: file.type, // Store the MIME type of the image
            size: file.size, // Store the size of the image
            image: blob,
          });
        };
      };

      reader.readAsDataURL(file); // Read the file as a data URL
    } catch (error) {
      console.log("Didn't store data in indexDB with error: ", error);
    }
  }

  return (
    <div>
      {selectedImage && (
        <div>
          <img
            alt="not found"
            width={"250px"} // TODO: needs to be flex
            src={URL.createObjectURL(selectedImage)}
          />
          <div className="IdeaButtons">
            <button
              class="btn btn-light"
              onClick={() => setSelectedImage(null)}
              // TODO: reentering a photo doesn't work
            >
              Remove
            </button>
          </div>
        </div>
      )}
      <div>
        <div className="IdeaButtons">
          <button
            className="btn btn-light"
            //style={{ display: "block", width: "120px", height: "30px" }}
            onClick={() => document.getElementById("getFile").click()}
          >
            Image
          </button>
        </div>

        <input
          id="getFile"
          style={{ display: "none" }}
          type="file"
          name="myImage"
          // Event handler to capture file selection and update the state
          onChange={(event) => {
            console.log(event.target.files[0]); // Log the selected file
            setSelectedImage(event.target.files[0]); // Update the state with the selected file
            storeImage(event.target.files[0], ideaId);
          }}
        />
      </div>
    </div>
  );

  function makeBlob() {
    const obj = { hello: "world" };
    const blob = new Blob([JSON.stringify(obj, null, 2)], {
      type: "application/json",
    });
    return blob;
  }

  async function makeBlobFromImage(img) {
    return new Promise((resolve) => {
      let canvas = document.createElement("canvas");
      canvas.width = img.width; // Use img.width and img.height
      canvas.height = img.height;

      let context = canvas.getContext("2d");
      context.drawImage(img, 0, 0);

      canvas.toBlob((blob) => {
        if (blob) {
          console.log("Blob created successfully:", blob); // Log the created blob
          resolve(blob); // Resolve the promise with the blob
        } else {
          console.error("Failed to create blob from canvas."); // Log an error if blob creation fails
          resolve(null); // Resolve with null if blob creation fails
        }
      }, "image/png");
    });
  }
};

export default UploadAndDisplayImage;
