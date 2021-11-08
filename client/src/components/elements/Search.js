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
            <form onSubmit={(e) => handleSubmit(e)}>
                <div className="search_tile">    
                    <div className="search_input">
                        <input
                        placeholder="Search your Pokemon..."
                        type="text"
                        id="search"
                        name="input"
                        autoComplete="off"
                        value={input}
                        onChange={(e) => handleChange(e)}
                        />
                    </div >
                    <div className="search_button">
                        <button type="submit">Search</button>
                    </div>
                </div>
            </form>
        </div>
    )
}

