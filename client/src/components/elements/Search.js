import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getPokemonByName, resetShowPokemons } from '../../store/actions/index';


export default function Search (){  
    const [input, setInput] = useState('');
    
    const handleChange = (e) => {
        setInput(e.target.value);
        };

    const dispatch = useDispatch();
    
    const handleSubmit = (e) =>{
        e.preventDefault();
        dispatch(resetShowPokemons())
        dispatch(getPokemonByName(input))
        setInput('');
    }
    
    return(
        <div>
            <div>
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

