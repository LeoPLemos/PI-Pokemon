const axios = require('axios');
const { Op } = require("sequelize");
const { Pokemon, Type } = require('../db')


// *** Trae todos los pokemons de la PokeApi (con la limitación indicada por cuestiones de eficiencia)***

const getPokemonsApi = async () =>{
    try{
    const firstResults = await axios.get('https://pokeapi.co/api/v2/pokemon?limit=5') //hago la primera consulta a la API
        const result = firstResults.data.results.map(e=>  axios.get(e.url))
            // result es un array con los resultados de la segunda consulta
             let pokemons = Promise.all(result) //me guardo la promesa para retornarla
                       //este e es un array con los objetos data de la respuesta axios 
                .then(e=> {
                    let pokemon = e.map(e=> e.data) //crea un array con los objetos pokemon
                    let arrPokemons = []
                    pokemon.map(e => {
                        arrPokemons.push({
                            id: e.id,
                            name : e.name,
                            // hp: e.stats[0].base_stat,
                            // attack: e.stats[1].base_stat,
                            // defense: e.stats[2].base_stat,
                            // spAttack: e.stats[3].base_stat,
                            // spDefense: e.stats[4].base_stat,
                            // speed: e.stats[5].base_stat,
                            // height: e.height,
                            // weight: e.weight,
                            image: e.sprites.other.dream_world.front_default,
                            types: e.types.length < 2 
                                ? [e.types[0].type.name]
                                : [e.types[0].type.name, e.types[1].type.name]
                            })
                    })
                    return arrPokemons
                })
            return pokemons
    
    }catch(err){
        console.log(err)
    }
}    

// *** Trae todos los pokemons de la DB ***

const getPokemonsDb = async () =>{
    try{
        const pokesDb = await Pokemon.findAll({
            attributes: ['id', 'dbId', 'name', 'image'],
            include: {
                model: Type,
                attributes: ['id', 'name']
            }
        })
        return pokesDb
    
    }catch(err){
        console.log(err)
    }
}  

// *** Trae el pokemon de la PokeApi solicitado por id o nombre ***

const getPokemonApi = async (pokemon) =>{
    if(typeof pokemon === 'string'){
        pokemon = pokemon.toLowerCase();
    }
    try{
        const foundPokemon = await axios.get(`https://pokeapi.co/api/v2/pokemon/${pokemon}/`)
        const detailPokemon = {
            id: foundPokemon.data.id,
            name : foundPokemon.data.name,
            hp: foundPokemon.data.stats[0].base_stat,
            attack: foundPokemon.data.stats[1].base_stat,
            defense: foundPokemon.data.stats[2].base_stat,
            spAttack: foundPokemon.data.stats[3].base_stat,
            spDefense: foundPokemon.data.stats[4].base_stat,
            speed: foundPokemon.data.stats[5].base_stat,
            height: foundPokemon.data.height,
            weight: foundPokemon.data.weight,
            image: foundPokemon.data.sprites.other.dream_world.front_default,
            types: foundPokemon.data.types.length < 2 
                ? [foundPokemon.data.types[0].type.name]
                : [foundPokemon.data.types[0].type.name, foundPokemon.data.types[1].type.name]
        }                
        return detailPokemon
    
    }catch(err){
        console.log(err)
    }
} 

// *** Trae el pokemon de la DB solicitado por id ***

const getPokemonDbById = async (pokemon) =>{
    try{
        const detailPokemon = await Pokemon.findByPk(pokemon, {
            include: {
                model: Type,
                attributes: ['id', 'name']
            } 
        })
        return detailPokemon
    
    }catch(err){
        console.log(err)
    }
} 

// *** Trae el pokemon de la DB solicitado por nombre ***

const getPokemonDbByName = async (pokemon) =>{
    pokemon = pokemon.toLowerCase();
    try{
        const detailPokemon = await Pokemon.findOne({
            where: {
              name: pokemon
            },
            include: {
                model: Type,
                attributes: ['id', 'name']
            }
          });
        return detailPokemon
    
    }catch(err){
        console.log(err)
    }
}

//*** Crea un nuevo pokemon en la DB ***

const createPokemon = async (pokemon) =>{
    try{
        const newPokemon = await Pokemon.create({
            name: pokemon.name,
            hp:pokemon.hp,
            attack: pokemon.attack,
            defense: pokemon.defense,
            spAttack: pokemon.spAttack,
            spDefense: pokemon.spDefense,
            speed: pokemon.speed,
            height: pokemon.height,
            weight: pokemon.weight,
            image: pokemon.image,
            
        })
        console.log(pokemon.types)
        // let typeDb = await Type.findAll({
        //     where:{
        //         name:pokemon.types
        //     }
        // })
        let typeDb = await getTypesDb(pokemon.types)
        console.log(typeDb)
        newPokemon.addTypes(typeDb)
        return newPokemon;

    }catch(err){
        console.log(err)
    }
}

// *** Trae los tipos desde la PokeApi ***

const getTypesApi = async()=>{
    const response = await axios.get('https://pokeapi.co/api/v2/type/')
    const types = response.data.results;
    return types;
}

// *** Trae los tipos desde la Db ***

const getTypesDb = async(type)=>{
    if(type){
        const foundTypes = await Type.findAll({
            includes: Pokemon,
            where:{name: type}
        })
        return foundTypes;
    }
    const types = await Type.findAll({includes: Pokemon})
    return types;
}

// *** Crea un nuevo tipo en la Db ***

const createType = async(type)=>{
    const newType = await Type.create({
        name: type
    })
    return newType;
}

//*** Llena la Db con los tipos de la API ***

const fillTypesDb = async()=>{
    const types = await getTypesApi();  //acá tengo un array con {name, url}
    types.forEach(e =>{
        createType(e.name)
    })
}

//*** Asigna un tipo al pokemon ***

const assignType = async (pokemon, types) =>{                //recibe la id de un pokemon y un array de types
    const pokemonToAssing = await Pokemon.findByPk(pokemon);    // busco el pokemon por id
    const typesToAssing = await Type.findAll({                  // busco los tipos por id
        where: {
          [Op.or]: [
            { id: types[0] },
            { id: types[1] }
          ]
        }
      });
      pokemonToAssing.addTypes(typesToAssing)
}


module.exports = {
    getPokemonsApi,
    getPokemonsDb,
    getPokemonApi,
    getPokemonDbById,
    getPokemonDbByName,
    createPokemon,
    getTypesApi,
    getTypesDb,
    createType,
    fillTypesDb,
    assignType
    }
