const _UtilResponse = require("../helpers/helper-response")
const marcasController = require("../controllers/marcas-controllers")

exports.getAllMarcas = async(req, res)=>{
    await _UtilResponse.execute(req, res, marcasController.getAllMarcas)
}

exports.addMarca = async (req, res)=>{
    await _UtilResponse.execute(req, res, marcasController.addMarca)
}

exports.deleteMarca = async (req, res)=>{
    await _UtilResponse.execute(req, res, (params) => {
        const id = params.id || params.idMarca || params.idmarca || params.id_marca
        if (!id) {
            return _UtilResponse.buildResponse({
                status: false,
                message: "Id requerido",
                code: 400,
            })
        }
        return marcasController.deleteMarca(id)
    })
}

exports.updateMarca = async (req, res)=>{
    await _UtilResponse.execute(
        req,
        res,
        (params) => {
            const id = params.id || params.idMarca || params.idmarca || params.id_marca
            const descripcion = params.descripcion || params.marca || params.nombre

            if (!id) {
                return _UtilResponse.buildResponse({
                    status: false,
                    message: "Id requerido",
                    code: 400,
                })
            }

            if (!descripcion) {
                return _UtilResponse.buildResponse({
                    status: false,
                    message: "Descripcion requerida",
                    code: 400,
                })
            }

            return marcasController.updateMarca(id, descripcion)
        }
    )
}
