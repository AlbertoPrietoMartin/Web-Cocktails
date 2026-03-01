'use client';

import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import Link from "next/link";
import { AlphabetBar } from "@/app/components/AlphabetBar";
import { useRouter } from "next/navigation";
import { searchCocktails } from "@/app/api/search";
import { CocktailT } from "@/app/types";
import { Cocktail } from "@/app/components/Cocktail";
import { api } from "@/app/api/api";

const IngredientePage = () => {

  const { name } = useParams();
  const [ingredient, setIngredient] = useState<any>(null);
  const [cocktails, setCocktails] = useState<any[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [sname, setName] = useState<string>("");
  const [finalName, setFinalName] = useState<string>("");
  const {id} = useParams();
  const router = useRouter();
  const [searchResults, setSearchResults] = useState<any[]>([]); 
  const [cocktail, setCockatil] = useState<CocktailT[]>([]);

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
  useEffect(() => {
    if (finalName !== "") fetchCharacters(finalName);
  }, [finalName]);

  useEffect(() => {
    if (!name) return;

    // INFO DEL INGREDIENTE
    fetch(`https://www.thecocktaildb.com/api/json/v1/1/search.php?i=${name}`)
      .then(res => res.json())
      .then(data => {
        if (data.ingredients) {
          setIngredient(data.ingredients[0]);
        }
      });

    // COCKTAILS QUE LO USAN
    fetch(`https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=${name}`)
      .then(res => res.json())
      .then(data => {
        if (data.drinks) {
          setCocktails(data.drinks);
        }
      });

  }, [name]);

      const goPrev = () => {
        if (!id) return;
            const prevId = Number(id) - 1;
            router.push(`/paginacion/${prevId}`);
    };

    const goNext = () => {
        if (!id) return;
        const nextId = Number(id) + 1;
        router.push(`/paginacion/${nextId}`);
    };

  return (
    <div>
        <div className="app">
                    <div className="searchBar">
                      <input
                        value={sname}
                        placeholder="Search cocktails in the bar"
                        onChange={(e) => setName(e.target.value)}
                      />
                      <button onClick={() => setFinalName(sname)}><strong>Search</strong></button>
                    </div>
                
                    {error && <p className="error">{error}</p>}

                    <div className="charactersGrid">
                      {Array.isArray(cocktail) && cocktail.map((c) => (
                        <Cocktail key={c.id} cocktail={c} />
                          ))}
                    </div>
                
        </div>
            
        <p onClick={()=>{
            router.back();
        }}><strong>HOME</strong></p>  

        <button onClick={goPrev}>⬅ Anterior</button>
        <button onClick={goNext}>Siguiente ➡</button>
      <h1>Ingrediente: {name}</h1>

      {ingredient && (
        <>
          <img
            src={`https://www.thecocktaildb.com/images/ingredients/${name}-Medium.png`}
            width={150}
          />
          <p><strong>Descripción:</strong> {ingredient.strDescription}</p>
          <p><strong>Tipo:</strong> {ingredient.strType}</p>
          <p><strong>Alcohol:</strong> {ingredient.strAlcohol}</p>
        </>
      )}

      <h2>Cocktails que usan este ingrediente:</h2>

      {cocktails.map((drink) => (
        <div key={drink.idDrink}>
          <Link href={`/paginacion/${drink.idDrink}`}>
            <img
              src={drink.strDrinkThumb}
              width={120}
              style={{ cursor: "pointer" }}
            />
          </Link>

          <Link href={`/paginacion/${drink.idDrink}`}>
            <p style={{ cursor: "pointer" }}>
              {drink.strDrink}
            </p>
          </Link>
        </div>
      ))}
        <div>  
          <AlphabetBar />
        </div>
    </div>
    
  );
};

export default IngredientePage;