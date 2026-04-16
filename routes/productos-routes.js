const productosInterfaces = require("../interfaces/productos-interfaces");
const express = require("express");

const router = express.Router();

router.get("/getall", productosInterfaces.getAllProductos);
router.post("/add", productosInterfaces.addProducto);
router.put("/update", productosInterfaces.updateProducto);
router.delete("/delete", productosInterfaces.deleteProducto);

module.exports = router;
