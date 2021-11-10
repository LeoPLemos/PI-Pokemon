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
            <div className="by_type_title"></div>
                <label className="label_filter">Type:  </label>
                <select 
                    onChange={handleChange}
                >
                    <option value={null}>Select...</option>
                    {types?.map((type)=>(
                        <option className="select" key={type.id} value={type.name}>{type.name}</option>    
                    ))}
                </select>
        </div>
    )        
}

       