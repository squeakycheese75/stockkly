const transactions = [
  {
    id: 1,
    productId: 1,
    type: "Buy",
    quantity: 10.0,
    price: 11000.0,
    trandate: "2012-04-30"
  },
  {
    id: 2,
    productId: 1,
    type: "Sell",
    quantity: 1.0,
    price: 8000.0,
    trandate: "2012-04-30"
  },
  {
    id: 3,
    productId: 2,
    type: "Buy",
    quantity: 100.0,
    price: 8.0,
    trandate: "2012-04-30"
  }
];

const products = [
  {
    id: 1,
    name: "Bitcoin",
    ticker: "BTC:USD",
    slug: "BTC:USD",
    displayTicker: "BTC:USD",
    description: "Bitcoin",
    company: "na",
    sector: "Crypto",
    quote: { ccy: "USD", symbol: "$" },
    exchange: "COINBASE"
  },
  {
    id: 2,
    name: "Litecoin",
    ticker: "LTC:USD",
    slug: "LTC:USD",
    displayTicker: "LTC:USD",
    description: "Litecoin",
    company: "na",
    sector: "Crypto",
    quote: { ccy: "USD", symbol: "$" },
    exchange: "COINBASE"
  },
  {
    id: 3,
    name: "Gold (Oz)",
    ticker: "GOLD:GBP:OZ",
    slug: "GOLD:GBP:OZ",
    displayTicker: "GOLD:GBP:OZ",
    description: "Gold Oz",
    company: "na",
    sector: "Precious metal",
    quote: { ccy: "GBP", symbol: "£" },
    exchange: ""
  }
];

const wallet = [
  {
    id: 1,
    ccy: "GBP",
    productId: 1,
    change: -36.13000000000011,
    displayTicker: "BTC:USD",
    movement: -2.9354414130417212,
    name: "Bitcoin",
    price: 1230.82,
    qty: 6,
    spot: 1.22,
    symbol: "£",
    ticker: "BTC:USD",
    total: 7384.92,
    total_change: -216.78000000000065
  },
  {
    id: 2,
    ccy: "USD",
    productId: 2,
    change: -10.13,
    displayTicker: "LTC:USD",
    movement: 1.48,
    name: "Litecoin",
    price: 230.82,
    qty: 20,
    spot: 1.22,
    symbol: "$",
    ticker: "LTC:USD",
    total: 599.92,
    total_change: 45.78000000000065
  }
];

const watchlist = [
  {
    id: 1,
    ccy: "USD",
    change: 10.008642301438158,
    movement: 0.09446216113523867,
    name: "Bitcoin",
    price: 10595.398391435361,
    spot: 0,
    symbol: "$",
    ticker: "BTC:USD",
    displayTicker: "BTC:USD",
    trend: [
      11967.787190573517,
      11879.328255338634,
      11838.86353262985,
      11309.829831529987,
      11505.116518140103,
      11377.616704314423,
      10884.87606986713,
      10097.014966873041,
      10366.66837062287,
      10396.53804965891,
      10274.863380063787,
      10361.692727143509,
      10872.01243366271,
      10798.350269539762,
      10060.28126475644,
      10126.396406327241,
      10413.607969752773,
      10180.337315205184,
      10087.992379640062,
      10368.505552466911,
      10188.661551199999,
      9768.055147446887,
      9515.080785314474,
      9615.744227815805,
      9649.592395028361,
      9785.855104604077,
      10360.894718635236,
      10596.775698140751,
      10550.04035976066,
      10595.398391435361
    ]
  },
  {
    id: 2,
    ccy: "USD",
    change: -1.5331304260924696,
    movement: -2.338453779367772,
    name: "Litecoin",
    price: 65.56171602018874,
    spot: 0,
    symbol: "$",
    ticker: "LTC:USD",
    displayTicker: "LTC:USD",
    trend: [
      91.25806385574482,
      89.845874533884,
      83.68716435033738,
      85.51198253225478,
      89.68945678036984,
      85.62668500971164,
      84.5641208516509,
      76.79959388225697,
      76.75506982453017,
      75.07530640253674,
      73.29830828864749,
      76.70437024446277,
      77.06001380024887,
      75.44956104614045,
      72.81913819436767,
      73.75855351524332,
      75.49651110089044,
      73.60725005418757,
      72.27996024373437,
      73.7310736166249,
      72.85730166706972,
      67.08713333353217,
      63.66148300059102,
      64.91008691940168,
      64.70315001785777,
      66.44212843586689,
      66.79081685233427,
      69.44236729410578,
      66.95253421303931,
      65.56171602018874
    ]
  }
];

const profile = {
  watchList: ["BTC:USD"],
  tickers: [
    { productId: 1, watchdate: "2019-08-16" },
    { productId: 2, watchdate: "2019-08-16" }
  ],
  currency: "GBP",
  symbol: "£",
  refreshRate: 30
};

const newTransaction = {
  id: null,
  // title: "",
  productId: null,
  type: "",
  quantity: null,
  // price: null,
  trandate: null
};

// Using CommonJS style export so we can consume via Node (without using Babel-node)
module.exports = {
  newTransaction,
  transactions,
  products,
  watchlist,
  wallet,
  profile
};