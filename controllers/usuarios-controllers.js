const usuariosRepository = require('../repository/usuario_repository')
const _UtilResponse = require('../helpers/helper-response')
const bcrypt = require('bcryptjs')

exports.getAllUsuarios = async (params) => {
    const { index = 1, limit = 10 } = params
    const result = await usuariosRepository.getAllUsuarios(Number(index), Number(limit))
    return _UtilResponse.buildResponse(result)
}

exports.getByIDUsuario = async (params) => {
    const { id } = params
    const result = await usuariosRepository.getByIDUsuario(Number(id))
    return _UtilResponse.buildResponse(result)
}

exports.postUsuario = async (params) => {
    const { nombre, apellidoP, apellidoM, username, password } = params

    const usuarioExistente = await usuariosRepository.getUsuarioByUsername(username)
    if (usuarioExistente.data) {
        return _UtilResponse.buildResponse({
            status: false,
            message: "el username ya existe",
            code: 400
        })
    }

    const hashedPassword = await bcrypt.hash(password, 10)

    const result = await usuariosRepository.postUsuario(
        nombre,
        apellidoP,
        apellidoM,
        username,
        hashedPassword
    )

    return _UtilResponse.buildResponse(result)
}

exports.deleteUsuario = async (id) => {
    const usuario = await usuariosRepository.getByIDUsuario(Number(id))
    if (!usuario.data) {
        return _UtilResponse.buildResponse({
            status: false,
            message: "el usuario que quieres eliminar no existe",
            code: 400
        })
    }

    const result = await usuariosRepository.deleteUsuario(Number(id))
    return _UtilResponse.buildResponse(result)
}

exports.updateUsuario = async (data) => {
    const usuario = await usuariosRepository.getByIDUsuario(Number(data.id))
    if (!usuario.data) {
        return _UtilResponse.buildResponse({
            status: false,
            message: "el usuario que quieres modificar no existe",
            code: 400
        })
    }

    const usuarioMismoUsername = await usuariosRepository.getUsuarioByUsername(data.username)
    if (usuarioMismoUsername.data && Number(usuarioMismoUsername.data.idUsuario) !== Number(data.id)) {
        return _UtilResponse.buildResponse({
            status: false,
            message: "el username ya esta en uso",
            code: 400
        })
    }

    const passwordHash = data.password ? await bcrypt.hash(data.password, 10) : null

    const result = await usuariosRepository.updateUsuario({
        id: Number(data.id),
        nombre: data.nombre,
        apellidoP: data.apellidoP,
        apellidoM: data.apellidoM,
        username: data.username,
        password: passwordHash
    })

    return _UtilResponse.buildResponse(result)
}
