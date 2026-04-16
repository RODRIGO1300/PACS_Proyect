const marcasInterfaces = require("../interfaces/marcas-interfaces")
const express = require("express")

const router = express.Router()

router.get("/getall", marcasInterfaces.getAllMarcas)
router.post("/add", marcasInterfaces.addMarca)
router.put("/update", marcasInterfaces.updateMarca)
router.delete("/delete", marcasInterfaces.deleteMarca)

module.exports = router
