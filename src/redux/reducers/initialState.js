import { storage } from "../../localStorageWrapper";

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
    refreshRate: 30,
    devmode: false,
  },
  watchlist: storage().getItem("watchlist")
    ? JSON.parse(storage().getItem("watchlist"))
    : [],
  wallet: storage().getItem("wallet")
    ? JSON.parse(storage().getItem("wallet"))
    : [],
  watchbar: [],
  walletChart: {},
};
