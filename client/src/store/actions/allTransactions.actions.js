export const updateAllTransactions = (transactions) => {
  return {
    type: "updateAllTransactions",
    payload: transactions,
  };
};
export const removeTransaction = (id) => {
  return {
    type: "removeTransaction",
    payload: id,
  };
};
export const updateTransaction = (transaction) => {
  return {
    type: "updateTransaction",
    payload: transaction,
  };
};
export const createTransaction = (transaction) => {
  return {
    type: "createTransaction",
    payload: transaction,
  };
};