export type IdeaType = {
    id: number;
    position: {x:number,y:number,z:number};
    title: string,
    text: string,
    img:string
  };

  export type Image = {
    id?: number; // Auto-incremented primary key
    ideaId: number; // Foreign key to associate with an idea
    name: string; // Name of the image
    type: string; // Type of the file (e.g., "image/png")
    size: number; // Size of the image in bytes
    image: Blob; // The actual image data
  }
  