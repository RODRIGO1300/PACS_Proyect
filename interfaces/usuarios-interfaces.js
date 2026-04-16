const _UtilResponse = require('../helpers/helper-response')
const usuarioController = require('../controllers/usuarios-controllers')

exports.getAllUsuarios = async (req, res) => {
    await _UtilResponse.execute(
        req,
        res,
        usuarioController.getAllUsuarios,
        (p) => !p.index || !p.limit
    )
}

exports.getByIDUsuario = async (req, res) => {
    await _UtilResponse.execute(
        req,
        res,
        usuarioController.getByIDUsuario,
        (p) => !p.id
    )
}

exports.addUsuario = async (req, res) => {
    await _UtilResponse.execute(
        req,
        res,
        usuarioController.postUsuario,
        (p) =>
            !p.nombre ||
            !p.apellidoP ||
            !p.apellidoM ||
            !p.username ||
            !p.password
    )
}

exports.deleteUsuario = async (req, res) => {
    await _UtilResponse.execute(
        req,
        res,
        () => usuarioController.deleteUsuario(req.params.id),
        () => !req.params.id
    )
}

exports.updateUsuario = async (req, res) => {
    await _UtilResponse.execute(
        req,
        res,
        () => usuarioController.updateUsuario({
            id: req.params.id,
            nombre: req.body.nombre,
            apellidoP: req.body.apellidoP,
            apellidoM: req.body.apellidoM,
            username: req.body.username,
            password: req.body.password
        }),
        () =>
            !req.params.id ||
            !req.body.nombre ||
            !req.body.apellidoP ||
            !req.body.apellidoM ||
            !req.body.username
    )
}

exports.postUsuario = exports.addUsuario
