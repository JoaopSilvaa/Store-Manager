const Joi = require('joi');
const salesService = require('../services/salesService');

const create = async (req, res, next) => {
  const itemsSold = req.body;
  itemsSold.forEach((item) => {
    const { error } = Joi.object({
      productId: Joi.number().integer().required(),
      quantity: Joi.number().integer().required(),
    }).validate(item);
  
    if (error) {
      return next(error);
    }
  });
  
  const newItemSold = await salesService.create(itemsSold);

  if (newItemSold.error) return next(newItemSold.error);

  return res.status(201).json(newItemSold);
};

const getAll = async (_req, res) => {
  try {
    const sales = await salesService.getAll();
    if (!sales) return res.status(404).json({ message: 'Not Found' });
    return res.status(200).json(sales);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const getById = async (req, res, next) => {
  const { id } = req.params;

  const sale = await salesService.getById(id);

  if (sale.error) return next(sale.error);

  return res.status(200).json(sale);
};

module.exports = {
  create,
  getAll,
  getById,
};
