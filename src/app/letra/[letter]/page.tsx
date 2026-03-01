'use client';

import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { getCocktailsByLetter } from "@/app/api/search";
import Link from "next/link";

const CocktailsPorLetra = () => {

  const params = useParams();
  const letter = params.letter as string;
  const [cocktails, setCocktails] = useState<any[]>([]);

  useEffect(() => {
    if (!letter) return;

    getCocktailsByLetter(letter as string).then((res) => {
      setCocktails(res);
    });

  }, [letter]);

  return (
    <div>
      <h1>Cocktails que empiezan por "{letter}"</h1>

        {Array.isArray(cocktails) && cocktails.map((drink) => (        
          <div key={drink.idDrink} style={{ marginBottom: "20px" }}>

          <Link href={`/paginacion/${drink.idDrink}`}>
            <img 
              src={drink.strDrinkThumb} 
              alt={drink.strDrink}
              width={150}
              style={{ cursor: "pointer" }}
            />
          </Link>

          <Link href={`/paginacion/${drink.idDrink}`}>
            <h3 style={{ cursor: "pointer" }}>
              {drink.strDrink}
            </h3>
          </Link>
          
        </div>
      ))}
    </div>
  );
};

export default CocktailsPorLetra;