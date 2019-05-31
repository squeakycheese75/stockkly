import React from "react";
import WalletSummary from "./components/WalletSummary";
import WalletTable from "./components/WalletTable";
// import WatchingPage from "../watcher/WatchingPage";

class WalletPage extends React.Component {
  _isMounted = false;

  constructor(props) {
    super(props);
    this.state = {
      appSettings: this.props.appSettings,
      holdingsData: localStorage.getItem("holdingsData")
        ? JSON.parse(localStorage.getItem("holdingsData"))
        : []
    };
    this.auth = this.props.auth;
  }

  async loadWalletData() {
    // var url = process.env["REACT_APP_PRICES_API"] + "/api/private/holdings/";
    var url = process.env["REACT_APP_PRICES_API"] + "/api/wallet/holdings/";

    console.log("Calling ... " + url);

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
            holdingsData: response
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

    if (this.auth.isAuthenticated()) {
      this.loadWalletData();
    }
    // Sets the data refresh rate
    var refreshRate = this.state.appSettings.refreshRate * 1000;
    setInterval(() => {
      if (this._isMounted) {
        this.loadWalletData();
      }
      // else {
      //   console.log("Not mounted, so not loading");
      // }
    }, refreshRate);
  }

  componentWillUnmount() {
    this._isMounted = false;
    //Cache data back to localStorage if unmounted
    localStorage.setItem(
      "holdingsData",
      JSON.stringify(this.state.holdingsData)
    );
  }

  render() {
    return (
      <div>
        <WalletSummary
          data={this.state.holdingsData}
          settings={this.state.appSettings}
          price={1003.44}
          change={0.5}
        />
        {/* <h5>Portfolio</h5> */}
        <WalletTable
          data={this.state.holdingsData}
          settings={this.state.appSettings}
        />
        {/* <WatchingPage auth={this.auth} appSettings={this.state.appSettings} /> */}
      </div>
    );
  }
}

export default WalletPage;
