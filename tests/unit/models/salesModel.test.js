const { expect } = require('chai');
const sinon = require('sinon');

const salesModel = require('../../../models/salesModel');

describe('SalesModel Tests', () => {
  describe('6 - When create a sale', () => {
    before(async () => {
      const sale = { id: 1 }
      sinon.stub(salesModel, 'create').resolves(sale);
    });

    after(async () => {
      salesModel.create.restore();
    });

    it('Returns a ID of sale', async () => {
      const response = await salesModel.create();
      expect(response).to.be.an('object');
      expect(response.id).to.be.equal(1)
    });
  });
});
