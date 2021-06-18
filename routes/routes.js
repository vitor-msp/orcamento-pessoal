import express from 'express';
const transactionRouter = express();
import {
  getByPeriod,
  postTransaction,
  updateTransaction,
  deleteTransaction,
} from '../services/transactionService.js';

//get by period
transactionRouter.get('/', async (req, res, next) => {
  try {
    if (!req.query.period) {
      throw new Error(
        'É necessário informar o parâmetro "period", cujo valor deve estar no formato yyyy-mm.'
      );
    }
    const data = await getByPeriod(req.query.period);
    res.send(data);
  } catch (error) {
    next(error);
  }
});

//post
transactionRouter.post('/', async (req, res, next) => {
  try {
    const data = await postTransaction(req.body);
    res.send(data);
  } catch (error) {
    next(error);
  }
});

//update
transactionRouter.put('/', async (req, res, next) => {
  try {
    const message = await updateTransaction(req.body);
    if (message === null) {
      throw new Error(`Erro ao salvar!`);
    }
    res.send(message);
  } catch (error) {
    next(error);
  }
});

//delete
transactionRouter.delete('/:id', async (req, res, next) => {
  try {
    const deletedTrue = await deleteTransaction(req.params.id);
    res.send(deletedTrue);
  } catch (error) {
    next(error);
  }
});

//Tratamento de erros
transactionRouter.use((err, _req, res, _next) => {
  console.log(err);
  res.status(400).send(err.message);
});

export { transactionRouter as routes };
