const authControllers = require('../controllers/auth-controllers');
const _UtilsResponse = require("../helpers/helper-response");

exports.login = async (req, res) => {
    await _UtilsResponse.execute(req, res, authControllers.login,
        (p) => 
            !p.username || 
            !p.password
    )
}
