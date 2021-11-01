import React, {useEffect, useState} from "react";
import { useSelector, useDispatch } from "react-redux";
import { getAllPokemons, filterByCreator } from "../../store/actions";
import Pokemon from "../Pokemon";



export default function FilterCreate(){
     
    let dispatch = useDispatch();
    useEffect(() =>{
        dispatch(getAllPokemons())
    }, [dispatch]);

    const filter = useSelector((state)=> state.filteredPokemons)
    
    const [input, setInput] = useState('');
    
    const handleChange = (e) => {
        setInput(e.target.value);
        };

        
    const handleOnClick = (e) =>{
        dispatch(filterByCreator(input))
        setInput('');
        
    }
    
    return <div>
            <div>
                <input 
                    value={input}
                    onChange={handleChange}/>
                <button onClick = {handleOnClick}>Filtrar</button>
            </div>
            <div>
                {filter.map(p=>(
                    <div key={p.id}>   
                        <Pokemon
                                id={p.id}
                                dbId = {p.dbId}
                                name={p.name}
                                image={p.image}
                                types={p.types} 
                            />
                    </div>    
                ))}
            </div>
    </div>
}