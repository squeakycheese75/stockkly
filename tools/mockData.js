const transactions = [
  {
    id: 1,
    // title: "Securing React Apps with Auth0",
    // slug: "react-auth0-authentication-security",
    productId: 1,
    type: "Buy",
    quantity: 10.0,
    price: 11000.0,
    transtype: "Buy",
    trandate: "2012-04-30"
  },
  {
    id: 2,
    // title: "React: The Big Picture",
    // slug: "react-big-picture",
    productId: 1,
    type: "Sell",
    quantity: 1.0,
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
  }
];

const holdings = [
  {
    id: 1,
    productId: 1,
    qty: 100
  },
  {
    id: 2,
    productId: 2,
    qty: 10
  }
];

const prices = [
  {
    id: 1,
    productId: 1,
    ticker: "BTC:USD",
    open: 100,
    price: 101.3,
    priceDate: "2019-08-16"
  }
];

const newTransaction = {
  id: null,
  title: "",
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
  prices,
  holdings
};
