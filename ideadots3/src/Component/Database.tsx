import Dexie, { Table } from "dexie";
import { ImageType } from "../Entities";

export class IdeaDotsDatabase extends Dexie {
  images!: Table<ImageType, number>; // Table definition with Image interface and primary key type (number)

  constructor() {
    super("IdeaDotsDatabase");
    this.version(1).stores({
      images: "++id, ideaId, name, type, size, image", // Define the schema
    });
  }
}

export const db = new IdeaDotsDatabase();
