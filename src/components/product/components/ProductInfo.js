import React from "react";

class ProductInfo extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      pid: this.props.productId,
      productData: "",
      message: "",
      isLoaded: false
    };
  }

  loadProductInfo() {
    console.log("Loading product info data from api");
    var url =
      process.env["REACT_APP_PRICES_API"] + "/api/products/" + this.state.pid;

    console.log(url);

    fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json"
      }
    })
      .then(response => {
        if (response.ok) return response;
        throw new Error("Network response was not ok.");
      })
      .then(response => response.json())
      .then(response => {
        this.setState({
          productData: response.message,
          isLoaded: true
        });
      })
      .catch(error => {
        this.setState({
          message: error.message
        });
      });
  }

  componentDidMount() {
    this.loadProductInfo();
  }

  render() {
    return (
      <>
        {this.state.isLoaded ? (
          <>
            <h5>Product Info: {this.state.pid}</h5>
            <h5>Name: {this.state.productData.name}</h5>
            <h6>Company: {this.state.productData.company.name}</h6>

            <p>
              Market Data:
              <h6>MarketCap: {this.state.productData.marketData.marketCap}</h6>
            </p>

            {/* "ticker": "BTC-USD",
            "displayTicker": "BTC:USD",
            "name": "Bitcoin (USD)",
            "description": "Bitcoin is an experimental digital currency that enables instant payments to anyone, anywhere in the world.",
            "company": {
                "name": "Bitcoin",
                "url": "https://bitcoin.org/"
            },
            "sector": "Crypto",
            "exchanges": ["CPRO"],
            "quote": {
                "symbol": "$",
                "currency": "USD"
            } */}
          </>
        ) : (
          <>
            <h5>Loading..</h5>
          </>
        )}
      </>
    );
  }
}

export default ProductInfo;
