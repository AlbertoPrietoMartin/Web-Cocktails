
'use client';   

import { searchCocktails } from "@/app/api/search";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { CocktailT } from "@/app/types";
import { getCocktailById } from "@/app/api/search";
import Link from "next/link";
import { Cocktail } from "@/app/components/Cocktail";
import { useRouter } from "next/navigation";
import { AlphabetBar } from "@/app/components/AlphabetBar";
import { api } from "@/app/api/api";

const cocktailPorId = () =>{
    
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [name, setName] = useState<string>("");
    const [finalName, setFinalName] = useState<string>("");
    const router = useRouter();
    const {id} = useParams();
    const [cocktail, setCocktail] = useState<CocktailT|null>(null);
    const [cocktails, setCocktails] = useState<CocktailT[]>([]);
    useEffect(() => {
        if (!id) return;

        getCocktailById(Number(id)).then((res) => {
            setCocktail(res);
        });   
    },[id]);

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


        const fetchCharacters = async (name: string) => {
      try {
        const res = await api.get(`/search.php?s=${name}`);
        const drinks = Array.isArray(res.data.drinks) ? res.data.drinks : [];

        const mapped = drinks.map((d: any) => ({
          id: Number(d.idDrink),
          name: d.strDrink,
          image: d.strDrinkThumb,
          intrucciones: d.strInstructions,
          ingredientes: [],
          cristaleria: d.strGlass,
          etiquetas: [],
        }));

        setCocktails(mapped);
      } catch (e) {
        setCocktails([]);
      }
    };
  useEffect(() => {
  if (finalName !== "") fetchCharacters(finalName);
}, [finalName]);

  return (
    <div>
        <div className="app">
            <div className="searchBar">
              <input
                value={name}
                placeholder="Search cocktails in the bar"
                onChange={(e) => setName(e.target.value)}
              />
              <button onClick={() => setFinalName(name)}><strong>Search</strong></button>
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
      
      <h1>Pagina individual y su id es: {id}</h1>

      {cocktail && (
        <>
          <img src={cocktail.image} />
          <h2><strong>Nombre: </strong>{cocktail.name}</h2>

<h3>Ingredientes</h3>

{cocktail.ingredientes.map((ing, index) => (
  <div
    key={index}
    style={{
      display: "flex",
      alignItems: "center",
      gap: "10px",
      marginBottom: "10px",
    }}
  >
    <img
      src={`https://www.thecocktaildb.com/images/ingredients/${ing.name}-Small.png`}
      width={50}
      alt={ing.name}
      style={{ cursor: "pointer" }}
      onClick={() => router.push(`/ingrediente/${ing.name}`)}
    />

    <span
      style={{ cursor: "pointer", fontWeight: "bold" }}
      onClick={() => router.push(`/ingrediente/${ing.name}`)}
    >
      {ing.name}
    </span>

    <span>- {ing.measure}</span>
  </div>
))}
          <p><strong>Instrucciones: </strong>{cocktail.intrucciones}</p>
          <p><strong>Cristaleria: </strong>{cocktail.cristaleria}</p>
          <p><strong>Etiquetas: </strong>{cocktail.etiquetas.join(", ")}</p>
        </>
      )}

      <div>  
        <AlphabetBar />
      </div>

    </div>
  );
};

export default cocktailPorId;