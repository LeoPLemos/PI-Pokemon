import React, { useEffect } from 'react';
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import { getPokemonById } from '../store/actions';


export default function DetailPokemon(props){
    const pokemonId = props.match.params.id
    const detailPokemon = useSelector((state)=> state.pokemonDetail);  
    let dispatch = useDispatch();
    useEffect(() =>{
        dispatch(getPokemonById(pokemonId))
    }, [dispatch, pokemonId]);
    
    const { id, dbId, name, hp, attack, defense, speed, height, weight, image, types} = detailPokemon;
    
    let showId = id;
    
    if(dbId){
        showId = 'Own'+dbId;
    }

    return(
        <div>
            <div>
                <Link to='/home'>
                    <button>Back</button>
                </Link>
            </div>
           <h4>Detalle de pokemon</h4>
           <h3>{showId}</h3>
           <img src={image} alt={name}/>
           <h2>{name}</h2>
           <h5>HP: {hp}</h5>
           <h5>ATTACK: {attack}</h5>
           <h5>DEFENSE: {defense}</h5>
           <h5>SPEED: {speed}</h5>
           <h5>HEIGHT: {height}</h5>
           <h5>WEIGHT: {weight}</h5>
           <h4>Types </h4>
           {types?.map((t, index)=> (
               <h4 key={index}>{t}</h4>))}

        </div>
    )
}