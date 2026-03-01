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

  const ingredientes = [];

  for (let i = 1; i <= 15; i++) {
    const ingredient = drink[`strIngredient${i}`];
    const measure = drink[`strMeasure${i}`];

    if (ingredient) {
      ingredientes.push({
        name: ingredient,
        measure: measure || "",
      });
    }
  }

  return {
    id: Number(drink.idDrink),
    name: drink.strDrink,
    image: drink.strDrinkThumb,
    intrucciones: drink.strInstructions,
    ingredientes,
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