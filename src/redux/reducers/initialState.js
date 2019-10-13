export default {
  transactions: [],
  products: [],
  apiCallsInProgress: 0,
  price: {},
  pricesHistorical: {},
  profile: {
    id: null,
    watchList: ["BTC:USD", "INDEXNASDAQ:.IXIC"],
    currency: "GBP",
    symbol: "£",
    refreshRate: 30
  },
  // watchlist: [],
  // wallet: []
  watchlist: localStorage.getItem("watchlist")
    ? JSON.parse(localStorage.getItem("watchlist"))
    : [],
  wallet: localStorage.getItem("wallet")
    ? JSON.parse(localStorage.getItem("wallet"))
    : [],
  watchbar: [
    { ticker: "BTC:USD", price: 8000.0, change: 0.11, symbol: "$" },
    { ticker: "LTC:USD", price: 80.0, change: -0.19, symbol: "$" },
    { ticker: "VIX", price: 80.0, change: 0.19, symbol: "$" },
    { ticker: "AAPL", price: 80.0, change: 0.19, symbol: "$" },
    { ticker: "FTSE:100", price: 80.0, change: 0.19, symbol: "£" }
  ]
};
