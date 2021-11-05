import React, { useEffect, useState } from 'react';
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import { getPokemonById, resetPokemonDetail } from '../../store/actions';


export default function DetailPokemon(props){
    const pokemonId = props.match.params.id

    const detailPokemon = useSelector((state)=> state.pokemonDetail);  
    let dispatch = useDispatch();
    useEffect(() =>{
        dispatch(resetPokemonDetail())
        dispatch(getPokemonById(pokemonId))
        return ()=>dispatch(resetPokemonDetail())
    }, [pokemonId, dispatch]);

    function capitalizeName(name) {
        return name.charAt(0).toUpperCase() + name.slice(1);
      }

    return(
        <div>
            <div>
                <Link to='/home'>
                    <button>Home</button>
                </Link>
            </div>
            <div>
                {!detailPokemon? 
                    <>
                    <div>
                        <h4>Loading...</h4>
                    </div>
                    </>
                    :
                    <div>
                        <h3>{detailPokemon.dbId? 'Own'+ detailPokemon.dbId : '#'+ detailPokemon.id}</h3>
                        <img src={detailPokemon.image} alt={detailPokemon.name}/>
                        <h2>{capitalizeName(detailPokemon.name)}</h2>
                        <h5>Health Points: {detailPokemon.hp}</h5>
                        <h5>Attack: {detailPokemon.attack}</h5>
                        <h5>Defense: {detailPokemon.defense}</h5>
                        <h5>Speed: {detailPokemon.speed}</h5>
                        <h5>Height: {detailPokemon.height}</h5>
                        <h5>Weight: {detailPokemon.weight}</h5>
                        <h4>Types </h4>
                        {detailPokemon.types?.map((t, index)=> (
                            <h4 key={index}>{t}</h4>))}
                    </div>        
                }        
            </div>
        </div>
    )
}


                    