import * as types from "./actionTypes";
import * as portfolioApi from "../../api/portfolioApi";
import { beginApiCall } from "./apiStatusActions";

export function loadPortfolioSuccess(portfolio) {
  return { type: types.LOAD_PORTFOLIO_SUCCESS, portfolio };
}

export function loadPortfolio() {
  return function(dispatch) {
    dispatch(beginApiCall());
    return portfolioApi
      .getPortfolio()
      .then(portfolio => {
        dispatch(loadPortfolioSuccess(portfolio));
      })
      .catch(error => {
        throw error;
      });
  };
}
