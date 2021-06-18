import { mongoose } from '../index.js';
const ObjectId = mongoose.Types.ObjectId;

import { TransactionModel } from '../models/TransactionModel.js';
import { formatDate } from '../helpers/formatDate.js';

//get by period
const getByPeriod = async (period) => {
  const data = {};
  data.transactions = await TransactionModel.find({ yearMonth: period });
  data.transactions.sort((a, b) => {
    return a.yearMonthDay.split('-')[2] - b.yearMonthDay.split('-')[2];
  });
  data.distinctYears = await TransactionModel.distinct('year');
  return data;
};

//post
const postTransaction = async (transaction) => {
  const { description, value, category, type } = transaction;
  const { year, month, day, yearMonth, yearMonthDay } = formatDate(
    transaction.yearMonthDay
  );
  const transactionToPost = {
    description,
    value,
    category,
    year,
    month,
    day,
    yearMonth,
    yearMonthDay,
    type,
  };
  const newTransaction = new TransactionModel(transactionToPost);
  const res = await newTransaction.save();
  return res;
};

//update
const updateTransaction = async (transaction) => {
  const { _id, description, value, category, type } = transaction;
  const { year, month, day, yearMonth, yearMonthDay } = formatDate(
    transaction.yearMonthDay
  );
  const transactionToUpdate = {
    _id,
    description,
    value,
    category,
    year,
    month,
    day,
    yearMonth,
    yearMonthDay,
    type,
  };
  const updatedTransaction = new TransactionModel(transactionToUpdate);
  const res = await TransactionModel.findByIdAndUpdate(_id, updatedTransaction);
  return res;
};

//delete
const deleteTransaction = async (id) => {
  await TransactionModel.findByIdAndDelete(id);
  return true;
};

export { getByPeriod, postTransaction, updateTransaction, deleteTransaction };
