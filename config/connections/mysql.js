const { getPool } = require("./data-acces-mysql");

const catchEm = (promise) => {
  return promise.then((res) => [null, res]).catch((err) => [err]);
};

const onResultMySQL = async (queryFunction, tag = "none") => {
  let result = {
    status: true,
    message: "",
    data: null,
    tag,
  };

  try {
    const pool = getPool();

    if (!pool) {
      throw new Error("Pool no inicializado");
    }

    const [err, res] = await catchEm(queryFunction(pool));

    if (err) {
      throw err;
    }

    result.data = res;
    if (tag == "delete") {
      result.message = "Registro eliminado exitosamente";
    } else if(tag == "add"){
      result.message = "Registro agregado exitosamente";
    }else if(tag == "update"){
      result.message = "Registro actualizado exitosamente";
    }else{
      result.message = "Consulta ejecutada exitosamente";
    }

  } catch (error) {
    result.status = false;
    result.message = error.message;
  }

  return result;
};

module.exports = {
  onResultMySQL,
};
