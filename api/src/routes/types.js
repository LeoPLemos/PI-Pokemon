const { Router } = require('express');
const { Pokemon, Type } = require('../db');
const { Op } = require("sequelize");
const { getTypesApi, getTypesDb, createType, fillTypesDb, assignType } = require('../functions/functions');

const router = Router();

router.get('/', async (req, res)=>{
    const type = req.body.name;
    const types = await getTypesDb(type)
    return res.json(types)
})

router.post('/', async(req, res)=>{
    const newTypes = await fillTypesDb();
    return res.send('Base de Datos llenada con éxito')
    

    // Esta es la función para crear types desde POstMan
    // const { name } = req.body;
    // const newType = await createType(name)
    // return res.json(newType);
    
})

//Esta ruta es sólo para probar la asignación de tipos
router.put('/', (req, res)=>{
    const { pokemon } = req.body;
    const { types } = req.body;
    assignType(pokemon, types);
    res.send('Asignación realizada con éxito');
})


module.exports = router;