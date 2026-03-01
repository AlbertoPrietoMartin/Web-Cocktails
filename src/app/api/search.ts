import { api } from "./api";
import { CocktailT } from "../types";

export const searchCocktails = async (name: number): Promise<CocktailT[]> => {
  try {
    const res = await api.get(`/search.php?s=${name}`);
    return Array.isArray(res.data.drinks) ? res.data.drinks : [];
  } catch (error) {
    console.error("Error fetching cocktails:", error);
    return [];
  }
};

export const getCocktailById = async (id: number): Promise<CocktailT> => {
  const res = await api.get(`/lookup.php?i=${id}`);
  const drink = res.data.drinks[0];

  return {
    id: Number(drink.idDrink),
    name: drink.strDrink,
    image: drink.strDrinkThumb,
    intrucciones: drink.strInstructions,
    ingredientes: [
      drink.strIngredient1,
      drink.strIngredient2,
      drink.strIngredient3,
      drink.strIngredient4,
      drink.strIngredient5,
    ].filter(Boolean),
    cristaleria: drink.strGlass,
    etiquetas: drink.strTags ? drink.strTags.split(", ") : [],
  };
};

export const getCocktailsByLetter = async (letter: string) => {
  try {
    const res = await api.get(`/search.php?f=${letter}`);

    return Array.isArray(res.data.drinks)
      ? res.data.drinks
      : [];

  } catch (error) {
    console.error("Error fetching by letter:", error);
    return [];
  }
};