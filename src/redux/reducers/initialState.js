export default {
  transactions: [],
  products: [],
  apiCallsInProgress: 0,
  price: {},
  pricesHistorical: {},
  profile: {
    id: null,
    watchList: ["BTC:USD"],
    currency: "GBP",
    symbol: "£",
    refreshRate: 30
  },
  watchlist: localStorage.getItem("watchlist")
    ? JSON.parse(localStorage.getItem("watchlist"))
    : [],
  wallet: localStorage.getItem("wallet")
    ? JSON.parse(localStorage.getItem("wallet"))
    : []
};
