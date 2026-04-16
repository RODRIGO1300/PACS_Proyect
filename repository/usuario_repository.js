const {onResultMySQL} = require('../config/connections/mysql')

exports.postUsuario = async(nombre, apellidoP, apellidoM, username, password)=>{
    const result = await onResultMySQL(async (db)=>{
        const [rows]= await db.query(
            "INSERT INTO usuarios (nombre, apellidoP, apellidoM, username, password, activo) VALUES (?, ?, ?, ?, ?, ?)",
            [nombre, apellidoP, apellidoM, username, password, 1]
        )
        return rows
    }, "create")

    return result
}

exports.getAllUsuarios = async(index = 1, limit = 10)=>{
    const offset = (index - 1) * limit

    const result = await onResultMySQL(async(db)=>{
        const [rows] = await db.query(
            "SELECT idUsuario, nombre, apellidoP, apellidoM, username, activo FROM usuarios WHERE activo = 1 LIMIT ? OFFSET ?",
            [limit, offset]
        )
        return rows
    }, "usuarios")

    return result
}

exports.getByIDUsuario = async(id)=>{
    const result = await onResultMySQL(async(db)=>{
        const [rows] = await db.query(
            "SELECT idUsuario, nombre, apellidoP, apellidoM, username, activo FROM usuarios WHERE idUsuario = ? AND activo = 1",
            [id]
        )
        return rows.length > 0 ? rows[0] : null
    }, "usuario")

    return result
}

exports.getUsuarioByUsername = async (username)=>{
    const result =await onResultMySQL(async(db)=>{
        const [rows]=await db.query(
            "select idUsuario, username, password from usuarios where username = ? and activo = 1",
            [username]
        )
        return rows.length > 0 ? rows[0]:null;
    }, "usuario encontrado")
    return result
}

exports.deleteUsuario = async(id)=>{
    return await onResultMySQL(async(db)=>{
        const [result] = await db.query(
            "UPDATE usuarios SET activo = 0 WHERE idUsuario = ?",
            [id]
        )
        return result
    }, "delete")
}

exports.updateUsuario = async(data)=>{
    return await onResultMySQL(async(db)=>{
        let query = "UPDATE usuarios SET nombre = ?, apellidoP = ?, apellidoM = ?, username = ? WHERE idUsuario = ?"
        let params = [data.nombre, data.apellidoP, data.apellidoM, data.username, data.id]

        if(data.password){
            query = "UPDATE usuarios SET nombre = ?, apellidoP = ?, apellidoM = ?, username = ?, password = ? WHERE idUsuario = ?"
            params = [data.nombre, data.apellidoP, data.apellidoM, data.username, data.password, data.id]
        }

        const [result] = await db.query(query, params)
        return result
    }, "update")
}