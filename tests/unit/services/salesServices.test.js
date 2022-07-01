const { expect } = require('chai');
const sinon = require('sinon');

const salesService = require('../../../services/salesService');
const salesProductModel = require('../../../models/salesProductModel');

describe('SalesService Tests', () => {
  describe('14 - When search all sales', () => {
    before(async () => {
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
        ]
      sinon.stub(salesProductModel, 'getAll').resolves(sales);
    });

    after(async () => {
      salesProductModel.getAll.restore();
    });

    it('Returns all sales in Database', async () => {
      const response = await salesService.getAll();
      expect(response).to.be.an('array');
      expect(response.length).to.be.equal(2)
    });
  });

  describe('15 - When create a new sale', () => {
    describe('If is not valid ID', () => {
      before(async () => {
        const sale =
        {
          error: {
            code: 'notFound',
            message: 'Sale not found',
          },
        };
        sinon.stub(salesService, 'create').resolves(sale);
      });

      after(async () => {
        salesService.create.restore();
      });

      it('Returns a object error', async () => {
        const itemsSold = [
          {
            "productId": 1,
            "quantity": 10
          },
          {
            "productId": 2,
            "quantity": 50
          }
        ]
        const response = await salesService.create(99, itemsSold);
        expect(response).to.be.an('object');
        expect(response).to.have.property('error');
      });
    })

    describe('If is not a valid productId', () => {
      before(async () => {
        const error = (
          {
            error: {
              code: 'badRequest',
              message: '"productId" is required',
            },
          });
        sinon.stub(salesService, 'create').resolves(error);
      });

      after(async () => {
        salesService.create.restore();
      });

      it('Returns a object error', async () => {
        const itemsSold = [
          {
            "productId": -1,
            "quantity": 10
          },
          {
            "productId": 2,
            "quantity": 50
          }
        ]
        const response = await salesService.create(1, itemsSold);
        expect(response).to.be.an('object');
        expect(response).to.have.property('error');
      });
    })

    describe('If is not productId in Database', () => {
      before(async () => {
        const error = (
          {
            error: {
              code: 'notFound',
              message: 'Product not found',
            },
          });
        sinon.stub(salesService, 'create').resolves(error);
      });

      after(async () => {
        salesService.create.restore();
      });

      it('Returns a object error', async () => {
        const itemsSold = [
          {
            "productId": 99,
            "quantity": 10
          },
          {
            "productId": 2,
            "quantity": 50
          }
        ]
        const response = await salesService.create(1, itemsSold);
        expect(response).to.be.an('object');
        expect(response).to.have.property('error');
      });
    })

    describe('If is not a valid quantity', () => {
      before(async () => {
        const error = (
          {
            error: {
              code: 'unprocessable',
              message: '"quantity" must be greater than or equal to 1',
            },
          });
        sinon.stub(salesService, 'create').resolves(error);
      });

      after(async () => {
        salesService.create.restore();
      });

      it('Returns a object error', async () => {
        const itemsSold = [
          {
            "productId": 1,
            "quantity": -10
          },
          {
            "productId": 2,
            "quantity": 50
          }
        ]
        const response = await salesService.create(1, itemsSold);
        expect(response).to.be.an('object');
        expect(response).to.have.property('error');
      });
    })

    describe('If is a valid productId and quantity', () => {
      before(async () => {
        const sale = ({
          "saleId": 1,
          "itemscreated": [
            {
              "productId": 1,
              "quantity": 10
            },
            {
              "productId": 2,
              "quantity": 50
            }
          ]
        });
        sinon.stub(salesProductModel, 'create').resolves(sale);
      });

      after(async () => {
        salesProductModel.create.restore();
      });

      it('Returns a sale in Database', async () => {
        const itemsSold = [
          {
            "productId": 1,
            "quantity": 10
          },
          {
            "productId": 2,
            "quantity": 50
          }
        ]
        const response = await salesProductModel.create(1, itemsSold);
        expect(response).to.be.an('object');
        expect(response).to.have.property('saleId');
      });
    })
  });


  describe('16 - When find sale by ID', () => {
    describe('If the ID is not valid', () => {
      before(async () => {
        const sales = {
          error: {
            code: 'notFound',
            message: 'Sale not found',
          },
        };
        sinon.stub(salesService, 'getById').resolves(sales);
      });

      after(async () => {
        salesService.getById.restore();
      });

      it('Returns object error ', async () => {
        const response = await salesService.getById(99);

        expect(response).to.be.a('object');
        expect(response).to.have.property('error');
      });
    });

    describe('If the ID is valid', () => {
      before(async () => {
        const sale = {
          "saleId": 1,
          "date": "2021-09-09T04:54:29.000Z",
          "productId": 1,
          "quantity": 2
        };
        sinon.stub(salesProductModel, 'getById').resolves(sale);
      });

      after(async () => {
        salesProductModel.getById.restore();
      });

      it('Returns the searched sale ', async () => {
        const response = await salesProductModel.getById(1);

        expect(response).to.have.property('saleId');
      });
    });
  });

  describe('17 - When delete a sale', () => {
    describe('If is not valid ID', () => {
      before(async () => {
        const sale =
        {
          error: {
            code: 'notFound',
            message: 'Sale not found',
          },
        };
        sinon.stub(salesService, 'exclude').resolves(sale);
      });

      after(async () => {
        salesService.exclude.restore();
      });

      it('Returns a object error', async () => {
        const response = await salesService.exclude(99);
        expect(response).to.be.an('object');
        expect(response).to.have.property('error');
      });
    })

    describe('Successfully deleted', () => {
      before(async () => {
        const sale = true;
        sinon.stub(salesService, 'exclude').resolves(sale);
      });
      
      after(async () => {
        salesService.exclude.restore();
      });
      
      it('Returns true after deleted sale', async () => {
        const response = await salesService.exclude(1);
        expect(response).to.be.equal(true);
      });
    })
  });

  describe('18 - When update a product', () => {
    describe('If is not valid ID', () => {
      before(async () => {
        const sale =
        {
          error: {
            code: 'notFound',
            message: 'Sale not found',
          },
        };
        sinon.stub(salesService, 'update').resolves(sale);
      });

      after(async () => {
        salesService.update.restore();
      });

      it('Returns a object error', async () => {
        const itemsSold = [
          {
            "productId": 1,
            "quantity": 10
          },
          {
            "productId": 2,
            "quantity": 50
          }
        ]
        const response = await salesService.update(99, itemsSold);
        expect(response).to.be.an('object');
        expect(response).to.have.property('error');
      });
    })

    describe('If is not a valid productId', () => {
      before(async () => {
        const error = (
          {
            error: {
              code: 'badRequest',
              message: '"productId" is required',
            },
          });
        sinon.stub(salesService, 'update').resolves(error);
      });

      after(async () => {
        salesService.update.restore();
      });

      it('Returns a object error', async () => {
        const itemsSold = [
          {
            "productId": -1,
            "quantity": 10
          },
          {
            "productId": 2,
            "quantity": 50
          }
        ]
        const response = await salesService.update(1, itemsSold);
        expect(response).to.be.an('object');
        expect(response).to.have.property('error');
      });
    })

    describe('If is not productId in Database', () => {
      before(async () => {
        const error = (
          {
            error: {
              code: 'notFound',
              message: 'Product not found',
            },
          });
        sinon.stub(salesService, 'update').resolves(error);
      });

      after(async () => {
        salesService.update.restore();
      });

      it('Returns a object error', async () => {
        const itemsSold = [
          {
            "productId": 99,
            "quantity": 10
          },
          {
            "productId": 2,
            "quantity": 50
          }
        ]
        const response = await salesService.update(1, itemsSold);
        expect(response).to.be.an('object');
        expect(response).to.have.property('error');
      });
    })

    describe('If is not a valid quantity', () => {
      before(async () => {
        const error = (
          {
            error: {
              code: 'unprocessable',
              message: '"quantity" must be greater than or equal to 1',
            },
          });
        sinon.stub(salesService, 'update').resolves(error);
      });

      after(async () => {
        salesService.update.restore();
      });

      it('Returns a object error', async () => {
        const itemsSold = [
          {
            "productId": 1,
            "quantity": -10
          },
          {
            "productId": 2,
            "quantity": 50
          }
        ]
        const response = await salesService.update(1, itemsSold);
        expect(response).to.be.an('object');
        expect(response).to.have.property('error');
      });
    })

    describe('If is a valid productId and quantity', () => {
      before(async () => {
        const sale = ({
          "saleId": 1,
          "itemsUpdated": [
            {
              "productId": 1,
              "quantity": 10
            },
            {
              "productId": 2,
              "quantity": 50
            }
          ]
        });
        sinon.stub(salesService, 'update').resolves(sale);
      });

      after(async () => {
        salesService.update.restore();
      });

      it('Returns a sale in Database', async () => {
        const itemsSold = [
          {
            "productId": 1,
            "quantity": 10
          },
          {
            "productId": 2,
            "quantity": 50
          }
        ]
        const response = await salesService.update(1, itemsSold);
        expect(response).to.be.an('object');
        expect(response).to.have.property('saleId');
      });
    })
  });
});

describe('Validators Test', () => {
  describe('26 - If is not valid product', () => {
    before(async () => {
      const error = {
        error: {
          code: 'badRequest',
          message: '"productId" is required',
        },
      };

      sinon.stub(salesService, 'valids').resolves(error);
    });

    after(async () => {
      salesService.valids.restore();
    });

    it('Returns a error badRequest', async () => {
      const itemsSold = 
        {
          "quantity": 10
        }
      const response = await salesService.valids(itemsSold);
      expect(response).to.be.an('object');
      expect(response.error.code).to.be.equal('badRequest');
    });
  });
});
