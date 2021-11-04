import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getPokemonByName } from '../../store/actions/index';
import GetByName  from './GetByName'


export default function Search (){  
    const [input, setInput] = useState('');
    
    const handleChange = (e) => {
        setInput(e.target.value);
        };

    const dispatch = useDispatch();
    
    const handleSubmit = (e) =>{
        e.preventDefault();
        dispatch(getPokemonByName(input))
        setInput('');
    }
    const foundPokemon = useSelector((state)=> state.pokemonDetail)
    
    const { id, dbId, name, image} = foundPokemon;
    
    return(
        <div>
            <div>
                <h2>Buscador</h2>
                <form className="form-container" onSubmit={(e) => handleSubmit(e)}>
                    <div>
                        <input
                        type="text"
                        id="search"
                        name="input"
                        autoComplete="off"
                        value={input}
                        onChange={(e) => handleChange(e)}
                        />
                    </div>
                    <br/>
                    <button type="submit">SEARCH POKEMON</button>
                </form>
                <hr/>
            </div>
            
        </div>
    )
}

