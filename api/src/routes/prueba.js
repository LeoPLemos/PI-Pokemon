const axios = require('axios');
const { Pokemon, Type } = require('../db')

// const getPokemonsDb = async () =>{
//     try{
//     const pokemonsDb = await Pokemon.findAll({include: Type})
//         return pokemonsDb
//     } catch(err){
//         console.log(err)
//     }
// }

// const pokes = async ()=>{
//     const res = await getPokemonsDb()
//     console.log(res)
// }

// pokes()


// const pokemons = async()=>{
//     const res = await getPokemonsDb()
//     console.log(res)
// }

//*** BUSCA LOS POKEMONS DE LA DB ***
    // let resDb = []
    
    // return Pokemon.findAll()
    // .then(r =>{
    //     resDb = r
    //     return res.json(resDb)
    // })
    // .catch((error) => {
    //     next(error)
    // })


const getPokemonApi = async (pokemon) =>{
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
    console.log(detailPokemon)

    }catch(err){
        console.log(err)
    }
}

getPokemonApi(3)
getPokemonApi(4)
getPokemonApi(560)
