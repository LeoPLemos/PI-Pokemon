import React from "react";
import { useDispatch } from "react-redux";
import { filterByCreator } from "../../store/actions";


export default function FilterByCreator(){
     
    let dispatch = useDispatch();
    
    const handleChange=(e)=>{
        e.preventDefault();
        if(e.target.value){
        dispatch(filterByCreator(e.target.value))
        }
    }
    
    return(
        <div>
            <h4>Filter by Creator</h4>
                <label>Creator:  </label>
                <select 
                    onChange={handleChange}
                >
                    <option value={null}></option>
                    <option value='api'>Original</option>
                    <option value='own'>Created</option> 
                </select>
            <hr/>
        </div>
    )
}


