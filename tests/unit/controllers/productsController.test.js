const { expect } = require('chai');
const sinon = require('sinon');

const productsController = require('../../../controllers/productsController');
const productsService = require('../../../services/productsService');

describe('ProductsController Tests', () => {
  describe('19 - When search all products', () => {
    describe('If is have not response', () => {
      const response = {};
      const request = {};

      before(async () => {
        request.body = {};

        response.status = sinon.stub().returns(response);
        response.json = sinon.stub().returns();

        sinon.stub(productsService, 'getAll').resolves(null);
      });

      after(async () => {
        productsService.getAll.restore();
      });

      it('Returns status 404 and mesage "Not Found"', async () => {
        await productsController.getAll(request, response);
        expect(response.status.calledWith(404)).to.be.equal(true);
        expect(response.json.calledWith({ message: 'Not Found' })).to.be.equal(true);
      });
    });

    describe('If is a have response successfully', () => {
      const response = {};
      const request = {};

      before(async () => {
        request.body = {};
        const products = [
          {
            "id": 1,
            "name": "Martelo de Thor",
          },
          {
            "id": 2,
            "name": "Traje de encolhimento",
          }
        ];

        response.status = sinon.stub().returns(response);
        response.json = sinon.stub().returns();

        sinon.stub(productsService, 'getAll').resolves(products);
      });

      after(async () => {
        productsService.getAll.restore();
      });

      it('Returns status 200 with products', async () => {
        const products = [
          {
            "id": 1,
            "name": "Martelo de Thor",
          },
          {
            "id": 2,
            "name": "Traje de encolhimento",
          }
        ];
        await productsController.getAll(request, response);
        expect(response.status.calledWith(200)).to.be.equal(true);
        expect(response.json.calledWith(products)).to.be.equal(true);
      });
    });
  });

  describe('20 - When find product by ID', () => {
    describe('If the ID is valid', () => {
      const response = {};
      const request = {};

      before(async () => {
        request.params = 1
        const product = {
          "id": 1,
          "name": "Martelo de Thor",
        };
        
        response.status = sinon.stub().returns(response);
        response.json = sinon.stub().returns();
        sinon.stub(productsService, 'getById').resolves(product);
      });

      after(async () => {
        productsService.getById.restore();
      });

      it('Returns status 200 with the searched product ', async () => {
        const product = {
          "id": 1,
          "name": "Martelo de Thor",
        };
        await productsController.getById(request, response);
        expect(response.status.calledWith(200)).to.be.equal(true);
        expect(response.json.calledWith(product)).to.be.equal(true);
      });
    });
  });

  describe('21 - When create a new product', () => {
    describe('If is a valid name', () => {
      const response = {};
      const request = {};

      before(async () => {
        request.body = { "name": "Cinto do Batman" };
        const product =
        {
          "id": 4,
          "name": "Cinto do Batman",
        };
        response.status = sinon.stub().returns(response);
        response.json = sinon.stub().returns();
        sinon.stub(productsService, 'create').resolves(product);
      });

      after(async () => {
        productsService.create.restore();
      });

      it('Returns a product in Database', async () => {
        const product =
        {
          "id": 4,
          "name": "Cinto do Batman",
        };
        await productsController.create(request, response);
        expect(response.status.calledWith(201)).to.be.equal(true);
        expect(response.json.calledWith(product)).to.be.equal(true);
      });
    })
  });


  describe('22 - When update a product', () => {
    describe('If is a valid name and valid ID', () => {
      const response = {};
      const request = {};

      before(async () => {
        request.body = { name: "Martelo do Batman" };
        request.params = 1;
        const product =
        {
          "id": 1,
          "name": "Martelo do Batman",
        };
        response.status = sinon.stub().returns(response);
        response.json = sinon.stub().returns();
        sinon.stub(productsService, 'update').resolves(product);
      });

      after(async () => {
        productsService.update.restore();
      });

      it('Returns a product in Database', async () => {
        const product =
        {
          "id": 1,
          "name": "Martelo do Batman",
        };
        await productsController.update(request, response);
        expect(response.status.calledWith(200)).to.be.equal(true);
        expect(response.json.calledWith(product)).to.be.equal(true);
      });
    })
  });
});
