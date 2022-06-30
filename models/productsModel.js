const connection = require('./connection');

const getAll = async () => {
  const [result] = await connection.execute('SELECT * FROM StoreManager.products;');

  if (!result) return null;

  return result;
};

const getById = async (id) => {
  const [result] = await connection.execute(
    'SELECT * FROM StoreManager.products WHERE id=?;',
    [id],
  );

  if (result.length === 0) return null;

  return result[0];
};

const create = async ({ name }) => {
  const [result] = await connection.execute(
    'INSERT INTO StoreManager.products (name) VALUES (?);',
    [name],
  );

  return { id: result.insertId, name };
};

const update = async (id, name) => {
  await connection.execute(
    'UPDATE StoreManager.products SET name=? WHERE id=?',
    [name, id],
  );

  return { id, name };
};

const exclude = async (id) => {
  await connection.execute(
    'DELETE FROM StoreManager.products WHERE id=?',
    [id],
  );
};

module.exports = {
  getAll,
  getById,
  create,
  update,
  exclude,
};
