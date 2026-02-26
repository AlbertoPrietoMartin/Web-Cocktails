"use client";

import { useEffect, useState } from "react";
import './globals.css'
import { api } from "./api/api";
import { CocktailT } from "./types";
import { Cocktail } from "./components/Cocktail";
import { searchCocktails } from "./api/search";

const App = () => {
  const [cocktail, setCockatil] = useState<CocktailT[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [name, setName] = useState<string>("");
  const [finalName, setFinalName] = useState<string>("");

  //PARA BUSCAR COCKTAILS
  const fetchCharacters = async (name: string) => {
    setLoading(true);
    setError(null);

    try {
      const res = await api.get(`/search.php?s=${name}`);
      const drinks = Array.isArray(res.data.drinks) ? res.data.drinks : []; 

      const mapped = drinks.map((d: any) => ({
        id: Number(d.idDrink),
        name: d.strDrink,
        image: d.strDrinkThumb,
        intrucciones: d.strInstructions,
        ingredientes: [
          d.strIngredient1,
          d.strIngredient2,
          d.strIngredient3,
          d.strIngredient4,
          d.strIngredient5,
        ].filter(Boolean),

        cristaleria: d.strGlass,
        etiquetas: d.strTags ? d.strTags.split(", ") : [],
      }));

      setCockatil(mapped);

    } catch (e) {
      setError(`Error al obtener los datos: ${e}`);
      setCockatil([]); 
    } finally {
      setLoading(false);
    }
  };

  //PARA QUE TE SALGAN LOS COCKTAILS AL PRINCIPIO
  useEffect(() => {
    const fetchAll = async () => {
      setLoading(true);
      setError(null);

      try {
        const res = await api.get(`/filter.php?c=Cocktail`);
        const drinks = Array.isArray(res.data.drinks) ? res.data.drinks : [];

        // mapeamos solo los campos que tenemos disponibles
        const mapped = drinks.map((d: any) => ({
          id: Number(d.idDrink),
          name: d.strDrink,
          image: d.strDrinkThumb,
          intrucciones: "",        
          ingredientes: [],        
          cristaleria: "",
          etiquetas: [],
        }));

        setCockatil(mapped);

      } catch (e) {
        setError(`Error al obtener los datos: ${e}`);
        setCockatil([]);
      } finally {
        setLoading(false);
      }
    };

    fetchAll();
  }, []);

  useEffect(() => {
    if (finalName !== "") fetchCharacters(finalName);
  }, [finalName]);

  
  return (
  <div className="app">
    <div className="searchBar">
      <input
        value={name}
        placeholder="Search cocktails in the bar"
        onChange={(e) => setName(e.target.value)}
      />
      <button onClick={() => setFinalName(name)}>Search</button>
    </div>

    {loading && <p className="loading">Searching for more cocktails...</p>}
    {error && <p className="error">{error}</p>}

    <div className="charactersGrid">
      {Array.isArray(cocktail) && cocktail.map((c) => (
        <Cocktail key={c.id} cocktail={c} />
      ))}
    </div>
  </div>

);

};

export default App