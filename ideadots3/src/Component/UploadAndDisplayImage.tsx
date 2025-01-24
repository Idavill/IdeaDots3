import React, { useState, useEffect, useContext } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { db } from "./Database";
import { ImageContext } from "./Contexts/ImageContextProvider";
import Button from "./Button";
import {IdeaType} from '../Entities';

interface UploadAndDisplayImage {
  ideaId:string;
  handleRemoveIdea:(idea:IdeaType)=>void;
}

const UploadAndDisplayImage = ({
  ideaId,
  handleRemoveIdea,
}:UploadAndDisplayImage) => {
  const [selectedImages, setSelectedImages] = useState([]);
  const imageContext = useContext(ImageContext);
  const inputId = `file-input-${ideaId}`;
  const [initialUpload, setInitialUpload] = useState(false);

  useEffect(() => {
    downloadImages(ideaId);
    setInitialUpload(true);
  }, [ideaId]);

  async function downloadImages(ideaId:string) {
    const data = await db.images.where("ideaId").equals(ideaId).toArray();
    if (data.length > 0) {
      for (let i = 0; i < data.length; i++) {
        const blob = data[i].image;
        console.log("BLOB DOWNLOAD: ", typeof blob);
        setSelectedImages((prevs) => [...prevs, blob]);
      }
    }
  }

  async function deleteImageFromDB() {
    await db.images.where("ideaId").equals(ideaId).delete();
  }

  async function storeImage(file:File, ideaId:string) { // TODO: correct type FIle?
    try {
      imageContext.setImageSrcList((prevs) => [...prevs, file.name]);
      console.log("file: ", file.name);
      const img = new Image();
      const reader = new FileReader();

      reader.onload = async (event) => {
        if(event.target){
          img.src = event.target.result;
          img.onload = async () => {
            const blob = await makeBlobFromImage(img);
            await db.images.put({
              ideaId: ideaId,
              name: file.name,
              type: file.type,
              size: file.size,
              image: blob,
            });
          };
        };
        }


      reader.readAsDataURL(file);
    } catch (error) {
      console.log("Didn't store data in indexDB with error: ", error);
    }
  }

  const imageList = () => {
    return selectedImages.map((src, index) => (
      <img
        key={index}
        alt="not found"
        style={{ paddingBottom: "20px" }}
        width={"250px"}
        src={URL.createObjectURL(src)}
      />
    ));
  };

  return (
    <div>
      {selectedImages.length > 0 && <div>{imageList()}</div>}
      <div>
        <input
          id={inputId}
          style={{ display: "none" }}
          type="file"
          name="myImage"
          onChange={(event) => {
            if(event.target.files){
              console.log(event.target.files[0]);
              addFileToImageList(event.target.files[0]);
              storeImage(event.target.files[0], ideaId);
            }
          }}
        />
      </div>
      <button
        className="btn btn-light"
        onClick={() => document.getElementById(inputId).click()}
      >
        Image
      </button>
      <Button onClick={handleRemoveIdea} text={"-"} />
    </div>
  );

  async function addFileToImageList(file) {
    try {
      const img = new Image();
      const reader = new FileReader();

      reader.onload = async (event) => {
        img.src = event.target.result;
        img.onload = async () => {
          const blob = await makeBlobFromImage(img);
          setSelectedImages((prevs) => [...prevs, blob]);
        };
      };
      reader.readAsDataURL(file);
    } catch (error) {
      console.log("Didn't store data in indexDB with error: ", error);
    }
  }

  async function makeBlobFromImage(img) {
    return new Promise((resolve) => {
      let canvas = document.createElement("canvas");
      canvas.width = img.width;
      canvas.height = img.height;

      let context = canvas.getContext("2d");
      context.drawImage(img, 0, 0);

      canvas.toBlob((blob) => {
        if (blob) {
          console.log("Blob created successfully:", blob);
          resolve(blob);
        } else {
          console.error("Failed to create blob from canvas.");
          resolve(null);
        }
      }, "image/png");
    });
  }
};

export default UploadAndDisplayImage;
