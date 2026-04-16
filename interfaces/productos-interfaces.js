const _UtilResponse = require("../helpers/helper-response");
const productosController = require("../controllers/productos-controllers");

const ID_FIELDS = ["idProducto", "idproducto", "id", "id_producto"];
const NAME_FIELDS = ["descripcion", "producto", "nombre"];
const CATEGORIA_FIELDS = ["idCategoria", "idcategoria", "id_categoria", "categoria"];
const PRECIO_FIELDS = ["precioUnitario", "precio_unitario", "precio"];
const STOCK_FIELDS = ["stock", "existencia"];
const CODIGO_FIELDS = ["codigo", "code"];

const resolveField = (params, fields, columnName) => {
  for (const field of fields) {
    if (params[field] !== undefined && params[field] !== null && params[field] !== "") {
      return { field: columnName ?? field, value: params[field] };
    }
  }
  return null;
};

const parseNumber = (value) => {
  const num = Number(value);
  return Number.isFinite(num) ? num : null;
};

exports.getAllProductos = async (req, res) => {
  await _UtilResponse.execute(req, res, productosController.getAllProductos);
};

exports.addProducto = async (req, res) => {
  await _UtilResponse.execute(req, res, productosController.addProducto);
};

exports.deleteProducto = async (req, res) => {
  await _UtilResponse.execute(req, res, (params) => {
    const id = resolveField(params, ID_FIELDS, "idProducto");
    if (!id) {
      return _UtilResponse.buildResponse({
        status: false,
        message: "Id requerido",
        code: 400,
      });
    }
    return productosController.deleteProducto(id.value);
  });
};

exports.updateProducto = async (req, res) => {
  await _UtilResponse.execute(req, res, (params) => {
    const id = resolveField(params, ID_FIELDS, "idProducto");
    const descripcion = resolveField(params, NAME_FIELDS, "descripcion");
    const idCategoria = resolveField(params, CATEGORIA_FIELDS, "idCategoria");
    const precioUnitario = resolveField(params, PRECIO_FIELDS, "precioUnitario");
    const stock = resolveField(params, STOCK_FIELDS, "stock");
    const codigo = resolveField(params, CODIGO_FIELDS, "codigo");
    const estatus =
      params.estatus !== undefined && params.estatus !== null && params.estatus !== ""
        ? parseNumber(params.estatus)
        : undefined;

    if (!id) {
      return _UtilResponse.buildResponse({
        status: false,
        message: "Id requerido",
        code: 400,
      });
    }

    if (
      !descripcion &&
      !idCategoria &&
      !precioUnitario &&
      !stock &&
      !codigo &&
      typeof estatus === "undefined"
    ) {
      return _UtilResponse.buildResponse({
        status: false,
        message: "Nada para actualizar",
        code: 400,
      });
    }

    const updateData = {};

    if (descripcion) {
      updateData[descripcion.field] = descripcion.value;
    }

    if (idCategoria) {
      const idCategoriaNum = parseNumber(idCategoria.value);
      if (idCategoriaNum === null) {
        return _UtilResponse.buildResponse({
          status: false,
          message: "Campo idCategoria invalido",
          code: 400,
        });
      }
      updateData[idCategoria.field] = idCategoriaNum;
    }

    if (precioUnitario) {
      const precioNum = parseNumber(precioUnitario.value);
      if (precioNum === null) {
        return _UtilResponse.buildResponse({
          status: false,
          message: "Campo precioUnitario invalido",
          code: 400,
        });
      }
      updateData[precioUnitario.field] = precioNum;
    }

    if (stock) {
      const stockNum = parseNumber(stock.value);
      if (stockNum === null) {
        return _UtilResponse.buildResponse({
          status: false,
          message: "Campo stock invalido",
          code: 400,
        });
      }
      updateData[stock.field] = stockNum;
    }

    if (codigo) {
      updateData[codigo.field] = codigo.value;
    }

    if (typeof estatus !== "undefined") {
      if (estatus === null) {
        return _UtilResponse.buildResponse({
          status: false,
          message: "Campo estatus invalido",
          code: 400,
        });
      }
      updateData.estatus = estatus;
    }

    return productosController.updateProducto(id.field, id.value, updateData);
  });
};
