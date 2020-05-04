import { getItem } from "../../localStorageWrapper";

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
  watchlist: getItem("watchlist") ? JSON.parse(getItem("watchlist")) : [],
  wallet: getItem("wallet") ? JSON.parse(getItem("wallet")) : [],
  watchbar: [],
  walletChart: {},
};
