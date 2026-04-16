const { getParams } = require("../helpers/helper-request");
 
exports.buildResponse = (options = {}) => {
  const {
    status = true,
    message = "",
    data = null,
    code = 200,
    tag = null,
  } = options;
 
  return {
    status,
    message,
    data: tag ? { [tag]: data } : data,
    code,
  };
};
 
exports.send = (res, response) => {
  if (!response) {
    return res.status(500).json({
      status: false,
      message: "Respuesta invalida",
      code: 500,
    });
  }
 
  return res.status(response.code ?? 200).json(response);
};
 
exports.sendError = (res, error = "Error interno") => {
  console.log(error);
 
  return res.status(500).json({
    status: false,
    message: error.message ?? error,
    code: 500,
  });
};
 
exports.execute = async (req, res, mController, validCampos) => {
  try {
    const params = getParams(req);
 
    const notValid = validCampos?.(params);
 
    if (notValid === true) {
      return this.send(
        res,
        this.buildResponse({
          status: false,
          message: "Parametros incorrectos",
          code: 400,
        }),
      );
    }
 
    // Ejecutar controlador
    const result = await mController?.(params);
 
    if (!mController) {
      return this.sendError(res, "Controller no definido");
    }
 
    return this.send(res, result);
  } catch (error) {
    return this.sendError(res, error);
  }
};