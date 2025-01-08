import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";

const UploadAndDisplayImage = () => {
  const [selectedImage, setSelectedImage] = useState(null);

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
            class="btn btn-light"
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
          }}
        />
      </div>
    </div>
  );
};

export default UploadAndDisplayImage;
