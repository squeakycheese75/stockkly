export default {
  transactions: [],
  products: [],
  apiCallsInProgress: 0,
  profile: {
    watchList: [],
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
};
