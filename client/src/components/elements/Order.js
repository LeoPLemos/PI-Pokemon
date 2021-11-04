import React, { useState } from "react";
import { orderPokemons } from '../../store/actions/index'
import { useDispatch } from "react-redux";

export default function Order({ setCurrentPage, setOrder }){
    const[input, setInput]= useState({
        attribute:'name',
        way:'asc'
    })

    const dispatch = useDispatch();
    
    const handleChange=(e)=>{
        e.preventDefault();
        setInput({
            ...input, [e.target.name]:e.target.value
        })

    }
    
    const handleOnClick = (e)=>{
        e.preventDefault();
        dispatch(orderPokemons(input.attribute, input.way))
        setCurrentPage(1);
        setOrder(`Orderer by ${input.attribute} in order ${input.way}`)
    }

    return(
        <div>   
            <h4>Order</h4>
                <div>
                    <label>Order by: </label>
                    <select 
                        name='attribute'
                        onChange={handleChange}
                    >
                        <option value='name'>Name</option>
                        <option value='hp'>Health Points</option>
                        <option value='attack'>Attack</option>
                        <option value='defense'>Defense</option>
                        <option value='speed'>Speed</option>
                        <option value='height'>Height</option>
                        <option value='weight'>Weight</option> 
                    </select>
                </div>
                <div>
                    <select 
                        name='way'
                        onChange={handleChange}
                    >
                        <option value='asc'>Asc</option>
                        <option value='des'>Des</option>
                    </select>
                </div>
                <div>
                    <button onClick={handleOnClick}>Order</button>
                </div>

            <hr/>
        </div>
    )

}