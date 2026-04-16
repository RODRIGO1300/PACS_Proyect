const marcasRepository = require("../repository/marcas-repository")
const _UtilsResponse = require("../helpers/helper-response")

const ID_FIELDS = ["idMarca", "id", "id_marca", "idmarca"]
const NAME_FIELDS = ["descripcion", "marca", "nombre"]

const resolveField = (params, fields, columnName)=>{
    for (const field of fields) {
        if (params[field] !== undefined && params[field] !== null && params[field] !== "") {
            return { field: columnName ?? field, value: params[field] }
        }
    }
    return null
}

exports.getAllMarcas = async(params)=>{
    const {index=1, limit=10} = params

    const result = await marcasRepository.getAllMarcas(Number(index), Number(limit))

    return _UtilsResponse.buildResponse(result)
}

exports.addMarca = async (data) => {
    const descripcion = resolveField(data, NAME_FIELDS, "descripcion")

    if (!descripcion) {
        return _UtilsResponse.buildErrorResponse("Campo de descripción es requerido")
    }
    
    const result = await marcasRepository.addMarca(descripcion.field, descripcion.value)

    return _UtilsResponse.buildResponse(result)
}

exports.deleteMarca = async (id) => {
    return await onResultMySQL(async (db) => {
        const [result] = await db.query(
            "UPDATE marcas SET activo = 0 WHERE idMarca = ?",
            [id]
        )
        return result
    }, "delete")
}

exports.updateMarca = async (id, descripcion) => {
    return await onResultMySQL(async (db) => {
        const [result] = await db.query(
            "UPDATE marcas SET descripcion = ? WHERE idMarca = ?",
            [descripcion, id]
        )
        return result
    }, "update")
}