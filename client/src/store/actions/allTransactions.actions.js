export const fetchedTransactions = (transactions) => {
  return {
    type: "fetchedTransactions",
    payload: transactions,
  };
};
