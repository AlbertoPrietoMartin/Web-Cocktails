import { api } from "./api";
import { CocktailT } from "../types";

export const searchCocktails = async (name: string): Promise<CocktailT[]> => {
  try {
    const res = await api.get(`/search.php?s=${name}`);
    return Array.isArray(res.data.drinks) ? res.data.drinks : [];
  } catch (error) {
    console.error("Error fetching cocktails:", error);
    return [];
  }
};