// db.js
import Dexie from "dexie";

export const db = new Dexie("IdeaDotsDatabase");
db.version(1).stores({
  images: "++id, ideaId, name, type, size, image", // Ensure ideaId is included in the index
});
