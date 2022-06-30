const connection = require('./connection');

const create = async () => {
  const [result] = await connection.execute('INSERT INTO StoreManager.sales VALUES();');
  return { id: result.insertId };
};

module.exports = {
  create,
};
