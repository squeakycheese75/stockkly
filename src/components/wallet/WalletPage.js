import React from "react";
import WalletSummary from "./components/WalletSummary";
import WalletTable from "./components/WalletTable";
import { Alert } from "react-bootstrap";
import Loading from "../common/Loading";

class WalletPage extends React.Component {
  _isMounted = false;

  constructor(props) {
    super(props);
    this.state = {
      appSettings: this.props.appSettings,
      holdingsData: localStorage.getItem("holdingsData")
        ? JSON.parse(localStorage.getItem("holdingsData"))
        : [],
      loading: true
    };
    this.auth = this.props.auth;
  }

  loadWalletData() {
    var url = process.env["REACT_APP_PRICES_API"] + "/api/wallet/holdings/";
    // console.log("Loading WalletData")
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
            holdingsData: response,
            loading: false
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
        // console.log("Reloading wallet data!");
        this.loadWalletData();
      }
    }, refreshRate);
  }

  componentWillUnmount() {
    this._isMounted = false;
    this.setState({ loading: false });

    //Cache data back to localStorage if unmounted
    localStorage.setItem(
      "holdingsData",
      JSON.stringify(this.state.holdingsData)
    );
  }

  render() {
    if (this.state.loading) return <Loading />;

    return (
      <div>
        {this.state.holdingsData === undefined ? (
          <>
            <Alert key="empty" variant="secondary" as="h5">
              <Alert.Heading>Portfolio is empty!</Alert.Heading>
              <p>Go and find stuff to add</p>
            </Alert>
          </>
        ) : this.state.holdingsData.length > 0 ? (
          <>
            <WalletSummary
              data={this.state.holdingsData}
              settings={this.state.appSettings}
            />
            <WalletTable
              data={this.state.holdingsData}
              settings={this.state.appSettings}
            />
          </>
        ) : (
          <>
            <Alert key="empty" variant="secondary" as="h5">
              <Alert.Heading>Portfolio is empty!</Alert.Heading>
              <p>Go and find stuff to add</p>
            </Alert>
          </>
        )}
      </div>
    );
  }
}

export default WalletPage;
