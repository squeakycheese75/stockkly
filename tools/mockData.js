const transactions = [
  {
    id: 1,
    title: "Securing React Apps with Auth0",
    slug: "react-auth0-authentication-security",
    productId: 1,
    category: "JavaScript",
    quantity: 1,
    price: 11000.0,
    transtype: "Buy"
  },
  {
    id: 2,
    title: "React: The Big Picture",
    slug: "react-big-picture",
    productId: 2,
    category: "JavaScript",
    quantity: 100,
    price: 8.0,
    transtype: "Buy"
  }
];

const products = [
  {
    id: 1,
    name: "Bitcoin",
    ticker: "BTC:USD",
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
    displayTicker: "LTC:USD",
    description: "Litecoin",
    company: "na",
    sector: "Crypto",
    quote: { ccy: "USD", symbol: "$" },
    exchange: "COINBASE"
  }
];

const newTransaction = {
  id: null,
  title: "",
  productId: null,
  category: ""
};

// Using CommonJS style export so we can consume via Node (without using Babel-node)
module.exports = {
  newTransaction,
  transactions,
  products
};
