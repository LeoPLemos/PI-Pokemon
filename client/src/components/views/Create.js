import React, { useEffect, useState } from "react";
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
        type1:'',
        type2:''
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
        type1:'',
        type2:''
    });


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

    

    const handleSubmit=(e)=>{
        e.preventDefault();
        console.log('BOTON CREAR')
    }
        

    return(
        <div>
            
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
                    <h4>Types</h4>
                    <label htmlFor="type1">Choose a primary tipe:  </label>
                    <select 
                        name="type1"
                        value={input.type1}
                        onChange={handleInputChange}
                    >
                        {types?.map((type)=>(
                            <option key={type.id} value={type.name}>{type.name}</option>    
                        ))}
                    </select> 
                    <br/>
                    {/* <label htmlFor="type2">Choose a secondary type:  </label>
                    <select 
                        name="type2"
                        value={input.type2}
                        onChange={handleInputChange}
                    >
                        <option value=''></option>
                        <option value='electric'>Electric</option>
                        <option value='fire'>Fire</option>
                        <option value='grass'>Grass</option>
                        <option value='poison'>Poison</option>
                    </select> */}
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
    
    if (!input.type1) {
        errors.type1 = "must select at least one type";
    }

    if (input.type2 && input.type1 === input.type2) {
        errors.type2 = "type already exists";
    } 
    
    return errors;
}



  