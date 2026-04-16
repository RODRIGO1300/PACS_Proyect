const _UtilResponse = require("../helpers/helper-response")
const categoriasController = require("../controllers/categorias-controllers")

const ID_FIELDS = ["idcategorias", "idCategoria", "id", "id_categoria", "idcategoria"]
const NAME_FIELDS = ["descripcion", "categoria", "nombre"]

const resolveField = (params, fields, columnName)=>{
    for (const field of fields) {
        if (params[field] !== undefined && params[field] !== null && params[field] !== "") {
            return { field: columnName ?? field, value: params[field] }
        }
    }
    return null
}

exports.getAllCategorias = async(req, res)=>{
    await _UtilResponse.execute(req, res, categoriasController.getAllCategorias)
}

exports.addCategoria = async (req, res)=>{
    await _UtilResponse.execute(req, res, categoriasController.addCategoria)
}

exports.deleteCategoria = async (req, res)=>{
    await _UtilResponse.execute(req, res, (params) => {
        const id = resolveField(params, ID_FIELDS, "idcategorias")
        if (!id) {
            return _UtilResponse.buildResponse({
                status: false,
                message: "Id requerido",
                code: 400,
            })
        }
        return categoriasController.deleteCategoria(id.value)
    })
}

exports.updateCategoria = async (req, res)=>{
    await _UtilResponse.execute(
        req,
        res,
        (params) => {
            const id = resolveField(params, ID_FIELDS, "idcategorias")
            const descripcion = resolveField(params, NAME_FIELDS, "descripcion")
            const estatus =
                params.estatus !== undefined && params.estatus !== null && params.estatus !== ""
                    ? Number(params.estatus)
                    : undefined

            if (!id) {
                return _UtilResponse.buildResponse({
                    status: false,
                    message: "Id requerido",
                    code: 400,
                })
            }

            if (!descripcion && typeof estatus === "undefined") {
                return _UtilResponse.buildResponse({
                    status: false,
                    message: "Nada para actualizar",
                    code: 400,
                })
            }

            return categoriasController.updateCategoria(
                id.field,
                id.value,
                descripcion?.field ?? null,
                descripcion?.value ?? null,
                estatus
            )
        }
    )
}

