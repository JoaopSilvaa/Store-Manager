const { expect } = require('chai');
const sinon = require('sinon');

const productsService = require('../../../services/productsService');
const productsModel = require('../../../models/productsModel');

describe('ProductsService Tests', () => {
  describe('9 - When search all products', () => {
    before(async () => {
      const products =
        [
          {
            "id": 1,
            "name": "Martelo de Thor",
          },
          {
            "id": 2,
            "name": "Traje de encolhimento",
          }
        ]
      sinon.stub(productsModel, 'getAll').resolves(products);
    });

    after(async () => {
      productsModel.getAll.restore();
    });

    it('Returns all products in Database', async () => {
      const response = await productsService.getAll();
      expect(response).to.be.an('array');
      expect(response.length).to.be.equal(2)
    });
  });

  describe('10 - When find product by ID', () => {
    describe('If the ID is not valid', () => {
      before(async () => {
        const product = {
          error: {
            code: 'notFound',
            message: 'Product not found',
          },
        };
        sinon.stub(productsService, 'getById').resolves(product);
      });

      after(async () => {
        productsService.getById.restore();
      });

      it('Returns object error ', async () => {
        const response = await productsService.getById(4);

        expect(response).to.be.a('object');
        expect(response).to.have.property('error');
      });
    });

    describe('If the ID is valid', () => {
      before(async () => {
        const product = {
          "id": 1,
          "name": "Martelo de Thor",
        };
        sinon.stub(productsModel, 'getById').resolves(product);
      });

      after(async () => {
        productsModel.getById.restore();
      });

      it('Returns the searched product ', async () => {
        const response = await productsModel.getById(1);

        expect(response.name).to.be.equal("Martelo de Thor");
      });
    });
  });

  describe('11 - When create a new product', () => {
    describe('If name length is less than 5', () => {
      before(async () => {
        const error = (
          {
            error: {
              code: 'unprocessable',
              message: '"name" length must be at least 5 characters long',
            },
          });
        sinon.stub(productsService, 'create').resolves(error);
      });

      after(async () => {
        productsService.create.restore();
      });

      it('Returns a object error', async () => {
        const name = 'Cin'
        const response = await productsService.create({ name });
        expect(response).to.be.an('object');
        expect(response).to.have.property('error');
      });
    })

    describe('If is a valid name', () => {
      before(async () => {
        const product =
        {
          "id": 4,
          "name": "Cinto do Batman",
        };
        sinon.stub(productsModel, 'create').resolves(product);
      });

      after(async () => {
        productsModel.create.restore();
      });

      it('Returns a product in Database', async () => {
        const name = 'Cinto do Batman'
        const response = await productsService.create({ name });
        expect(response).to.be.an('object');
        expect(response).to.be.contains(
          {
            "id": 4,
            "name": "Cinto do Batman",
          }
        )
      });
    })
  });


  describe('12 - When update a product', () => {
    describe('If is not valid ID', () => {
      before(async () => {
        const product =
        {
          error: {
            code: 'notFound',
            message: 'Product not found',
          },
        };
        sinon.stub(productsService, 'update').resolves(product);
      });

      after(async () => {
        productsService.update.restore();
      });

      it('Returns a object error', async () => {
        const name = 'Cinto do Batman'
        const response = await productsService.update(5, name);
        expect(response).to.be.an('object');
        expect(response).to.have.property('error');
      });
    })
    
    describe('If name length is less than 5', () => {
      before(async () => {
        const error = (
          {
            error: {
              code: 'unprocessable',
              message: '"name" length must be at least 5 characters long',
            },
          });
        sinon.stub(productsService, 'update').resolves(error);
      });

      after(async () => {
        productsService.update.restore();
      });

      it('Returns a object error', async () => {
        const name = 'Cin'
        const response = await productsService.update(1, name);
        expect(response).to.be.an('object');
        expect(response).to.have.property('error');
      });
    })

    describe('If is a valid name and valid ID', () => {
      before(async () => {
        const product =
        {
          "id": 1,
          "name": "Cinto do Batman",
        };
        sinon.stub(productsModel, 'update').resolves(product);
      });

      after(async () => {
        productsModel.update.restore();
      });

      it('Returns a product in Database', async () => {
        const name = 'Cinto do Batman'
        const response = await productsService.update(1, name);
        expect(response).to.be.an('object');
        expect(response).to.be.contains(
          {
            "id": 1,
            "name": "Cinto do Batman",
          }
        )
      });
    })
  });

  describe('13 - When delete a product', () => {
    describe('If is not valid ID', () => {
      before(async () => {
        const product =
        {
          error: {
            code: 'notFound',
            message: 'Product not found',
          },
        };
        sinon.stub(productsService, 'exclude').resolves(product);
      });

      after(async () => {
        productsService.exclude.restore();
      });

      it('Returns a object error', async () => {
        const response = await productsService.exclude(5);
        expect(response).to.be.an('object');
        expect(response).to.have.property('error');
      });
    })
    
    describe('Successfully deleted', () => {
      before(async () => {
        const product = true;
        sinon.stub(productsService, 'exclude').resolves(product);
      });
      
      after(async () => {
        productsService.exclude.restore();
      });
      
      it('Returns true after deleted product', async () => {
        const response = await productsService.exclude(1);
        expect(response).to.be.equal(true);
      });
    })
  });
});
