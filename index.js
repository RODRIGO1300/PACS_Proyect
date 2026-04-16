const express = require('express');
const { connection } = require('./config/connections/data-acces-mysql');
const { GetEnviroment } = require('./config/enviroments/enviroment-mannager');
const routerMannager = require('./routes/router-mannager')
const ENV = GetEnviroment()
const app = express()

//Conversion de datos Json para entenderlos en el codigo del cuerpo
app.use(express.json());
app.use(routerMannager);

app.get('/',(req,res)=>{
    res.status(200).send({
        enviroment: ENV.API.ENVIROMENT,
        app: ENV.API.NAME,
        version: ENV.API.VERSION,
        method: "/",
        msg: "API FUNCIONANDO",
        code: 200,
    });
});

async function startServer() {
    try {
        await connection()

        const server = app.listen(ENV.API.PORT, () =>{
            console.log("------------------------------------")
            console.log(`Servidor ejecutandose en el puerto: ${ENV.API.PORT}`)
            console.log(`AMBIENTE: ${ENV.API.ENVIROMENT}`)
            console.log("------------------------------------")
        })

        server.on('error', () =>{
            console.log(`Ocurrio un error en el servidor: ${error}`)
            console.log("------------------------------------")
            process.exit(1)
        })
    } catch (error) {
        console.log('ERROR AL CONECTAR A MySQL:', error.message)
    }

  
}

startServer()