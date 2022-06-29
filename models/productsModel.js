const connection = require('./connection');

const getAll = async () => {
  const [result] = await connection.execute('SELECT * FROM products');

  if (!result) return null;

  return result;
};

const getById = async (id) => {
  const [result] = await connection.execute(
    'SELECT * FROM products WHERE id=?',
    [id],
  );

  if (result.lenght === 0) return null;

  return result[0];
};

module.exports = {
  getAll,
  getById,
};
