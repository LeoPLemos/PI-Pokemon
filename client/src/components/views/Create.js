import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { getTypes } from "../../store/actions";



export default function Create(){
    const types = useSelector((state)=> state.types);
    const dispatch = useDispatch()
    useEffect(() =>{
        dispatch(getTypes())
        
    }, [dispatch]);
    
    const [input, setInput] = useState({
        name:'',
        hp:0,
        attack:0,
        defense:0,
        speed:0,
        height:0,
        weight:0,
        image:'',
    })

    const [errors, setErrors] = useState({
        name:'name is required',
        hp:'',
        attack:'',
        defense:'',
        speed:'',
        height:'',
        weight:'',
        image:'',
    });

    const [typesToAdd, setTypesToAdd] = useState([]);

    let [typesError, setTypesError] = useState('A Pokemon must have at least one type');
    
    const handleInputChange=(e)=>{
        setInput({
            ...input, [e.target.name]:e.target.value
        })
        setErrors(
            validate({
              ...input,
              [e.target.name]: e.target.value,
            })
        );
    };

    const handleTypesChange=(e)=>{
        const selectedType = types.filter(t=> t.name === e.target.value);
        const typeId = selectedType[0].id;
        if(typesToAdd.length < 2){
            setTypesToAdd([...typesToAdd, {id:typeId, name:e.target.value}])
            setTypesError('')
        }else{
            setTypesError('A Pokemon can have only two types');
        }
        
    };

    const handleClearTypes = (e)=>{
        e.preventDefault();
        const arrTypes =  typesToAdd.filter(t=> t.name !== e.target.value)
        setTypesToAdd(arrTypes)
        if(arrTypes.length === 1){
            setTypesError('')
        }else{
            setTypesError('A Pokemon must have at least one type')
        }
    }
    

    const handleSubmit=(e)=>{
        e.preventDefault();
        const typesIds = typesToAdd.map(t=> t.id)
        const newPokemon = {...input, types:typesIds}
        axios.post("http://localhost:3001/pokemons", newPokemon)
        
    }
        

    return(
        <div>
            <Link to ='/home'>
                <button>Back</button>
            </Link>
            <br/>
            <div>
                <form>
                    <label htmlFor='name'>Name:</label>
                    <input
                        className={errors.name && "danger"}
                        type='text'
                        name='name'
                        value={input.name}
                        onChange={handleInputChange}
                    />
                    {errors.name && <p className="danger">{errors.name}</p>}
                    <div>
                        <h4>Stats</h4>
                        <label htmlFor='hp'>Health Points:</label>
                        <input
                            type= 'number'
                            name='hp'
                            value={input.hp}
                            onChange={handleInputChange}
                        />
                        <label htmlFor='attack'>Attack:</label>
                        <input
                            type= 'number'
                            name='attack'
                            value={input.attack}
                            onChange={handleInputChange}
                        />
                        <br/>
                        <label htmlFor='defense'>Defense:</label>
                        <input
                            type= 'number'
                            name='defense'
                            value={input.defense}
                            onChange={handleInputChange}
                        />
                        <label htmlFor='speed'>Speed</label>
                        <input
                            type= 'number'
                            name='speed'
                            value={input.speed}
                            onChange={handleInputChange}
                        />
                    </div>
                    <br/>
                    <label htmlFor='height'>Height:</label>
                    <input
                        type= 'number'
                        name='height'
                        value={input.height}
                        onChange={handleInputChange}
                    />
                    <label htmlFor='weight'>Weight:</label>
                    <input
                        type= 'number'
                        name='weight'
                        value={input.weight}
                        onChange={handleInputChange}
                    />
                    <br/>
                    <label htmlFor='image'>Image:</label>
                    <input
                        type= 'url'
                        name='image'
                        value={input.image}
                        onChange={handleInputChange}
                    />
                    <br/>
                    <div>   
                        <h4>Types</h4>
                        <label htmlFor="type1">Choose a type:  </label>
                        <select 
                            // name="type1"
                            // value={input.type1}
                            onChange={handleTypesChange}
                        >
                            {types?.map((type)=>(
                                <option key={type.id} value={type.name}>{type.name}</option>    
                            ))}
                        </select>
                        <div>
                            {typesToAdd.map((type, index)=>(
                                <div key = {index}>
                                    <p>{type.name}</p>
                                    <button 
                                        onClick = {handleClearTypes}
                                        value={type.name}
                                    >X</button>
                                </div>
                                
                            ))}

                        </div>

                    </div>
                    <br/>

                    
                    <br/>
                    <br/>
                    <button 
                        type="submit"
                        onClick = {handleSubmit}
                    >
                        Create Pokemon
                    </button> 
                    
                </form>

            </div>

        </div>



    )

}

export function validate(input) {
    let errors = {};
    if (!input.name) {
        errors.name = "name is required";
    // } else {
    //     errors.name = "";
    }
  
    if (!input.hp) {
        errors.hp = "set health points";
    } else if (input.hp < 1) {
        errors.hp = "must be greater than zero";
    }

    if (!input.attack) {
        errors.attack = "set attack";
    } else if (input.attack < 1) {
        errors.attack = "must be greater than zero";
    }

    if (!input.defense) {
        errors.defense = "set defense";
    } else if (input.defense < 1) {
        errors.defense = "must be greater than zero";
    }

    if (!input.speed) {
        errors.speed = "set speed";
    } else if (input.speed < 1) {
        errors.speed = "must be greater than zero";
    }

    if (!input.height) {
        errors.height = "set height";
    } else if (input.height < 1) {
        errors.height = "must be greater than zero";
    }

    if (!input.weight) {
        errors.weight = "set weight";
    } else if (input.weight < 1) {
        errors.weight = "must be greater than zero";
    }
    //modificando
    if (!input.image) {
        errors.image = "insert image url";
        } else if (!/^(?:http(s)?:\/\/)?[\w.-]+(?:\.[\w.-]+)+[\w\-._~:/?#[\]@!$&'()*+,;=.]+$/.test(input.image)) {
            errors.image = "the url is invalid"; 
        }
    //control types
    // if (typesToAdd.length ) {
    //     errors.type1 = "must select at least one type";
    // }

    // if (input.type2 && input.type1 === input.type2) {
    //     errors.type2 = "type already exists";
    // } 
    
    return errors;
}



  