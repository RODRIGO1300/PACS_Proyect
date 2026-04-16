const jwt = require('jsonwebtoken');

const {GetEviroment} = require("../config/enviroments/enviroment-mannager");
const env = GetEviroment();
const secret = env.TOKEN.secret

exports.GenerateToken = async (id) => {
    return new Promise((resolve, reject) => {
        try {
            if(!id){
                return reject(("No hay id para injectar con en el token"));
            }    
            
            jws.sing(
                { id, type: 'usuario' },
                secret,
                { expiresIn: '1d' }, 
                (err, token) => {
                    if (err) {
                        console.error(err);
                        return reject(`no se pudo generar el token: ${err.message}`);
                    }

                    resolve(token);
                }
            )
        } catch (error) {
            reject('no se pudo generar el token: ');
        }
    });
};  