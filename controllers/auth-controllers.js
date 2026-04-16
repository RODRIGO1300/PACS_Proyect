const usuarioRepository = require("../repository/usuario_repository");
const authRepository = require("../repository/auth-repository");
const _UtilsResponse = require("../helpers/helper-response");

const bycrypt = require("bcryptjs");

exports.login = async (params) => {
    const { username, password } = params;

    const user = await usuarioRepository.getUsuarioByUsername(username);

    if (!user.data) {
        return _UtilsResponse.buildResponse({
            status: false,
            message: "Usuario no encontrado",
            code: 404,
        });
    }

    const passCheck = await bycrypt.compare(password, user.data.password);

    if (!passCheck) {
        return _UtilsResponse.buildResponse({
            status: false,
            message: "Contrasena incorrecta",
            code: 401,
        });
    }

    const token = await authRepository.GenerateToken(user.data.username);

    return _UtilsResponse.buildResponse({
        status: true,
        message: "Login exitoso",
        code: 200,
        data: { token },
    });
};
