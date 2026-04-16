const mysql = require('mysql2/promise');
const {MYSQL_CONNECTION_CAFETEC} = require('./connections');

const config = MYSQL_CONNECTION_CAFETEC();

let pool;

async function connection() {
    try {
        pool = mysql.createPool({
           host: config.host,
           port: config.port,
           user: config.user,
           password: config.password,
           database: config.database,
           waitForConnections: true,
           connectionLimit: 10 
        });

        //Probar conexion activa
        await pool.query("SELECT 1");
        console.log("MySQL conectado");
    } catch (error) {
        console.log("Error en la conexion ", error.message)
        setTimeout(connection, 10000)
    }   
}

function getPool(){
    return pool
}

module.exports = {
    connection,
    getPool
}