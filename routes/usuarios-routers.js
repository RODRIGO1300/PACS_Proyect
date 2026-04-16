const usuarioInterface = require('../interfaces/usuario-interface')
const express = require('express')
const router = express.Router()

router.get('/getall', usuarioInterface.getAllUsuarios)
router.get('/getbyid', usuarioInterface.getByIDUsuario)
router.post('/addUsuario', usuarioInterface.addUsuario)
router.post('/create', usuarioInterface.addUsuario)
router.delete('/delete/:id', usuarioInterface.deleteUsuario)
router.put('/update/:id', usuarioInterface.updateUsuario)

module.exports = router