import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAllPokemons, } from '../store/actions';
import Pokemon from './Pokemon'


export default function Pokemons() {
    const pokemons = useSelector((state)=> state.loadedPokemons);  
    let dispatch = useDispatch();
    useEffect(() =>{
        dispatch(getAllPokemons())
    }, [dispatch]);
    
    return(
        <div>
            {pokemons?.map(p => {
                return <div key={p.id}>
                        <Pokemon
                            id = {p.id}
                            dbId = {p.dbId}
                            name = {p.name}
                            image = {p.image}
                            type1 = {p.types[0]}
                            type2 = {p.types[1]}
                        />
                        
                        </div>
            })}    
        </div>
    )
}

