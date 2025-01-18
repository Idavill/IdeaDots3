import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { db } from "./Database";
import ImageIdea from "./ImageIdea";

export default function DisplayImage({
  ideaId,
  hover,
  setEnableCustomControls,
  clicked,
  startingPosition = [0, 0],
}) {
  const [selectedImages, setSelectedImages] = useState([]);
  const [scatteredImages, setScatteredImages] = useState([]);

  useEffect(() => {
    downloadImages(ideaId);
  }, [ideaId]);

  useEffect(() => {
    if (selectedImages.length > 0) {
      scatterImages();
    }
  }, [selectedImages]);

  async function downloadImages(ideaId) {
    const data = await db.images.where("ideaId").equals(ideaId).toArray();
    if (data.length > 0) {
      const blobs = data.map((item) => item.image);
      setSelectedImages(blobs);
    }
  }

  function scatterImages() {
    const scattered = [];
    const padding = 10;
    const maxAttempts = 50;

    if (!Array.isArray(startingPosition) || startingPosition.length < 2) {
      console.error("Invalid startingPosition:", startingPosition);
      return;
    }

    selectedImages.forEach((src, index) => {
      let placed = false;
      let attempts = 0;

      while (!placed && attempts < maxAttempts) {
        const left = startingPosition[0] + randomInt(-300, 300);
        const top = startingPosition[1] + randomInt(-300, 300);

        const newImage = { src, left, top, index };

        if (!isOverlapping(newImage, scattered, padding)) {
          scattered.push(newImage);
          placed = true;
        }
        attempts++;
      }
    });

    setScatteredImages(scattered);
  }

  function isOverlapping(newImage, scattered, padding) {
    return scattered.some(({ left, top }) => {
      return (
        newImage.left < left + 250 + padding &&
        newImage.left + 250 > left - padding &&
        newImage.top < top + 250 + padding &&
        newImage.top + 250 > top - padding
      );
    });
  }

  const imageList = () => {
    console.log("IMagelistcomputed");
    return scatteredImages.map(({ src, left, top }) => (
      <>
        <ImageIdea
          setEnableCustomControls={setEnableCustomControls}
          hover={hover}
          image={URL.createObjectURL(src)}
          left={left}
          top={top}
          clicked={clicked}
        />
      </>
    ));
  };

  return (
    <>
      {scatteredImages.length > 0 && (
        <div
          style={{ position: "relative", height: "100vh", overflow: "hidden" }}
        >
          {imageList()}
        </div>
      )}
    </>
  );
}

function randomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}
