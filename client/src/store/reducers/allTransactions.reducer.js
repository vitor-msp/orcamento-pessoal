export const allTransactionsReducer = (state = [], action)=>{
  switch (action.type) {
    case 'fetchedTransactions':
      return action.payload;
  
    default:
      return state;
  }
}