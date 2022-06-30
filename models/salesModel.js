const connection = require('./connection');

const create = async () => {
  const [result] = await connection.execute('INSERT INTO StoreManager.sales VALUES();');
  return { id: result.insertId };
};

const exclude = async (id) => {
  await connection.execute('DELETE FROM StoreManager.sales WHERE id=?', [id]);
};

module.exports = {
  create,
  exclude,
};
