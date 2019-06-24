import React from "react";
import { Alert } from "react-bootstrap";
import WatchListTable from "./components/WatchListTable";
import Loading from "../common/Loading";

class WatchListPage extends React.Component {
  _isMounted = false;

  constructor(props) {
    super(props);
    this.state = {
      appSettings: this.props.appSettings,
      watchData: localStorage.getItem("watchData")
        ? JSON.parse(localStorage.getItem("watchData"))
        : [],
      watchList: this.props.watchList,
      loading: true
    };
    this.auth = this.props.auth;
  }

  async loadWatchData() {
    // console.log("loading watchlist data with ", this.state.watchList);
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
              watchData: response,
              loading: false
            });
            // console.log("Loaded data");
          }
        })
        .catch(error => {
          this.setState({
            message: error.message
          });
        });
    } else {
      this.setState({
        watchData: {},
        loading: false
      });
    }
  }

  componentDidMount() {
    this._isMounted = true;
    this.loadWatchData();

    var refreshRate = this.state.appSettings.refreshRate * 1000;
    // var refreshRate = 30000;
    setInterval(() => {
      if (this._isMounted) {
        this.loadWatchData();
      }
    }, refreshRate);
  }

  componentWillUnmount() {
    this._isMounted = false;
    this.setState({ loading: false });
    //Cache data back to localStorage if unmounted
    localStorage.setItem("watchData", JSON.stringify(this.state.watchData));
    localStorage.setItem("watchList", JSON.stringify(this.state.watchList));
  }

  componentWillReceiveProps(nextProps) {
    // console.log("Received componentWillReceiveProps for in watchlist");
    if (nextProps.watchList !== this.props.watchList) {
      // console.log("watchList was updated");
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

    if (this.state.loading) return <Loading />;

    return (
      <div>
        {isEmpty(this.state.watchData) ? (
          <>
            <Alert key="empty" variant="secondary" as="h5">
              <Alert.Heading>Watchlist is empty!</Alert.Heading>
              <p>Go and find stuff to watch</p>
            </Alert>
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
