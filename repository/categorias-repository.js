const {onResultMySQL} = require('../config/connections/mysql')

exports.getAllCategorias = async (index=1, limit=10) => {
    const offset = (index - 1) * limit
    const result = await onResultMySQL(async (db) => {
        const [rows] = await db.query(
            "SELECT * FROM categorias WHERE estatus = 1 LIMIT ? OFFSET ?",
            [limit, offset]
        )
        return rows
    }, "categorias")

    return result
}

exports.addCategoria = async (nameField, nameValue, estatus=1) => {
    const result = await onResultMySQL(async (db) => {
        const [rows] = await db.query(
            `INSERT INTO categorias (${nameField}, estatus) VALUES (?, ?)`,
            [nameValue, estatus]
        )
        return rows
    }, "categorias")

    return result
}

exports.updateCategoria = async(idField, idValue, nameField=null, nameValue=null, estatus=undefined)=>{
    const sets = []
    const values = []

    if(nameField){
        sets.push(`${nameField} = ?`)
        values.push(nameValue)
    }

    if(typeof estatus !== "undefined"){
        sets.push("estatus = ?")
        values.push(estatus)
    }

    const sql = `UPDATE categorias SET ${sets.join(", ")} WHERE ${idField} = ?`
    values.push(idValue)

    const result = await onResultMySQL( async (db) =>{
        const [rows] = await db.query(sql, values)
        return rows
    },"categorias")

    return result
}

exports.deleteCategoria = async(idField, idValue)=>{
    const result = await onResultMySQL( async (db) =>{
        const [rows] = await db.query(
            `UPDATE categorias SET estatus = 0 WHERE ${idField} = ?`,
            [idValue]
        )
        return rows
    },"categorias")

    return result
}

exports.getCategoriaById = async(id)=>{
    const result = await onResultMySQL( async (db) =>{
        const [rows] = await db.query(
            `SELECT * FROM categorias WHERE idcategorias = ? AND estatus = 1`,
            [id]
        )
        return rows.length > 0 ? rows[0] : null
    },"categorias")

    return result;
}
