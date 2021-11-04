import React from "react";
import { useDispatch } from "react-redux";
import { filterByCreator } from "../../store/actions";


export default function FilterByCreator(){
     
    let dispatch = useDispatch();
    
    const handleChange=(e)=>{
        e.preventDefault();
        dispatch(filterByCreator(e.target.value))
    }
    
    return(
        <div>
            <h4>Filter by Creator</h4>
                <label htmlFor="type1">Creator:  </label>
                <select 
                    onChange={handleChange}
                >
                    <option value='api'>Original</option>
                    <option value='own'>Created</option> 
                </select>
            <hr/>
        </div>
    )
}


