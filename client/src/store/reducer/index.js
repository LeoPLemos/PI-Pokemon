import {
    GET_ALL_POKEMONS,
    GET_POKEMON_BY_ID,
    GET_POKEMON_BY_NAME,
    GET_TYPES,
    FILTER_POKEMONS_BY_TYPE,
    FILTER_POKEMONS_BY_CREATOR,
    // ORDER_POKEMONS,
    // CREATE_POKEMON,
    // ADD_FAVORITE,
    // REMOVE_FAVORITE, 
    } from "../actions/index"


const initialState = {
    loadedPokemons: [],
    filteredPokemons: [],
    orderedPokemons: [],
    // favoritesPokemons: [],
    types:[],
    pokemonDetail:{}        //esto debería sacarlo de la store
};

const reducer = (state= initialState, action)=>{
    switch(action.type){
        case GET_ALL_POKEMONS:
            return {
                ...state,
                loadedPokemons:action.payload
            }
        case GET_POKEMON_BY_ID:
            return {
                ...state,
                pokemonDetail:action.payload
            }    
        case GET_POKEMON_BY_NAME:
            return {
                ...state,
                pokemonDetail:action.payload
            }
        case GET_TYPES:
            return {
                ...state,
                types:action.payload
            }
        case FILTER_POKEMONS_BY_TYPE:
            const filter = state.loadedPokemons.filter(p => p.types.includes(action.payload))
            return {
                ...state,
                filteredPokemons:filter
            }
        case FILTER_POKEMONS_BY_CREATOR:
            if(action.payload === 'own'){
                const filter = state.loadedPokemons.filter(p=> p.hasOwnProperty('dbId'))
                return{
                    ...state,
                    filteredPokemons:filter
                }
            }
            if(action.payload === 'api'){
                const filter = state.loadedPokemons.filter(p=> !p.hasOwnProperty('dbId'))
                return{
                    ...state,
                    filteredPokemons:filter
                } 
            }
        
        default:
            return state;
    }
}

export default reducer;



