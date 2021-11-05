import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { filterByType, getTypes } from "../../store/actions";




export default function FilterByType(){
    const types = useSelector(state=> state.types) 
    const dispatch = useDispatch();
    
    useEffect(() =>{
        dispatch(getTypes())
        
    }, [dispatch]);
        
    const handleChange=(e)=>{
        e.preventDefault();
        if(e.target.value){
        dispatch(filterByType(e.target.value))
        }
    }
    
    return( 
        <div>
            <h4>Filter by Type</h4>
                <label>Type:  </label>
                <select 
                    onChange={handleChange}
                >
                    <option value={null}></option>
                    {types?.map((type)=>(
                        <option key={type.id} value={type.name}>{type.name}</option>    
                    ))}
                </select>
            <hr/>
        </div>
    )        
}

       