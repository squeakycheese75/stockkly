export default {
  transactions: [],
  products: [],
  apiCallsInProgress: 0,
  profile: {
    id: 1,
    tickers: [],
    currency: "GBP",
    symbol: "£",
    refreshRate: 100
  },
  watchlist: localStorage.getItem("watchlist")
    ? JSON.parse(localStorage.getItem("watchlist"))
    : [],
  wallet: localStorage.getItem("wallet")
    ? JSON.parse(localStorage.getItem("wallet"))
    : []
  // transactions: localStorage.getItem("transactions")
  //   ? JSON.parse(localStorage.getItem("transactions"))
  //   : []
};
