const jwt = require('jsonwebtoken');

const {getEnviroment} = require("../config/enviroments/enviroment-mannager");

const usuarioRepository = require("../repository/usuario_repository")

const ENV = getEnviroment();

const secret = ENV.TOKEN.secret

exports.usuarioToken = async (req, res, next) => {
    const authHeader = req.headers?.authorization

    if(!authHeader||authHeader.startsWith('Bearer ')){
        return res.status(401).json({
            status: false,
            message: "No autorizado 1"
        })
    }

    const token = authHeader.split(' ')[1]

    if(!tocken){
        return res.status(401).json({
            status: false,
            message: "No autorizado 2"
        })
    }

    try {
        let {id, type} = jwt.verify(token, secret)

        if(type !== "usuario"){
            return res.status(401).json({
                status: false,
                message: "No autorizado 3"
            })       
        }

        let rUsuario = await usuarioRepository.getByIDUsuario(id);

        if(!rUsuarioRepository.status||!rUsuario.data||rUsuario.data.estatus===0){
            return res.status(401).json({
                status: false,
                message: "No autorizado 4"
            }) 
        }

        req.usuario = rUsuario.data;

        return next();

    } catch (error) {
        return res.status(401).json({
            status: false,
            message: "No autorizado 5"
        })       
    }
}