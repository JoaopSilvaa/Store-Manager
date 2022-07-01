const { expect } = require('chai');
const sinon = require('sinon');

const salesController = require('../../../controllers/salesController');
const salesService = require('../../../services/salesService');

describe('SalesController Tests', () => {
  describe('23 - When create a new sale', () => {
    describe('If is a valid itemSold', () => {
      const response = {};
      const request = {};

      before(async () => {
        request.body = 
          [
          {
            "productId": 1,
            "quantity": 10
          },
          {
            "productId": 2,
            "quantity": 50
          }
          ];
        const itemsSold =
        {
          "id": 3,
          "itemsSold": [
            {
              "productId": 1,
              "quantity": 1
            },
            {
              "productId": 2,
              "quantity": 5
            }
          ]
        }
        response.status = sinon.stub().returns(response);
        response.json = sinon.stub().returns();
        sinon.stub(salesService, 'create').resolves(itemsSold);
      });

      after(async () => {
        salesService.create.restore();
      });

      it('Returns a sale created', async () => {
        const itemsSold =
        {
          "id": 3,
          "itemsSold": [
            {
              "productId": 1,
              "quantity": 1
            },
            {
              "productId": 2,
              "quantity": 5
            }
          ]
        }
        await salesController.create(request, response);
        expect(response.status.calledWith(201)).to.be.equal(true);
        expect(response.json.calledWith(itemsSold)).to.be.equal(true);
      });
    })
  });

  describe('24 - When search all sales', () => {
    describe('If is have not response', () => {
      const response = {};
      const request = {};

      before(async () => {
        request.body = {};

        response.status = sinon.stub().returns(response);
        response.json = sinon.stub().returns();

        sinon.stub(salesService, 'getAll').resolves(null);
      });

      after(async () => {
        salesService.getAll.restore();
      });

      it('Returns status 404 and mesage "Not Found"', async () => {
        await salesController.getAll(request, response);
        expect(response.status.calledWith(404)).to.be.equal(true);
        expect(response.json.calledWith({ message: 'Not Found' })).to.be.equal(true);
      });
    });

    describe('If is a have response successfully', () => {
      const response = {};
      const request = {};

      before(async () => {
        request.body = {};
        const sales =
          [
            {
              "saleId": 1,
              "date": "2021-09-09T04:54:29.000Z",
              "productId": 1,
              "quantity": 2
            },
            {
              "saleId": 1,
              "date": "2021-09-09T04:54:54.000Z",
              "productId": 2,
              "quantity": 2
            }
          ];
        
        response.status = sinon.stub().returns(response);
        response.json = sinon.stub().returns();

        sinon.stub(salesService, 'getAll').resolves(sales);
      });

      after(async () => {
        salesService.getAll.restore();
      });

      it('Returns status 200 with sales', async () => {
        const sales =
          [
            {
              "saleId": 1,
              "date": "2021-09-09T04:54:29.000Z",
              "productId": 1,
              "quantity": 2
            },
            {
              "saleId": 1,
              "date": "2021-09-09T04:54:54.000Z",
              "productId": 2,
              "quantity": 2
            }
          ];
        
        await salesController.getAll(request, response);
        expect(response.status.calledWith(200)).to.be.equal(true);
        expect(response.json.calledWith(sales)).to.be.equal(true);
      });
    });
  });

  describe('25 - When find sale by ID', () => {
    describe('If the ID is valid', () => {
      const response = {};
      const request = {};

      before(async () => {
        request.params = 1
        const sale = {
          "saleId": 1,
          "date": "2021-09-09T04:54:29.000Z",
          "productId": 1,
          "quantity": 2
        };

        response.status = sinon.stub().returns(response);
        response.json = sinon.stub().returns();
        sinon.stub(salesService, 'getById').resolves(sale);
      });

      after(async () => {
        salesService.getById.restore();
      });

      it('Returns status 200 with the searched sale', async () => {
        const sale = {
          "saleId": 1,
          "date": "2021-09-09T04:54:29.000Z",
          "productId": 1,
          "quantity": 2
        };

        await salesController.getById(request, response);
        expect(response.status.calledWith(200)).to.be.equal(true);
        expect(response.json.calledWith(sale)).to.be.equal(true);
      });
    });
  });

  // describe('26 - When update a product', () => {
  //   describe('If is a valid name and valid ID', () => {
  //     const response = {};
  //     const request = {};

  //     before(async () => {
  //       request.body = { name: "Martelo do Batman" };
  //       request.params = 1;
  //       const product =
  //       {
  //         "id": 1,
  //         "name": "Martelo do Batman",
  //       };
  //       response.status = sinon.stub().returns(response);
  //       response.json = sinon.stub().returns();
  //       sinon.stub(productsService, 'update').resolves(product);
  //     });

  //     after(async () => {
  //       productsService.update.restore();
  //     });

  //     it('Returns a product in Database', async () => {
  //       const product =
  //       {
  //         "id": 1,
  //         "name": "Martelo do Batman",
  //       };
  //       await productsController.update(request, response);
  //       expect(response.status.calledWith(200)).to.be.equal(true);
  //       expect(response.json.calledWith(product)).to.be.equal(true);
  //     });
  //   })
  // });
});
