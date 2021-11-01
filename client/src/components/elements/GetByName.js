import React from 'react';
import { Link } from "react-router-dom";


export default function GetByName ({id, dbId, name, image, type1, type2}){
    let showId = id;
    if(dbId){
        showId = 'Own'+dbId
    }

    return(
        <div>
            <h4>    
                {showId}
            </h4>
            <Link to={`/pokemon/${id}`}>
                <h3>
                    {name}
                </h3>
            </Link>
            <img src={image} alt={name}></img>
            <h5>
                {type1}
            </h5>
            <h5>
                {type2}
            </h5>
        </div>
    )
}