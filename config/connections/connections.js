const {GetEnviroment} = require('../enviroments/enviroment-mannager');

const ENV = GetEnviroment();

function MYSQL_CONNECTION_CAFETEC(){
    return {
        host: ENV.MYSQL.HOST,
        port: ENV.MYSQL.PORT,
        user: ENV.MYSQL.USER_NAME,
        password: ENV.MYSQL.USER_PASSWORD,
        database: ENV.MYSQL.DATABASE,
        name: "cafetec"
    }
}

module.exports = {
    MYSQL_CONNECTION_CAFETEC
}
