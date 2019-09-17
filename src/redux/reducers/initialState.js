export default {
  transactions: [],
  products: [],
  apiCallsInProgress: 0,
  price: {},
  pricesHistorical: {},
  profile: {
    id: 1,
    tickers: [],
    watchList: ["BTC:USD"],
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
