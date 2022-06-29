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

module.exports = {
  getAll,
  getById,
};
