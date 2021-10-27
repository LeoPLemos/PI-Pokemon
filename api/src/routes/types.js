const { Router } = require('express');

const router = Router();

router.get('/', (req, res)=>{
    res.send('La ruta types esta OK')

})


module.exports = router;