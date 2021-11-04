import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { getAllPokemons, } from '../store/actions';
import Search from './elements/Search'
import Pokemon from './Pokemon'
import Paged from './elements/Paged';
import FilterByType from './elements/FilterByType';
import FilterByCreator from './elements/FilterByCreator';
import Order from './elements/Order';



export default function Pokemons() {
    const pokemons = useSelector((state)=> state.showPokemons);  
    let dispatch = useDispatch();

    const [currentPage, setCurrentPage] = useState(1);
    const [pokemonsPerPage, setPokemonsPerPage]= useState(9);
    const indexLastPokemon = currentPage * pokemonsPerPage;
    const indexFirstPokemon = indexLastPokemon - pokemonsPerPage;
    const currentPokemons = pokemons.slice(indexFirstPokemon, indexLastPokemon);
    const paged = (pageNumber)=>{
        setCurrentPage(pageNumber)
    }
    //este estado es solo para que vuelva a renderizar cuando cambio el orden
    const[order, setOrder]= useState('')        

    const handleLoadOnClick = (e)=>{
            dispatch(getAllPokemons())    
    }

    // useEffect(() =>{
    //     dispatch(getAllPokemons())
    // }, [dispatch]);
    
    return(
        <div>
            <div>
                <button onClick= {handleLoadOnClick}>Load All Pokemons</button>
            </div>
            <br/>
            <div>
                <Link to ='/create'>
                    <button >Create Pokemon</button>
                </Link>   
            </div>
            <div>
                <Search/>
            </div>
            <div>
               <FilterByType/> 
            </div>
            <div>
               <FilterByCreator/> 
            </div>
            <div>
               <Order
                    setCurrentPage={setCurrentPage}
                    setOrder={setOrder}
               /> 
            </div>
            <div>
                <Paged
                    pokemonsPerPage={pokemonsPerPage}
                    pokemons={pokemons.length}
                    paged={paged}
                />
            </div>
            <div>
                {currentPokemons?.map(p => {
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
        </div>
    )
}

