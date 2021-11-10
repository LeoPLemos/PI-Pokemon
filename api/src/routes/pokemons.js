const axios = require('axios');
const { Router } = require('express');
const { Pokemon, Type } = require('../db');
const { getPokemonsApi, getPokemonsDb, createPokemon, getPokemonApi, getPokemonDbById, getPokemonDbByName,getTypesDb } = require('../functions/functions');
const router = Router();

// esta ruta es para traer todos o uno por nombre

router.get('/', async (req, res, next)=>{
    const { name } = req.query
    // Si existe una query traigo solo el que me pide (puede haber uno en la Db y uno en la API)
    if(name){
        const foundPokeDb = await getPokemonDbByName(name);
        // const allFoundsPokemons = [...foundpokesDb];
        const foundPokeApi = await getPokemonApi(name);
        if(foundPokeDb){
            // allFoundsPokemons.push(foundpokesApi);
            return res.status(200).json(foundPokeDb)
        }
        // if(allFoundsPokemons.length>0){
        if(foundPokeApi){
            return res.status(200).json(foundPokeApi)    
        }
        return res.status(404).send('Pokemon not found');    
    } 
       
    //Si no existe la query traigo todos los de la Db y todos los de la API
    
    const pokesDb = await getPokemonsDb();              //Traigo los pokes de la Db
    const pokesApi = await getPokemonsApi();            //Traigo los pokes de la API
    const allPokemons = [...pokesDb, ...pokesApi]       //Los junto en un solo array
    if(allPokemons.length>0){
        return res.status(200).json(allPokemons)    
        }
    return res.status(400).send('No se encontraron Pokemons');
})

    // esta ruta es para buscar por id 

router.get('/:id', async (req, res, next)=>{
    const { id } = req.params;
    try{
        // si el tipo de id es de la DB
        if(id.length > 5){
        const detailPokemon = await getPokemonDbById(id);
           if(detailPokemon){ 
            return res.status(200).json(detailPokemon);
           }
           return res.status(400).send('Pokemon no encontrado');
        } 
        
        // si el tipo de id no es de la DB
        const detailPokemon = await getPokemonApi(id);
        if(detailPokemon){ 
            return res.status(200).json(detailPokemon);
           }
           return res.status(400).send('Pokemon no encontrado');
           
    }catch(err){
        return next(err)
    }
})
    
router.post('/', async (req, res,next) =>{
    console.log(req.body)
    try{ 
///////////////////////////////////// Veo si ese nombre ya existe en la Db o en la API
        const foundPokeDb = await getPokemonDbByName(req.body.name);
        const foundPokeApi = await getPokemonApi(req.body.name);
        if(foundPokeDb || foundPokeApi) return res.status(400).send('Pokemon already exists')
/////////////////////////////////////
        const newPokemon = await createPokemon(req.body)
        res.json(newPokemon);

    }catch(err){
        return next(err)
    }

})


module.exports = router;

