import { useSelector } from "react-redux";

export const allTransactionsReducer = (state = [], action) => {
  const sortTransactions = (transactions) => {
    const sortedTransactions = transactions.sort((a, b) => {
      return a.yearMonthDay.split("-")[2] - b.yearMonthDay.split("-")[2];
    });
    return sortedTransactions;
  };

  switch (action.type) {
    case "updateAllTransactions":
      return action.payload;

    case "removeTransaction":
      return state.filter((transaction) => {
        return transaction._id !== action.payload;
      });

    case "updateTransaction":
      const index = state.findIndex((transaction) => {
        return transaction._id === action.payload._id;
      });
      state[index] = action.payload;
      return sortTransactions(state);

    case "createTransaction":
      state.push(action.payload);
      return sortTransactions(state);

    default:
      return state;
  }
};
