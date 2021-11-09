import React, { useEffect, useState } from 'react';
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import Loading from './Loading';
import './DetailPokemon.css'
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
            <div className="detail_page">
                <div className="button_home">
                    <Link to='/home'>
                        <button>Home</button>
                    </Link>
                </div>
                
                    {!detailPokemon? 
                        <>
                        <div>
                            <br/>
                            <br/>
                            <br/>
                            <br/>
                            <br/>
                            <br/>
                            <Loading />
                        </div>
                        </>
                        :
                        <div className="container">
                            <div className="img_container">
                                <img cassName="image" src={detailPokemon.image} alt={detailPokemon.name}/>
                            </div>
                            <div className="detail">
                                <div className="id">
                                    <h3>{detailPokemon.dbId? 'Own'+ detailPokemon.dbId : '#'+ detailPokemon.id}</h3>
                                </div>
                                <div className="name">
                                    <h2>{capitalizeName(detailPokemon.name)}</h2>
                                </div>
                                <div className="height">Height {detailPokemon.height}</div>
                                <div className="weight">Weight {detailPokemon.weight}</div>
                                <div className="stats_container">
                                    <div className="stats_title">Stats</div>
                                    <div className="hp">Health Points {detailPokemon.hp}</div>
                                    <div className="attack">Attack {detailPokemon.attack}</div>
                                    <div className="defense">Defense {detailPokemon.defense}</div>
                                    <div className="speed">Speed {detailPokemon.speed}</div>
                                </div>
                                <div className="types_container">
                                    <div className="types_title">Types</div>
                                    <div className="types">
                                        {detailPokemon.types?.map((t, index)=> (
                                        <div key={index}>{t}</div>))}
                                    </div>    
                                </div>
                            </div>        
                        </div>        
                    }        
                
            </div>    
        </div>
    )
}


                    