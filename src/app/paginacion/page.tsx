
'use client';

import { useRouter } from "next/navigation";
import Link from "next/link";

const paginaIndividual = () => {
    const router = useRouter();

    return (
        <div>
            <Link href="../">Clicka aquí para volver a la pagina principal</Link>
            <p onClick={()=>{
                router.back();
            }}></p>
            
        </div>
        
    );



};


export default paginaIndividual;