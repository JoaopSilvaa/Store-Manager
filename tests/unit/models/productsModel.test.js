const { expect } = require('chai');
const sinon = require('sinon');

const productsModel = require('../../../models/productsModel');
const connection = require('../../../models/connection');

describe('ProductsModel Tests', () => {
  describe('1 - When search all products', () => {
    before(async () => {
      const execute = [
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
      ] 
      sinon.stub(connection, 'execute').resolves(execute);
    });

    after(async () => {
      connection.execute.restore();
    });

    it('Returns all products in Database', async () => {
      const response = await productsModel.getAll();
      expect(response).to.be.an('array');
      expect(response.length).to.be.equal(2)
    });
  });

  describe('2 - When find product by ID', () => {
    describe('If the ID is not valid', () => {
      before(async () => {
        const execute = [[]]
        sinon.stub(connection, 'execute').resolves(execute);
      });

      after(async () => {
        connection.execute.restore();
      });

      it('Return null', async () => {
        const response = await productsModel.getById();
    
        expect(response).to.be.equal(null);
      })
    })

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

  describe('3 - When create a new product', () => {
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
      const response = await productsModel.create({ name });
      expect(response).to.be.an('object');
      expect(response).to.be.contains(
        {
          "id": 4,
          "name": "Cinto do Batman",
        }
      )
    });
  });

  describe('4 - When update a product', () => {
    before(async () => {
      const product =
      {
        "id": 4,
        "name": "Escudo do Capitão",
      };
      sinon.stub(productsModel, 'update').resolves(product);
    });

    after(async () => {
      productsModel.update.restore();
    });

    it('Returns a product in Database', async () => {
      const name = 'Escudo do Capitão'
      const response = await productsModel.update(4, name);
      expect(response).to.be.an('object');
      expect(response).to.be.contains(
        {
          "id": 4,
          "name": "Escudo do Capitão",
        }
      )
    });
  });

  describe('5 - When delete a product', () => {
    before(async () => {
      const product = null;
      sinon.stub(productsModel, 'exclude').resolves();
      sinon.stub(productsModel, 'getById').resolves(product);
    });

    after(async () => {
      productsModel.exclude.restore();
      productsModel.getById.restore();
    });

    it('Returns null after searching for deleted sale', async () => {
      await productsModel.exclude(4);
      const response = await productsModel.getById(4);
      expect(response).to.be.equal(null);
    });
  });
});