import React, { useEffect, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { getAllPokemons, getTypes } from "../../store/actions";
import './Create.css';
import pikachu from '../../assets/pikachu_create.svg';



export default function Create(){
    const types = useSelector((state)=> state.types);
    const dispatch = useDispatch();
    const history = useHistory();
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
        image:''
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
        if(
            errors.name ||
            errors.hp ||
            errors.attack ||
            errors.defense ||
            errors.speed ||
            errors.height ||
            errors.weight ||
            errors.image ||
            typesError.length){
            return alert('Please, resolve the errors indicated and try again')
        }        
        const typesIds = typesToAdd.map(t=> t.id)
        const newPokemon = {...input, types:typesIds}
        axios.post("http://localhost:3001/pokemons", newPokemon)
        .then(res =>{
            dispatch(getAllPokemons())
            alert('Pokemon created successfully')
            setInput({
                name:'',
                hp:0,
                attack:0,
                defense:0,
                speed:0,
                height:0,
                weight:0,
                image:''
                })
            setTypesToAdd([]);
            history.push('/home')
        })
        .catch((err)=> {
            return alert(`The name ${input.name} already exists.
                     The pokemon was not created`) 
        })
    }

    const handleOnClickClear=(e)=>{
        e.preventDefault();
        setInput({
            name:'',
            hp:0,
            attack:0,
            defense:0,
            speed:0,
            height:0,
            weight:0,
            image:''
            })
        setTypesToAdd([]);
    }
            
    return(
        <div>
            <div className = "button_home">
                <Link to ='/home'>
                    <button>Home</button>
                </Link>
            </div>
            <h3>Create your Pokemon</h3>
            <div className="form_container">
                <div className="pikachu_container">
                    <img src={pikachu} alt="pikachu"></img>
                </div>
                <div className="form">
                    <form>
                        <div className = "div_name">
                            <label className = "label_name" htmlFor='name'>Name:</label>
                            <input
                                className="create_input_name"
                                type='text'
                                name='name'
                                value={input.name}
                                onChange={handleInputChange}
                            />
                            {errors.name && <p className="danger">{errors.name}</p>}
                        </div>
                        
                        <div className="container_url_image">
                            <label className="label_url_image" htmlFor='image'>url Image:</label>
                            <input
                                className="input_url_image"
                                type= 'url'
                                name='image'
                                value={input.image}
                                onChange={handleInputChange}
                            />
                            {errors.image && <p className="danger">{errors.image}</p>}
                        </div>
                        
                        <div className="size_container">
                            <div className="size">
                                <label htmlFor='height'className="label_size">Height:</label>
                                <input
                                    className="input_size"
                                    type= 'number'
                                    name='height'
                                    value={input.height}
                                    onChange={handleInputChange}
                                />
                            </div>
                            <div className="size">  
                                <label htmlFor='weight' className="label_size">Weight:</label>
                                <input
                                    className="input_size"
                                    type= 'number'
                                    name='weight'
                                    value={input.weight}
                                    onChange={handleInputChange}
                                />
                            </div>
                            <div className="size_errors">
                                {errors.height && <p className="danger">{errors.height}</p>}
                                {errors.weight && <p className="danger">{errors.weight}</p>}
                            </div>
                        </div>

                        <div className="create_stats_container">    
                            <div className = "create_stats_title">Stats</div>
                            <div className="create_stats_inputs_container">
                                <div className="stats_inputs_pair">
                                    <div className="create_stats_input">
                                        <label htmlFor='hp' className="create_stats_label">Health Points:</label>
                                        <input
                                            className="create_input_stats"
                                            type= 'number'
                                            name='hp'
                                            value={input.hp}
                                            onChange={handleInputChange}
                                        />
                                    </div>
                                    <div className="create_stats_input">    
                                        <label htmlFor='attack' className="create_stats_label">Attack:</label>
                                        <input
                                            className="create_input_stats"
                                            type= 'number'
                                            name='attack'
                                            value={input.attack}
                                            onChange={handleInputChange}
                                        />
                                    </div>
                                    <div className="stats_errors">
                                        {errors.hp && <p className="danger">{errors.hp}</p>}
                                        {errors.attack && <p className="danger">{errors.attack}</p>}
                                    </div>
                                </div>
                                <div className="stats_inputs_pair">   
                                    <div className="create_stats_input"> 
                                        <label htmlFor='defense' className="create_stats_label">Defense:</label>
                                        <input
                                            className="create_input_stats"
                                            type= 'number'
                                            name='defense'
                                            value={input.defense}
                                            onChange={handleInputChange}
                                        />
                                    </div>
                                    <div className="create_stats_input">    
                                        <label htmlFor='speed' className="create_stats_label">Speed</label>
                                        <input
                                            className="create_input_stats"
                                            type= 'number'
                                            name='speed'
                                            value={input.speed}
                                            onChange={handleInputChange}
                                        />
                                    </div>
                                    <div className="stats_errors">
                                        {errors.defense && <p className="danger">{errors.defense}</p>}
                                        {errors.speed && <p className="danger">{errors.speed}</p>}
                                    </div>
                                </div>    
                            </div>
                        </div>

                        <div className="create_types_container">   
                            <div className="create_type_title">Types</div>
                            <div className="select_types_container">
                                <div className="selector_type">
                                    <label htmlFor="type1" className="select_type_label">Choose a type:  </label>
                                    <select 
                                        onChange={handleTypesChange}
                                    >
                                        {types?.map((type)=>(
                                            <option key={type.id} value={type.name}>{type.name}</option>    
                                        ))}
                                    </select>
                                </div>
                                <div className="selected_types">    
                                        {typesToAdd.map((type, index)=>(
                                            <div className="each_selected_type" key = {index}>
                                                <p className="name_selected_type">{type.name}</p>
                                                <button 
                                                    onClick = {handleClearTypes}
                                                    value={type.name}
                                                >X</button>
                                            </div>
                                        ))}
                                </div>  
                                <div>
                                    {typesError && <p className="danger">{typesError}</p>}
                                </div>  
                            </div>
                        </div>
                        <div className="create_button">
                            <button 
                                id="createButton"
                                onClick = {handleOnClickClear}
                            >
                                Clear All
                            </button>
                            <button 
                                type="submit"
                                onClick = {handleSubmit}
                            >
                                Create Pokemon
                            </button>
                        </div> 
                    </form>

                </div>
            </div>
        </div>



    )

}

export function validate(input) {
    let errors = {};
    if (!input.name) {
        errors.name = "name is required";
    
    }
  
    if (input.hp < 0) {
        errors.hp = "it can't be negative";
        }

    if (input.attack < 0) {
        errors.attack = "it can't be negative";
    }

    if (input.defense < 0) {
        errors.defense = "it can't be negative";
    }

    if (input.speed < 0) {
        errors.speed = "it can't be negative";
    }

    if (input.height < 0) {
        errors.height = "it can't be negative";
    }

    if (input.weight < 0) {
        errors.weight = "it can't be negative";
    }
    //modificando
    if(input.image){
        if (!/^(?:http(s)?:\/\/)?[\w.-]+(?:\.[\w.-]+)+[\w\-._~:/?#[\]@!$&'()*+,;=.]+$/.test(input.image)) {
            errors.image = "the url is invalid"; 
        }
    }
        
    return errors;
}



  