const axios = require('axios');
const { Router } = require('express');
const { Pokemon, Type } = require('../db');
const { getPokemonsApi, getPokemonsDb, createPokemon, getPokemonApi, getPokemonDbById, getPokemonDbByName } = require('./funciones');
const router = Router();

// esta ruta es para traer todos o uno por nombre

router.get('/', async (req, res, next)=>{
    const { name } = req.query
    // Si existe una query traigo solo el que me pide (puede haber uno en la Db y uno en la API)
    if(name){
        const foundpokesDb = await getPokemonDbByName(name);
        const allFoundsPokemons = [...foundpokesDb];
        const foundpokesApi = await getPokemonApi(name);
        if(foundpokesApi){
            allFoundsPokemons.push(foundpokesApi);
        }
        if(allFoundsPokemons.length>0){
            return res.status(200).json(allFoundsPokemons)    
        }
        return res.status(400).send('Pokemon no encontrado');    
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
    const pokemon = req.body;
    try{
        const newPokemon = await createPokemon(pokemon)
        res.status(201).json(newPokemon);
    } catch(error){
        next(error)
    }
})


module.exports = router;