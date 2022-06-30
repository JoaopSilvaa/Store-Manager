const productsModel = require('../models/productsModel');

const getAll = async () => {
  const products = await productsModel.getAll();

  return products;
};

const getById = async (id) => {
  if (!id) return false;

  const product = await productsModel.getById(id);

  if (!product) {
    return {
      error: {
        code: 'notFound',
        message: 'Product not found',
      },
    };
  }
  
  return product;
};

const create = async ({ name }) => {
  if (name.length < 5) {
    return {
      error: {
        code: 'unprocessable',
        message: '"name" length must be at least 5 characters long',
      },
    };
  }
  const product = await productsModel.create({ name });

  return product;
};

const update = async (id, name) => {
  const product = getById(id);
  
  if (product.error) {
    return product;
  }

  if (name.length < 5) {
    return {
      error: {
        code: 'unprocessable',
        message: '"name" length must be at least 5 characters long',
      },
    };
  }

  const newProduct = await productsModel.update(id, name);
  return newProduct;
};

const exclude = async (id) => {
  const product = await getById(id);

  if (product.error) {
    return product;
  }
  await productsModel.exclude(id);
  return true;
};

const searchForName = async (q) => {
  const result = await productsModel.searchForName();
  
  const filteredName = result.filter((product) => product.name.includes(q));

  return filteredName;
};

module.exports = {
  getAll,
  getById,
  create,
  update,
  exclude,
  searchForName,
};
