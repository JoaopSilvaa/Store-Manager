const Joi = require('joi');
const productsService = require('../services/productsService');

const getAll = async (_req, res) => {
  try {
    const products = await productsService.getAll();
    if (!products) return res.status(404).json({ message: 'Not Found' });
    return res.status(200).json(products);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const getById = async (req, res, next) => {
  const { id } = req.params;

  const product = await productsService.getById(id);

  if (product.error) return next(product.error);

  return res.status(200).json(product);
};

const create = async (req, res, next) => {
  const { name } = req.body;

  const { error } = Joi.object({
    name: Joi.string().required(),
  }).validate({ name });

  if (error) {
    return next(error);
  }

  const newProduct = await productsService.create({ name });
  if (newProduct.error) return next(newProduct.error);

  return res.status(201).json(newProduct);
};

const update = async (req, res, next) => {
  const { name } = req.body;
  const { id } = req.params;

  const { error } = Joi.object({
    name: Joi.string().required(),
  }).validate({ name });

  if (error) {
    return next(error);
  }

  const product = await productsService.getById(id);
  if (product.error) return next(product.error);

  const newProduct = await productsService.update(id, name);
  if (newProduct.error) return next(newProduct.error);

  return res.status(200).json(newProduct);
};

const exclude = async (req, res, next) => {
  const { id } = req.params;

  const deletedProduct = await productsService.exclude(id);
  if (deletedProduct !== true) return next(deletedProduct.error);

  return res.status(204).send();
};

module.exports = {
  getAll,
  getById,
  create,
  update,
  exclude,
};
