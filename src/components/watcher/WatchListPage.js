import React from "react";
import WatchListTable from "./components/WatchListTable";
// import LoginReminder from "./LoginReminder";

class WatchListPage extends React.Component {
  _isMounted = false;

  constructor(props) {
    super(props);
    this.state = {
      appSettings: this.props.appSettings,
      watchData: localStorage.getItem("watchData")
        ? JSON.parse(localStorage.getItem("watchData"))
        : []
    };
    this.auth = this.props.auth;
  }

  async loadWatchData() {
    var url = process.env["REACT_APP_PRICES_API"] + "/api/public/watching/";

    console.log(url);

    fetch(url, {
      method: "GET",
      headers: {
        // Authorization: `Bearer ${this.auth.getAccessToken()}`,
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
            watchData: response.message
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
      this.loadWatchData();
    } else {
    }
    // Sets the data refresh rate
    var refreshRate = this.state.appSettings.refreshRate * 1000;
    setInterval(() => {
      if (this._isMounted) {
        this.loadWatchData();
      }
    }, refreshRate);
  }

  componentWillUnmount() {
    this._isMounted = false;
    //Cache data back to localStorage if unmounted
    localStorage.setItem("watchData", JSON.stringify(this.state.watchData));
  }

  render() {
    // const { data } = this.props;
    // const { isAuthenticated } = this.props.auth;
    // const { history } = this.history;

    return (
      <div>
        {/* <h5>.....Watchlist.....</h5> */}
        <WatchListTable
          data={this.state.watchData}
          settings={this.state.appSettings}
        />
      </div>
    );
  }
}

export default WatchListPage;
