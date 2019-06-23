import React from "react";
import WalletSummary from "./components/WalletSummary";
import WalletTable from "./components/WalletTable";
import { Alert } from "react-bootstrap";
// import WatchingPage from "../watcher/WatchingPage";
import Loading from "../common/Loading";

class WalletPage extends React.Component {
  _isMounted = false;
  _isLoaded = false;

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
          // this._isLoaded = true;
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
      this._isLoaded = true;
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
    this._isLoaded = true;
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
    const data = this.state.holdingsData;
    function isEmpty(obj) {
      for (var key in obj) {
        if (obj.hasOwnProperty(key)) return false;
      }
      return true;
    }

    if (!this._isLoaded) return <Loading />;

    return (
      <div>
        {isEmpty(this.state.watchData) ? (
          <>
            <Alert key="empty" variant="secondary" as="h5">
              <Alert.Heading>Portfolio is empty!</Alert.Heading>
              <p>Go and find stuff to add</p>
            </Alert>
          </>
        ) : (
          <>
            <WalletSummary data={data} settings={this.state.appSettings} />
            <WalletTable data={data} settings={this.state.appSettings} />
          </>
        )}
      </div>
    );
  }
}

export default WalletPage;
