const connection = require('./connection');

const create = async (saleId, itemSold) => {
  const { productId, quantity } = itemSold;
  await connection.execute(
    'INSERT INTO StoreManager.sales_products (sale_id, product_id, quantity) values (?, ?, ?);',
    [saleId, productId, quantity],
  );
};

const serialize = (data) => ({
  saleId: data.sale_id,
  date: data.date,
  productId: data.product_id,
  quantity: data.quantity,
});

const serializeWithoutId = (data) => ({
  date: data.date,
  productId: data.product_id,
  quantity: data.quantity,
});

const getAll = async () => {
  const [result] = await connection.execute(
    `SELECT sp.*, s.date
      FROM StoreManager.sales_products sp
      INNER JOIN StoreManager.sales s
      ON s.id = sp.sale_id
      ORDER BY sp.sale_id, sp.product_id;`,
  );

  if (!result) return null;

  return result.map(serialize);
};

const getById = async (id) => {
  const [result] = await connection.execute(
    `SELECT sp.*, s.date
      FROM StoreManager.sales_products sp
      INNER JOIN StoreManager.sales s
      ON s.id = sp.sale_id
      WHERE sp.sale_id=?
      ORDER BY sp.sale_id, sp.product_id;`,
      [id],
  );

  if (result.length === 0) return null;

  return result.map(serializeWithoutId);
};

const update = async (itemSold) => {
  const { productId, quantity } = itemSold;
  await connection.execute(
    'UPDATE StoreManager.sales_products SET quantity=? WHERE product_id=?;',
    [quantity, productId],
  );
};

module.exports = {
  create,
  getAll,
  getById,
  update,
};
