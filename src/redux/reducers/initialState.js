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
  prices: [],
  // watchlist: [],
  watchlist: localStorage.getItem("watchlist")
    ? JSON.parse(localStorage.getItem("watchlist"))
    : [],
  portfolio: []
};
