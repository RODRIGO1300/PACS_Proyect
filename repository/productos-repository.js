const { onResultMySQL } = require("../config/connections/mysql");

exports.getAllProductos = async (index = 1, limit = 10) => {
  const offset = (index - 1) * limit;
  const result = await onResultMySQL(
    async (db) => {
      const [rows] = await db.query(
        "SELECT * FROM productos WHERE estatus = 1 LIMIT ? OFFSET ?",
        [limit, offset],
      );
      return rows;
    },
    "productos",
  );

  return result;
};

exports.addProducto = async (
  descripcion,
  idCategoria,
  precioUnitario,
  stock,
  codigo = null,
  estatus = 1,
) => {
  const result = await onResultMySQL(
    async (db) => {
      const [rows] = await db.query(
        "INSERT INTO productos (descripcion, idCategoria, precioUnitario, stock, codigo, estatus) VALUES (?, ?, ?, ?, ?, ?)",
        [descripcion, idCategoria, precioUnitario, stock, codigo, estatus],
      );
      return rows;
    },
    "add",
  );

  return result;
};

exports.updateProducto = async (idField, idValue, updateData = {}) => {
  const sets = [];
  const values = [];

  for (const [field, value] of Object.entries(updateData)) {
    if (typeof value !== "undefined") {
      sets.push(`${field} = ?`);
      values.push(value);
    }
  }

  const sql = `UPDATE productos SET ${sets.join(", ")} WHERE ${idField} = ?`;
  values.push(idValue);

  const result = await onResultMySQL(
    async (db) => {
      const [rows] = await db.query(sql, values);
      return rows;
    },
    "update",
  );

  return result;
};

exports.deleteProducto = async (idField, idValue) => {
  const result = await onResultMySQL(
    async (db) => {
      const [rows] = await db.query(
        `UPDATE productos SET estatus = 0 WHERE ${idField} = ?`,
        [idValue],
      );
      return rows;
    },
    "delete",
  );

  return result;
};
