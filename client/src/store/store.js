import { createStore, combineReducers } from "redux";
import { allTransactionsReducer } from "./reducers/allTransactions.reducer";
import { currentPeriodReducer } from "./reducers/currentPeriod.reducer";
import { currentTextReducer } from "./reducers/currentText.reducer";
import { selectedTransactionReducer } from "./reducers/selectedTransaction.reducer";
import { isModalOpenReducer } from "./reducers/isModalOpen.reducer";
import { distinctYearsReducer } from "./reducers/distinctYears.reducer";

const reducers = combineReducers({
  allTransactions: allTransactionsReducer,
  currentPeriod: currentPeriodReducer,
  currentText: currentTextReducer,
  selectedTransaction: selectedTransactionReducer,
  isModalOpen: isModalOpenReducer,
  distinctYears: distinctYearsReducer
});

export const store = createStore(reducers);
