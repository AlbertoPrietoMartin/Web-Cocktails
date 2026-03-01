'use client';

import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { getCocktailsByLetter } from "@/app/api/search";
import Link from "next/link";
import { AlphabetBar } from "@/app/components/AlphabetBar";
import { useRouter } from "next/navigation";

const CocktailsPorLetra = () => {

  const params = useParams();
  const letter = params.letter as string;
  const [cocktails, setCocktails] = useState<any[]>([]);
  const router = useRouter();
  const {id} = useParams();
  const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [name, setName] = useState<string>("");
    const [finalName, setFinalName] = useState<string>("");



  useEffect(() => {
    if (!letter) return;

    getCocktailsByLetter(letter as string).then((res) => {
      setCocktails(res);
    });

  }, [letter]);  

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
          
          </div>
        
        <p onClick={()=>{
            router.back();
        }}><strong>HOME</strong></p> 

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


              <div>  
                <AlphabetBar />
              </div>
    </div>
    
  );
  
};

export default CocktailsPorLetra;