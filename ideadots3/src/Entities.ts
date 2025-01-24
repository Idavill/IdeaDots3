export type IdeaType = {
    id: string;
    position: {x:number,y:number,z:number};
    title: string,
    text: string,
    img:string
  };

export type Image = {
    id?: string; // Auto-incremented primary key
    ideaId: string; // Foreign key to associate with an idea
    src: string; // Name of the image
    type: string; // Type of the file (e.g., "image/png")
    size: number; // Size of the image in bytes
    image: Blob | any; // The actual image data
  }
  