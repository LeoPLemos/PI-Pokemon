import React from 'react';
import { Link } from "react-router-dom";


export default function Detail ({id, dbId, name, hp, attack, defense, speed, height, weight, image, type1, type2}){
    let showId = id;
    if(dbId){
        showId = 'Own'+dbId
    }
    
    return(
        <div>
            <h4>   
                {showId}
            </h4>
            <h3>
                {name}
            </h3>
            <img src={image} alt={name}></img>
            <div>
                <h4>
                    Stats
                </h4>
            </div>    
            <div>
                <h4>
                    Types
                </h4>
                <h5>
                    {type1}
                </h5>
                <h5>
                    {type2}
                </h5>
            </div>
            <Link to={'/home'}>  
                <button>Home</button>
            </Link>    
        </div>
    )
}