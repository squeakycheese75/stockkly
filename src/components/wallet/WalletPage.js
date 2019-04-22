import React from "react";
import WalletSummary from "./components/WalletSummary";
import WalletTable from "./components/WalletTable";

class WalletPage extends React.Component {
  _isMounted = false;

  constructor(props) {
    super(props);
    this.state = {
      holdingsData: [
        {
          ticker: "MSFT",
          name: "Microsoft Ltd",
          change: 0.19,
          price: 123.37,
          movement: 2.1,
          qty: 150,
          total: 18505.0,
          spot: 1.2922,
          ccy: "USD",
          symbol: "$"
        },
        {
          ticker: "BTC-USD",
          name: "Bitcoin",
          change: 0.19,
          price: 5272.76,
          movement: 0.76,
          qty: 8.99,
          total: 47434.02,
          spot: 1.2922,
          ccy: "USD",
          symbol: "$"
        },
        {
          ticker: "GOLD-OZ",
          name: "Gold Oz",
          change: -0.19,
          price: 982.17,
          movement: -1.1,
          qty: 6,
          total: 5893.02,
          spot: 1,
          ccy: "GBP",
          symbol: "£"
        }
      ]
    };
    this.auth = this.props.auth;
  }

  loadProductInfo() {
    var url = process.env["REACT_APP_PRICES_API"] + "/api/private/holdings";

    console.log(url);

    fetch(url, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${this.auth.getAccessToken()}`,
        "Content-Type": "application/json"
      }
    })
      .then(response => {
        if (response.ok) return response;
        throw new Error("Network response was not ok.");
      })
      .then(response => response.json())
      .then(response => {
        if (this._isMounted) {
          this.setState({
            holdingsData: response.message
          });
        }
      })
      .catch(error => {
        this.setState({
          message: error.message
        });
      });
  }

  componentDidMount() {
    this._isMounted = true;
    this.loadProductInfo();
  }

  componentWillUnmount() {
    this._isMounted = false;
  }

  render() {
    // const { history } = this.props;
    return (
      <div>
        <WalletSummary data={this.state.holdingsData} />
        <WalletTable data={this.state.holdingsData} />
      </div>
    );
  }
}

export default WalletPage;
