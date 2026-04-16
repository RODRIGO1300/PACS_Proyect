const GetEnviroment = () => {
    let env = {

    }

    switch (process.env.API_ENV) {
        case 'DEV':
            env = require('./env.dev')
            break;
    
        default:
            console.log("No se pudo cargar el archivo de configuracion")
            process.exit(0)
            break;
    }

    return env;
};

module.exports={
    GetEnviroment,
};