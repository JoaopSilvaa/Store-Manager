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

const getById = async (req, res) => {
  try {
    const { id } = req.params;
    const product = await productsService.getById(id);
    if (!product) return res.status(404).json({ message: 'Product not found' });
    return res.status(200).json(product);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = {
  getAll,
  getById,
};
