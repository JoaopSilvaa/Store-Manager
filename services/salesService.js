const salesProductsModel = require('../models/salesProductModel');
const salesModel = require('../models/salesModel');
const productsModel = require('../models/productsModel');

const validProduct = async ({ productId }) => {
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
    return true;
};

const valids = async (item) => {
  const validateProduct = await validProduct(item);
  const validateQuantity = await validQuantity(item);
  if (validateProduct !== true) return validateProduct;
  if (validateQuantity !== true) return validateQuantity;
  console.log('alo');
  return salesProductsModel.create(item);
};
const create = async (itemsSold) => {
  const { id } = await salesModel.create();
  const items = itemsSold.map((item) => valids(item));
  console.log(items);
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
