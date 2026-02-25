
"use client";

import { useEffect, useState } from "react";
import type { CocktailT } from "../../types";
import { api } from "../../api/api";
import "./style.css";

export const Cocktail = (params: {id?: number, cocktail?: CocktailT}) => {

    const id = params.id;

    const [cocktailcito, setCocktailcito] = useState<CocktailT | null>(params.cocktail ? params.cocktail : null);


    useEffect(() => {
        !params.cocktail && id && api.get(`/character/${id}`).then((e) => setCocktailcito(e.data));
    }, [id]);

    return(
        <>
            {cocktailcito ? <div className="mainContainer">
                {cocktailcito?.image && <img src={cocktailcito?.image}/>}
                <div className="characterDataContainer">
                    <h2>{cocktailcito?.name}</h2>
                    <p>Ingredientes: {cocktailcito?.ingredientes}</p>
                    <p>Instrucciones: {cocktailcito?.intrucciones}</p>
                    <p>Cristaleria: {cocktailcito?.cristaleria}</p>
                    <p>Etiquetas: {cocktailcito?.etiquetas}</p>

                </div>
            </div> : <h1>Loading...</h1>}
        </>
    )
}