import axios from "axios";
import Spheres from "../Data/sphere.json";

type DataObjectName = "ideas" | "dots" | "spheres"; // Replace with actual API object names

interface Item { //TODO: renmae 
  id?: number; // Optional because new items may not have an ID
  [key: string]: any; // Allow additional fields dynamically
}

export default function API() {
  const handleGet = async (dataObjectName: DataObjectName): Promise<any> => {
    try {
      const response = await axios.get(`http://localhost:8000/api/${dataObjectName}/`);
      return response.data;
    } catch (error) {
      console.error("Error fetching data:", error);
      return null;
    }
  };

  const handleDelete = async (item: Item, dataObjectName: DataObjectName): Promise<void> => {
    try {
      await axios.delete(`http://localhost:8000/api/${dataObjectName}/${item.id}/`);
      await handleGet(dataObjectName);
    } catch (error) {
      console.error("Error deleting item:", error);
    }
  };

  const handleSubmit = async (item: Item, dataObjectName: DataObjectName): Promise<void> => {
    try {
      if (item.id) {
        await axios.put(`http://localhost:8000/api/${dataObjectName}/${item.id}/`, item);
      } else {
        await axios.post(`http://localhost:8000/api/${dataObjectName}/`, item);
      }
      await handleGet(dataObjectName);
    } catch (error: any) {
      console.error("Error submitting item:", error.response?.data || error);
    }
  };

  const handleGetLocalSpheresJsonData = (): any => {
    try {
      return Spheres.spheres;
    } catch (error) {
      console.error("Error reading local spheres data:", error);
    }
  };

  return {
    handleGet,
    handleDelete,
    handleSubmit,
    // handleGetLocalIdeasJsonData,
    // handleGetLocalDotsJsonData,
    handleGetLocalSpheresJsonData,
  };
}
