const connection = require('./connection');

const create = async () => {
  const [result] = await connection.execute('INSERT INTO StoreManager.sales VALUES();');
  return { id: result.insertId };
};

const exclude = async (id) => {
  await connection.execute('DELETE FROM StoreManager.sales WHERE id=?', [id]);
};

const update = async (id) => {
  await connection.execute(
    'UPDATE StoreManager.sales SET date = (CURRENT_TIMESTAMP) WHERE id=?;',
    [id],
  );
};

module.exports = {
  create,
  exclude,
  update,
};
