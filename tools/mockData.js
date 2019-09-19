const transactions = [
  {
    id: "5d828150bab5d048613fb00a",
    // productId: 1,
    ticker: "BTC:USD",
    type: "Buy",
    quantity: 10.0,
    price: 11000.0,
    trandate: "2012-04-30",
    details: "Buying because money is screwed"
  },
  {
    id: "5d82815ba759305b7ba490b6",
    // productId: 1,
    ticker: "BTC:USD",
    type: "Sell",
    quantity: 1.0,
    price: 8000.0,
    trandate: "2012-04-30",
    details: "Cant believe I ever sold any!"
  },
  {
    id: "5d828164e3af8165c9af6c21",
    ticker: "LTC:USD",
    // productId: 2,
    type: "Buy",
    quantity: 100.0,
    price: 8.0,
    trandate: "2012-04-30",
    details: "Buying LTC because it was cheap"
  }
  // {
  //   id: "5d0fce9cc3452a48a8533ee6",
  //   ticker: "GOLD:OZ:GBP",
  //   transdate: "2019-06-23T19:10:11.197Z",
  //   transtype: "BUY",
  //   quantity: 6,
  //   price: 1,
  //   details: "Buying because it's shiny"
  // }
];

const products = [
  {
    // id: 1,
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
    // id: 2,
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
    // id: 3,
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
  id: "5d828112defd9aa7ab05a9e4",
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
  // id: null,
  productId: null,
  type: "",
  quantity: null,
  // price: null,
  trandate: null
};

const prices = [
  {
    id: "BTC:USD",
    productId: 1,
    ticker: "BTC:USD",
    open: 10190.017905283235,
    change: 142.56263695119924,
    price: 10332.580542234435,
    movement: 1.379738937126832,
    priceDate: "2019-09-12T00:00:00"
  },
  {
    id: "LTC:USD",
    productId: 2,
    ticker: "LTC:USD",
    open: 70.01665183013162,
    change: -1.050021668562934,
    price: 68.96663016156869,
    movement: -1.5225068502013794,
    priceDate: "2019-09-12T00:00:00"
  },
  {
    id: "GOLD:OZ:GBP",
    productId: 3,
    ticker: "GOLD:OZ:GBP",
    open: 1210.62,
    change: 4.7000000000000455,
    price: 1215.32,
    movement: 0.38672942105783215,
    priceDate: "2019-09-12T00:00:00"
  }
];

const pricesHistorical = [
  {
    id: "BTC:USD",
    ticker: "BTC:USD",
    data: {
      "2019-09-16": 10333.3050611673,
      "2019-09-15": 10364.5876942029,
      "2019-09-14": 10387.2871354362,
      "2019-09-13": 10331.4960491298,
      "2019-09-12": 10420.7047944628,
      "2019-09-11": 10147.3844646471,
      "2019-09-10": 10111.5846864888,
      "2019-09-09": 10367.006570538,
      "2019-09-08": 10454.5561837534,
      "2019-09-07": 10535.7288891109,
      "2019-09-06": 10331.5841835126,
      "2019-09-05": 10603.1326890161,
      "2019-09-04": 10550.0403597607,
      "2019-09-03": 10596.7756981408,
      "2019-09-02": 10360.8947186352,
      "2019-09-01": 9785.8551046041,
      "2019-08-31": 9649.5923950284,
      "2019-08-30": 9615.7442278158,
      "2019-08-29": 9515.0807853145,
      "2019-08-28": 9768.0551474469,
      "2019-08-27": 10188.6615512,
      "2019-08-26": 10368.5055524669,
      "2019-08-25": 10087.9923796401,
      "2019-08-24": 10180.3373152052,
      "2019-08-23": 10413.6079697528,
      "2019-08-22": 10126.3964063272,
      "2019-08-21": 10060.2812647564,
      "2019-08-20": 10798.3502695398,
      "2019-08-19": 10872.0124336627,
      "2019-08-18": 10361.6927271435
    }
  },
  {
    id: "LTC:USD",
    ticker: "LTC:USD",
    data: {
      "2019-09-16": 69.9656224776,
      "2019-09-15": 70.4436068325,
      "2019-09-14": 70.8536488098,
      "2019-09-13": 68.5509089779,
      "2019-09-12": 69.1231274056,
      "2019-09-11": 69.6366562278,
      "2019-09-10": 70.6966304703,
      "2019-09-09": 70.508110471,
      "2019-09-08": 71.0712593408,
      "2019-09-07": 69.0651681084,
      "2019-09-06": 65.0090866234,
      "2019-09-05": 65.5815606205,
      "2019-09-04": 66.952534213,
      "2019-09-03": 69.4423672941,
      "2019-09-02": 66.7908168523,
      "2019-09-01": 66.4421284359,
      "2019-08-31": 64.7031500179,
      "2019-08-30": 64.9100869194,
      "2019-08-29": 63.6614830006,
      "2019-08-28": 67.0871333335,
      "2019-08-27": 72.8573016671,
      "2019-08-26": 73.7310736166,
      "2019-08-25": 72.2799602437,
      "2019-08-24": 73.6072500542,
      "2019-08-23": 75.4965111009,
      "2019-08-22": 73.7585535152,
      "2019-08-21": 72.8191381944,
      "2019-08-20": 75.4495610461,
      "2019-08-19": 77.0600138002,
      "2019-08-18": 76.7043702445
    }
  }
];

// Using CommonJS style export so we can consume via Node (without using Babel-node)
module.exports = {
  newTransaction,
  transactions,
  products,
  watchlist,
  wallet,
  profile,
  prices,
  pricesHistorical
};
