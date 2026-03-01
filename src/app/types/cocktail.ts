
export type CocktailT = {
  id: number;
  name: string;
  image: string;
  ingredientes: {
    name: string;
    measure: string;
  }[];
  etiquetas: string [];
  intrucciones: string;
  cristaleria: string;
};

