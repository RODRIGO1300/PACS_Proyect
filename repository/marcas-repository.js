const {onResultMySQL} = require('../config/connections/mysql')

exports.getAllMarcas = async(index=1, limit=10)=>{
    const offSet = (index - 1) * limit

    const result = await onResultMySQL( async (db) =>{
        const [rows] = await db.query("SELECT * FROM marcas WHERE activo = 1 LIMIT ? OFFSET ?", 
        [limit, offSet]
        )
        return rows
    },"marcas") 

    return result
}

exports.addMarca = async(nameField, nameValue, estatus=1)=>{
    const result = await onResultMySQL( async (db) =>{
        const [rows] = await db.query(
            `INSERT INTO marcas (${nameField}, activo) VALUES (?, ?)`,
            [nameValue, estatus]
        )
        return rows
    },"marcas")

    return result
}

exports.updateMarca = async(idField, idValue, nameField=null, nameValue=null, estatus=undefined)=>{
    const sets = []
    const values = []

    if(nameField){
        sets.push(`${nameField} = ?`)
        values.push(nameValue)
    }

    if(typeof estatus !== "undefined"){
        sets.push("activo = ?")
        values.push(estatus)
    }

    const sql = `UPDATE marcas SET ${sets.join(", ")} WHERE ${idField} = ?`
    values.push(idValue)

    const result = await onResultMySQL( async (db) =>{
        const [rows] = await db.query(sql, values)
        return rows
    },"marcas")

    return result
}

exports.deleteMarca = async(idField, idValue)=>{
    const result = await onResultMySQL( async (db) =>{
        const [rows] = await db.query(
            `UPDATE marcas SET activo = 0 WHERE ${idField} = ?`,
            [idValue]
        )
        return rows
    },"marcas")

    return result
}

