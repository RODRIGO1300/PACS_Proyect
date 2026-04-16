const categoriasInterfaces = require('../interfaces/categoria-interfaces');
const express = require("express")
const {usuarioToken} = require("../middlewares/usuarios-middlewares")

const router = express.Router()

router.use(usuarioToken)

router.get("/getall", categoriasInterfaces.getAllCategorias)
router.post("/add", categoriasInterfaces.addCategoria)
router.put("/update", categoriasInterfaces.updateCategoria)
router.delete("/delete", categoriasInterfaces.deleteCategoria)

module.exports = router
