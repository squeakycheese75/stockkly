import { combineReducers } from "redux";
import transactions from "./transactionReducer";

const rootReducer = combineReducers({
  transactions
});

export default rootReducer;
