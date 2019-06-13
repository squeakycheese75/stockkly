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
        : [],
      watchList: this.props.watchList
    };
    this.auth = this.props.auth;
  }

  async loadWatchData() {
    if (this.state.watchList && this.state.watchList.length) {
      var url =
        process.env["REACT_APP_PRICES_API"] +
        "/api/watchlist/" +
        this.state.watchList;

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
              watchData: response
            });
            console.log("Loaded data");
          }
        })
        .catch(error => {
          this.setState({
            message: error.message
          });
        });
    } else {
      this.setState({
        watchData: {}
      });
    }
  }

  componentDidMount() {
    this._isMounted = true;
    this.loadWatchData();

    // var refreshRate = this.state.appSettings.refreshRate * 1000;
    var refreshRate = 30000;
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
    localStorage.setItem("watchList", JSON.stringify(this.state.watchList));
  }

  componentWillReceiveProps(nextProps) {
    // console.log("componentWillReceiveProps");
    // console.log(nextProps);
    // if ((nextProps.watchList = [])) return;
    if (nextProps.watchList !== this.props.watchList) {
      console.log("Watchlist needs updating");
      this.setState(
        {
          watchList: nextProps.watchList
        },
        () => {
          this.loadWatchData();
        }
      );
    }
  }

  removeTicker = event => {
    this.props.removeTicker(event);
  };

  render() {
    function isEmpty(obj) {
      for (var key in obj) {
        if (obj.hasOwnProperty(key)) return false;
      }
      return true;
    }

    return (
      <div>
        {isEmpty(this.state.watchData) ? (
          <>
            <h1>Empty</h1>
          </>
        ) : (
          <WatchListTable
            data={this.state.watchData}
            onSubmit={this.removeTicker}
            settings={this.state.appSettings}
          />
        )}
      </div>
    );
  }
}

export default WatchListPage;
