import {
    GET_ALL_POKEMONS,
    GET_POKEMON_BY_ID,
    GET_POKEMON_BY_NAME,
    GET_TYPES,
    FILTER_POKEMONS_BY_TYPE,
    FILTER_POKEMONS_BY_CREATOR,
    ORDER_POKEMONS,
    RESET_SHOWPOKEMONS,
    RESET_POKEMON_DETAIL
    // ADD_FAVORITE,
    // REMOVE_FAVORITE, 
    } from "../actions/index"


const initialState = {
    loadedPokemons: [],
    showPokemons: [],
    types:[],
    pokemonDetail:undefined,
    
    // favoritesPokemons: [],
};

const reducer = (state= initialState, action)=>{
    switch(action.type){
        case GET_ALL_POKEMONS:
            //con esto adecuo el formato del type de los pokes que vienen de la Db
            action.payload.forEach(p=>{
                if(p.dbId){                             
                    p.types = p.types.length<2          
                    ? [p.types[0].name]
                    : [p.types[0].name, p.types[1].name]
                }
            })
            return {
                ...state,
                loadedPokemons:action.payload,
                showPokemons:action.payload
            }
        case GET_POKEMON_BY_ID:
            //con esto adecuo el formato del type de los pokes que vienen de la Db
            if(action.payload.dbId){                             
                action.payload.types = action.payload.types.length<2          
                    ? [action.payload.types[0].name]
                    : [action.payload.types[0].name, action.payload.types[1].name]
            }
            return {
                ...state,
                pokemonDetail:action.payload
            }    
        case GET_POKEMON_BY_NAME:
            if(!action.payload){
                return {
                    ...state,
                    showPokemons:[404]
                }
            }else {
                const data = action.payload;
                const foundPokemon = [];
                //con esto adecuo el formato del type de los pokes que vienen de la Db
                if(data.dbId){                             
                    data.types = data.types.length<2          
                        ? [data.types[0].name]
                        : [data.types[0].name, data.types[1].name]
                }
                foundPokemon.push(data)
                return {
                    ...state,
                    showPokemons:foundPokemon
                }
            } 
        case GET_TYPES:
            return {
                ...state,
                types:action.payload
            }
        case FILTER_POKEMONS_BY_TYPE:
            let filter = state.loadedPokemons.filter(p => p.types.includes(action.payload))
            if(!filter.length){
                filter = [404];
            }
            return {
                ...state,
                showPokemons:filter
            }
        case FILTER_POKEMONS_BY_CREATOR:
            if(action.payload === 'own'){
                let filter = state.loadedPokemons.filter(p=> p.hasOwnProperty('dbId'))
                if(!filter.length){
                    filter = [404];
                }
                return{
                    ...state,
                    showPokemons:filter
                }
            }
            if(action.payload === 'api'){
                const filter = state.loadedPokemons.filter(p=> !p.hasOwnProperty('dbId'))
                if(!filter.length){
                    filter = [404];
                }
                return{
                    ...state,
                    showPokemons:filter
                } 
            }
        case ORDER_POKEMONS:
            const{ attribute, way } = action.payload;
            let orderedPokemons = [];
            if(way === 'asc'){
                orderedPokemons = state.showPokemons.sort((a, b)=>{
                    if(a[attribute] < b[attribute])return -1;
                    if(a[attribute] > b[attribute])return 1;
                    return 0;
                })
            }else{
                orderedPokemons = state.showPokemons.sort((a, b)=>{
                    if(a[attribute] < b[attribute])return 1;
                    if(a[attribute] > b[attribute])return -1;
                    return 0;
                })
            }
            return{
                ...state,
                showPokemons: orderedPokemons
            }
        case RESET_SHOWPOKEMONS:
            return{
                ...state,
                showPokemons:[]
            }
        case RESET_POKEMON_DETAIL:
            return{
                ...state,
                pokemonDetail:undefined
            }
        default:
            return state;
    }
}

export default reducer;



