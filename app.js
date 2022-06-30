const express = require('express');
const bodyParser = require('body-parser');
const rescue = require('express-rescue');

const productsController = require('./controllers/productsController');
const salesController = require('./controllers/salesController');
const errorMiddleware = require('./middlewares/error');

const app = express();
app.use(bodyParser.json());

// não remova esse endpoint, é para o avaliador funcionar
app.get('/', (_request, response) => {
  response.send();
});

app.get('/products', rescue(productsController.getAll));

app.get('/products/:id', rescue(productsController.getById));

app.post('/products', rescue(productsController.create));

app.post('/sales', rescue(salesController.create));

app.get('/sales', rescue(salesController.getAll));

app.get('/sales/:id', rescue(salesController.getById));

app.put('/products/:id', rescue(productsController.update));

app.delete('/products/:id', rescue(productsController.exclude));

app.delete('/sales/:id', rescue(salesController.exclude));

app.use(errorMiddleware);

// não remova essa exportação, é para o avaliador funcionar
// você pode registrar suas rotas normalmente, como o exemplo acima
// você deve usar o arquivo index.js para executar sua aplicação 
module.exports = app;