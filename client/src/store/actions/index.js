import axios from "axios"
export const GET_ALL_POKEMONS = 'GET ALL POKEMONS';
export const GET_POKEMON_BY_ID = 'GET POKEMON BY ID';
export const GET_POKEMON_BY_NAME = 'GET POKEMON BY NAME';
export const FILTER_POKEMONS_BY_TYPE = ' FILTER POKEMONS BY TYPE';
export const FILTER_POKEMONS_BY_CREATOR = ' FILTER POKEMONS BY CREATOR';
export const ORDER_POKEMONS = 'ORDER POKEMONS';
export const GET_TYPES = 'GET TYPES';
export const RESET_SHOWPOKEMONS = 'RESET SHOWPOKEMONS';
export const RESET_POKEMON_DETAIL = 'RESET POKEMON DETAIL';

// export const ADD_FAVORITE = 'ADD FAVORITE';
// export const REMOVE_FAVORITE = 'REMOVE FAVORITE';

export function getAllPokemons() {
    return function (dispatch) {
        axios.get("http://localhost:3001/pokemons")
        .then((response) => {
        dispatch({ type: GET_ALL_POKEMONS, payload: response.data });
        })
        .catch((err) => {
            console.log(err)
        })
    };
};

export function getPokemonById(id) {
    return function (dispatch) {
        axios.get(`http://localhost:3001/pokemons/${id}`)
        .then((response) => {
        dispatch({ type: GET_POKEMON_BY_ID, payload: response.data });
        })
        .catch((err) => {
            console.log(err)
        })
    };
};

export function getPokemonByName(name){
    return function (dispatch) {
        axios.get(`http://localhost:3001/pokemons?name=${name}`)
        .then((response) => {
        dispatch({ type: GET_POKEMON_BY_NAME, payload: response.data});
        })
        .catch((err) => {
            console.log(err)
            dispatch({ type: GET_POKEMON_BY_NAME, payload: null});
        })
    }; 
}

export function getTypes(){
    return function (dispatch){
        axios.get("http://localhost:3001/types")
        .then((response)=>{
            dispatch({type:GET_TYPES, payload:response.data})
        })
        .catch((err) => {
            console.log(err)
        })
    }
}

export function filterByType(type){
    return {
        type: FILTER_POKEMONS_BY_TYPE,
        payload: type
    }
}

export function filterByCreator(creator){
    return{
        type:FILTER_POKEMONS_BY_CREATOR,
        payload: creator
    }
}

export function orderPokemons(attribute, way){
    return{
        type:ORDER_POKEMONS,
        payload:{attribute, way}
    }
}

export function resetShowPokemons(){
    return{
        type: RESET_SHOWPOKEMONS,
    }
}

export function resetPokemonDetail(){
    return{
        type: RESET_POKEMON_DETAIL,
    }
}


// export function createPokemon(newPokemon){
//     return function (dispatch){
//         axios.post("http://localhost:3001/pokemons", newPokemon)
//         .then((response)=>{
//             dispatch({type:GET_TYPES, payload:response})
//         })
//         .catch((err) => {
//             console.log(err)
//         })
//     }
// }
