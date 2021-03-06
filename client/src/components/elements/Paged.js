import React from "react";
import './Paged.css';



export default function Paged({pokemonsPerPage, pokemons, paged}){
    const pageNumbers = [];
    for(let i=1; i<= Math.ceil(pokemons / pokemonsPerPage); i++){
        pageNumbers.push(i)
    }

    
    return(
        <div>
            <nav className="pagination">
                <ul>
                    { pageNumbers?.map(num =>{
                        return <a key={num}>
                            <span onClick={()=>paged(num)}>  {num}  </span>
                        </a>
                    })
                    }
                </ul>

            </nav>

        </div>
    )


}