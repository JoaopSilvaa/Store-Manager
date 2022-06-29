const productsModel = require('../models/productsModel');

const getAll = async () => {
  const products = await productsModel.getAll();

  return products;
};

const getById = async (id) => {
  if (!id) return false;

  const product = await productsModel.getById(id);

  if (!product) return null;
  
  return product;
};

const create = async ({ name }) => {
  if (!name) return { errorCod: 400, message: '"name" is required' };
  if (name.length < 5) {
    return { errorCod: 422, message: '"name" length must be at least 5 characters long' };
  }

  const product = await productsModel.create({ name });

  return product;
};

module.exports = {
  getAll,
  getById,
  create,
};
