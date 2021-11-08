import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { getAllPokemons, resetShowPokemons, } from '../../store/actions';
import Search from '../elements/Search'
import Pokemon from '../elements/Pokemon'
import Paged from '../elements/Paged';
import FilterByType from '../elements/FilterByType';
import FilterByCreator from '../elements/FilterByCreator';
import NotFound from './NotFound';
import Order from '../elements/Order';
import Header from './Header';
import './Pokemons.css'




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
            dispatch(resetShowPokemons())
            dispatch(getAllPokemons())    
    }

    // useEffect(() =>{
    //     dispatch(getAllPokemons())
    // }, [dispatch]);
    
    return(
        <div>
            {/* <br/>
            <div>
                <button onClick= {handleLoadOnClick}>All Pokemons</button>
            </div>
            <br/>
            <div>
                <Link to ='/create'>
                    <button >Create Pokemon</button>
                </Link>   
            </div>
            <br/>
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
            </div> */}

            <div>
                <Header
                    setCurrentPage={setCurrentPage}
                    setOrder={setOrder}
                />
            </div>

            <div  className="container_grid">
                {!currentPokemons.length?
                    <>
                    <div>
                        <h4>Loading...</h4>
                    </div>
                    </>
                    :
                    <>
                    {currentPokemons[0]=== 404?
                        <NotFound/>
                        : 
                        <>    
                        <div className="grid">    
                           {currentPokemons.map(p => {
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
                                })
                            }
                        </div> 
                        <div className="pagination">
                            <Paged
                                pokemonsPerPage={pokemonsPerPage}
                                pokemons={pokemons.length}
                                paged={paged}
                            />
                        </div>
                    </>
                    }
                    </>  
                }
            </div>    
        </div>
    )
}

