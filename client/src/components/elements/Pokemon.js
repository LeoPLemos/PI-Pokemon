import React from 'react';
import './Pokemon.css'
import { Link } from "react-router-dom";


export default function Pokemon ({id, dbId, name, image, type1, type2}){
    let showId = id;
    if(dbId){
        showId = 'Own'+dbId
    }else{
        showId = '#'+id 
    }

    function capitalizeName(name) {
        return name.charAt(0).toUpperCase() + name.slice(1);
      }
       
    return(
        <div>
            <Link to={`/pokemon/${id}`}>
                <div className="card_container">
                    <div className="container_img">
                        <img className="img" src={image} alt={name}/>
                    </div>
                    <div className="card">
                        <div className="pokemon_id">{showId}</div>
                        <div className="pokemon_name">{capitalizeName(name)}</div>
                        <div className="type_title">Types</div>
                        <div className="type_container">
                            <div className="type">{type1}</div>
                            <div className="type">{type2}</div>
                        </div>
                    </div>
                </div>
            </Link>        
        </div>
    )
}