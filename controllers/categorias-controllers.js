const categoriasRepository = require("../repository/categorias-repository")
const _UtilsResponse = require("../helpers/helper-response")

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

exports.getAllCategorias = async(params)=>{
    const {index=1, limit=10} = params

    const result = await categoriasRepository.getAllCategorias(Number(index), Number(limit))

    return _UtilsResponse.buildResponse(result)
}

exports.addCategoria = async(params)=>{
    const descripcion = resolveField(params, NAME_FIELDS, "descripcion")

    if (!descripcion) {
        return _UtilsResponse.buildErrorResponse("Campo de descripción es requerido")
    }

    const result = await categoriasRepository.addCategoria(descripcion.field, descripcion.value)

    return _UtilsResponse.buildResponse(result)
}

exports.updateCategoria = async(idField, idValue, nameField=null, nameValue=null, estatus=undefined)=>{
    return await categoriasRepository.updateCategoria(idField, idValue, nameField, nameValue, estatus)
}

exports.deleteCategoria = async (id) => {
    return await categoriasRepository.deleteCategoria("idcategorias", id)
}

exports.getCategoriaById = async (paramsOrId) => {
    const id =
        typeof paramsOrId === "object" && paramsOrId !== null
            ? resolveField(paramsOrId, ID_FIELDS)?.value
            : paramsOrId

    const result = await categoriasRepository.getCategoriaById(id)
    return _UtilsResponse.buildResponse(result)
}
