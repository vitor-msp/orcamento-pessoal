import { createStore, combineReducers } from "redux";
import { allTransactionsReducer } from "./reducers/allTransactions.reducer";

const reducers = combineReducers({
  allTransactions: allTransactionsReducer,
  // distinctYears: distinctYearsReducer,
  // modalContent: modalContentReducer,
  // currentPeriod: currentPeriodReducer,
  // currentText: currentTextReducer
});

export const store = createStore(reducers);
