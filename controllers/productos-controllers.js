const productosRepository = require("../repository/productos-repository");
const _UtilsResponse = require("../helpers/helper-response");

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

exports.getAllProductos = async (params) => {
  const { index = 1, limit = 10 } = params;

  const result = await productosRepository.getAllProductos(
    Number(index),
    Number(limit),
  );

  return _UtilsResponse.buildResponse(result);
};

exports.addProducto = async (params) => {
  const [descripcion, idCategoria, precioUnitario, stock, codigo, estatus] = params;
  const categoria = await productosRepository.getCategoriaById("idCategoria", params.idCategoria);
  
  if(!categoria){
    return _UtilsResponse.buildResponse({
      status: false,
      message: "Categoria no encontrada",
      code: 404,
    });
  }  

  const marca = await productosRepository.getMarcaById("idMarca", params.idMarca);
  
  if(!marca){
    return _UtilsResponse.buildResponse({
      status: false,
      message: "Marca no encontrada",
      code: 404,
    });
  }

  const result = await productosRepository.addProducto(
    descripcion,
    idCategoria,
    precioUnitario,
    stock,
    codigo,
    estatus
  );
  return _UtilsResponse.buildResponse(result);
};

exports.updateProducto = async (idField, idValue, updateData) => {
  return await productosRepository.updateProducto(idField, idValue, updateData);
};

exports.deleteProducto = async (id) => {
  return await productosRepository.deleteProducto("idProducto", id);
};

exports.getProductoById = async (paramsOrId) => {
  const id =
    typeof paramsOrId === "object" && paramsOrId !== null
      ? resolveField(paramsOrId, ID_FIELDS)?.value
      : paramsOrId;

  const result = await productosRepository.getProductoById(id);
  return _UtilsResponse.buildResponse(result);
};
