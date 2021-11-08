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
            <div className="by_creator_title"></div>
                <label className="label_filter">Creator:  </label>
                <select 
                    onChange={handleChange}
                >
                    <option value={null}>Select...</option>
                    <option value='api'>Original</option>
                    <option value='own'>Created</option> 
                </select>
        </div>
    )
}


