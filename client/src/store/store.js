import { createStore, combineReducers } from "redux";
import { allTransactionsReducer } from "./reducers/allTransactions.reducer";
import { currentPeriodReducer } from "./reducers/currentPeriod.reducer";

const reducers = combineReducers({
  allTransactions: allTransactionsReducer,
  currentPeriod: currentPeriodReducer,
  // currentText: currentTextReducer,
  // distinctYears: distinctYearsReducer,
  // modalContent: modalContentReducer,
});

export const store = createStore(reducers);
