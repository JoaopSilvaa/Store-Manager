const { expect } = require('chai');
const sinon = require('sinon');

const salesProductsModel = require('../../../models/salesProductModel');
const connection = require('../../../models/connection');

describe('SalesproductsModel Tests', () => {
  describe('7 - When get all sales_products', () => {
    describe('Return something if search sales_products', () => {
      before(async () => {
        const execute =
        {
          saleId: 1,
          date: '2021-09-09T04:54:54.000Z',
          productId: 1,
          quantity: 2,
        }
        sinon.stub(salesProductsModel, 'getAll').resolves(execute);
      });

      after(async () => {
        salesProductsModel.getAll.restore();
      });

      it('Returns all sales_products', async () => {
        const response = await salesProductsModel.getAll();
        expect(response).to.be.an('object');
        expect(response).to.be.contains(
          {
            saleId: 1,
            date: '2021-09-09T04:54:54.000Z',
            productId: 1,
            quantity: 2,
          })
      });
    });
    describe('Returns nothing of not sales_products', () => {

      before(async () => {
        const execute = []
        sinon.stub(connection, 'execute').resolves(execute);
      });
      
      after(async () => {
        connection.execute.restore();
      });

      it('Returns null', async () => {
        const response = await salesProductsModel.getAll();
        expect(response).to.be.equal(null);
      });
    });
  });

  describe('8 - When get a sales_products whit ID', () => {
    describe('Returns something if it has a matching id', () => {
      before(async () => {
        const execute =
        {
          saleId: 1,
          date: '2021-09-09T04:54:54.000Z',
          productId: 1,
          quantity: 2,
        }
        sinon.stub(salesProductsModel, 'getById').resolves(execute);
      });

      after(async () => {
        salesProductsModel.getById.restore();
      });

      it('Returns a sales_products', async () => {
        const response = await salesProductsModel.getById(1);
        expect(response).to.be.an('object');
        expect(response).to.be.contains(
          {
            saleId: 1,
            date: '2021-09-09T04:54:54.000Z',
            productId: 1,
            quantity: 2,
          })
      });
    });
    describe('Returns nothing if it has no matching id', () => {

      before(async () => {
        const execute = [[]]
        sinon.stub(connection, 'execute').resolves(execute);
      });

      after(async () => {
        connection.execute.restore();
      });

      it('Returns null', async () => {
        const response = await salesProductsModel.getById();
        expect(response).to.be.equal(null);
      });
    });
  });
});
