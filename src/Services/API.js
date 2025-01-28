import axios from "axios";
// import Ideas from "../Data/ideas.json";
// import Dots from "../Data/dots.json";
import Spheres from "../Data/sphere.json";

export default function API() {
  const handleGet = async (dataObjectName) => {
    let result;
    await axios
      .get(`http://localhost:8000/api/${dataObjectName}/`)
      .then((res) => (result = res.data))
      .catch((err) => console.log(err));
    return result;
  };

  const handleDelete = (item, dataObjectName) => {
    axios
      .handleDelete(`http://localhost:8000/api/${dataObjectName}/${item.id}/`)
      .then(() => handleGet(dataObjectName));
  };

  const handleSubmit = (item, dataObjectName) => {
    if (item.id) {
      axios
        .put(`http://localhost:8000/api/${dataObjectName}/${item.id}/`, item)
        .then((res) => handleGet(dataObjectName))
        .catch((err) =>
          console.error("Error updating task:", err.response.data)
        );
    } else {
      axios
        .post(`http://localhost:8000/api/${dataObjectName}/`, item)
        .then((res) => handleGet(dataObjectName))
        .catch((err) =>
          console.error("Error creating task:", err.response.data)
        );
    }
  };

  // const handleGetLocalIdeasJsonData = () => {
  //   try {
  //     return Ideas.ideas;
  //   } catch (e) {
  //     console.log(e);
  //   }
  // };

  // const handleGetLocalDotsJsonData = () => {
  //   try {
  //     return Dots.dot;
  //   } catch (e) {
  //     console.log(e);
  //   }
  // };

  const handleGetLocalSpheresJsonData = () => {
    try {
      return Spheres.spheres;
    } catch (e) {
      console.log(e);
    }
  };

  return {
    handleGet,
    handleDelete,
    handleSubmit,
    // handleGetLocalIdeasJsonData,
    // handleGetLocalDotsJsonData,
    handleGetLocalSpheresJsonData,
  }; // Exporting handleGet function
}
