const express = require("express")
const router = express.Router()

const marcasRoute = require("./marcas-route")
const categoriasRoute = require("./categorias-routes")
const productosRoute = require("./productos-routes")
const authRoute = require("./auth-routes")

module.exports = [
    router.use("/marcas", marcasRoute), 
    router.use("/categorias", categoriasRoute),
    router.use("/productos", productosRoute),
    router.use("/auth", authRoute)
]
