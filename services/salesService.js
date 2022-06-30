const salesProductsModel = require('../models/salesProductModel');
const salesModel = require('../models/salesModel');
const productsModel = require('../models/productsModel');

const validProduct = async ({ productId }) => {
  if (!productId) {
    return {
      error: {
        code: 'badRequest',
        message: '"productId" is required',
      },
    };
  }

  const product = await productsModel.getById(productId);
  if (!product) {
    return {
      error: {
        code: 'notFound',
        message: 'Product not found',
      },
    };
  }
  return true;
};

const validQuantity = ({ quantity }) => {
    if (quantity <= 0) {
      return {
        error: {
          code: 'unprocessable',
          message: '"quantity" must be greater than or equal to 1',
        },
      };
    }
  
  if (!quantity) {
    return {
      error: {
        code: 'badRequest',
        message: '"quantity" is required',
      },
    };
  }
  
    return true;
};

const valids = async (item) => {
  const validateProduct = await validProduct(item);
  const validateQuantity = await validQuantity(item);
  if (validateProduct !== true) return validateProduct;
  if (validateQuantity !== true) return validateQuantity;
};

const create = async (itemsSold) => {
  const items = await Promise.all(itemsSold.map((item) => valids(item)));
  const error = items.find((item) => item !== undefined);
  if (error) return error;
  const { id } = await salesModel.create();
  await Promise.all(itemsSold.map((item) => salesProductsModel.create(id, item)));
  return ({ id, itemsSold });
};

const getAll = async () => {
  const sales = salesProductsModel.getAll();

  return sales;
};

const getById = async (id) => {
  if (!id) return false;

  const sales = await salesProductsModel.getById(id);

  if (!sales) {
    return {
      error: {
        code: 'notFound',
        message: 'Sale not found',
      },
    };
  }

  return sales;
};

module.exports = {
  create,
  getAll,
  getById,
};
