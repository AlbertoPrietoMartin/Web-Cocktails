
"use client";

import { useEffect, useState } from "react";
import type { CocktailT } from "../../types";
import { api } from "../../api/api";
import "./style.css";
import Link from "next/link";

export const Cocktail = (params: {id?: number, cocktail?: CocktailT}) => {

    const id = params.id;

    const [cocktailcito, setCocktailcito] = useState<CocktailT | null>(params.cocktail ? params.cocktail : null);


    useEffect(() => {
        !params.cocktail && id && api.get(`/cocktail/${id}`).then((e) => setCocktailcito(e.data));
    }, [id]);

    return (
  <>
    {cocktailcito ? (
      <div className="mainContainer">
        
        {/* SOLO LA IMAGEN NAVEGA */}
        {cocktailcito.image && (
          <Link href={`/paginacion/${cocktailcito.id}`}>
            <img 
              src={cocktailcito.image} 
              alt={cocktailcito.name}
              style={{ cursor: "pointer" }}
            />
          </Link>
        )}

        <div className="characterDataContainer">

          <Link href={`/paginacion/${cocktailcito.id}`}>
            <h2 style={{ cursor: "pointer" }}>
              {cocktailcito.name}
            </h2>
          </Link>

          {/* ESTO NO NAVEGA */}
          {cocktailcito.ingredientes &&
            cocktailcito.ingredientes.length > 0 && (
              <>
                <p>
                  <strong>Ingredientes:</strong>{" "}
                  {cocktailcito.ingredientes.join(", ")}
                </p>
                <p>
                  <strong>Instrucciones:</strong>{" "}
                  {cocktailcito.intrucciones}
                </p>
                <p>
                  <strong>Cristaleria:</strong>{" "}
                  {cocktailcito.cristaleria}
                </p>
                <p>
                  <strong>Etiquetas:</strong>{" "}
                  {cocktailcito.etiquetas.join(", ")}
                </p>
              </>
            )}

        </div>
      </div>
    ) : (
      <h1>Loading...</h1>
    )}
  </>
);
}