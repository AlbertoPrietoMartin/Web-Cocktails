
'use client';   

import { searchCocktails } from "@/app/api/search";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { CocktailT } from "@/app/types";
import { getCocktailById } from "@/app/api/search";
import Link from "next/link";
import { Cocktail } from "@/app/components/Cocktail";
import { useRouter } from "next/navigation";

const cocktailPorId = () =>{
    
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [name, setName] = useState<string>("");
    const [finalName, setFinalName] = useState<string>("");
    const router = useRouter();
    const {id} = useParams();
    const [cocktail, setCocktail] = useState<CocktailT|null>(null);

    useEffect(() => {
        if (!id) return;

        getCocktailById(Number(id)).then((res) => {
            setCocktail(res);
        });   
    },[id]);

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
      
      <h1>Pagina individual y su id es: {id}</h1>

      {cocktail && (
        <>
          <img src={cocktail.image} />
          <h2><strong>Nombre: </strong>{cocktail.name}</h2>
          <p><strong>Ingredientes: </strong>{cocktail.ingredientes.join(", ")}</p>
          <p><strong>Instrucciones: </strong>{cocktail.intrucciones}</p>
          <p><strong>Cristaleria: </strong>{cocktail.cristaleria}</p>
          <p><strong>Etiquetas: </strong>{cocktail.etiquetas.join(", ")}</p>
        </>
      )}

    </div>
  );
};

export default cocktailPorId;