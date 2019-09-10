import React, { Component } from "react";
import { connect } from "react-redux";
import { Route, Switch } from "react-router-dom";
import Nav from "./components/common/Header";
import AboutPage from "./components/about/AboutPage";
import ManagePage from "./components/manage/ManagePage";
import Auth from "./components/auth/Auth";
import Loading from "./components/common/Loading";
import Callback from "./Callback";
import HomePage from "./components/home/HomePage";
import ProductsPage from "./components/products/ProductsPage";
import ManageProductPage from "./components/products/ManageProductPage";
import TransactionsPage from "./components/history/TransactionsPage";
import ManageTransactionPage from "./components/history/ManageTransactionPage";
import WalletPage from "./components/wallet/WalletPage";
import WatchListPage from "./components/watchlist/WatchlistPage";
import ProfilePage from "./components/profile/ProfilePage";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import PropTypes from "prop-types";
import * as profileActions from "./redux/actions/profileActions";
import { bindActionCreators } from "redux";

class App extends Component {
  constructor(props) {
    super(props);
    this.auth = new Auth(this.props.history);
  }
  state = {
    isLoaded: false,
    hasError: false,
    tokenRenewalComplete: false,
    appSettings: localStorage.getItem("userProfile")
      ? JSON.parse(localStorage.getItem("userProfile"))
      : {
          currency: "GBP",
          symbol: "£",
          refreshRate: 30
        },
    watchList: localStorage.getItem("watchList")
      ? JSON.parse(localStorage.getItem("watchList"))
      : []
  };

  //Load component data
  // fetchTickers = () => {
  //   var url = process.env["REACT_APP_PRICES_API"] + "/tickers/";
  //   // console.log("fetchTickers fetching: ", url);
  //   fetch(url)
  //     .then(res => res.json())
  //     .then(allTickers => {
  //       this.setState({
  //         tickers: allTickers
  //       });
  //       //Might not setstate here
  //     }) //.then(console.log('done'))
  //     .then(res => this.determineUniqueSectors());
  // };

  // determineUniqueSectors = () => {
  //   const sectors = this.state.tickers
  //     ? Array.from(new Set(this.state.tickers.map(t => t.sector)))
  //     : [];
  //   sectors.unshift(null);
  //   this.setState({ sectors: sectors });
  // };

  // filteredTickers = input => {
  //   const filteredTickers = this.state.tickers.filter(h => h.sector === input);
  //   const filterSUbscribedTickers = filteredTickers.filter(
  //     id => !this.state.subscribedTickers.includes(id.ticker)
  //   );
  //   this.setState({ filteredTickers: filterSUbscribedTickers });
  //   this.setState({ selectedSector: input });
  // };

  UNSAFE_componentWillMount() {
    // Check we've refreshed token
    this.auth.renewToken(() => {
      // update state
      this.setState({ tokenRenewalComplete: true });
      // load profile
      if (this.auth.isAuthenticated()) {
        this.loadProfile();
        // console.log("Authenticated profile load");
      }
    });
  }

  componentDidMount() {
    this.auth.renewToken(() => {
      this.setState({ tokenRenewalComplete: true });
      // if (this.auth.isAuthenticated()) {
      //   this.loadProfile();
      //   // console.log("Authenticated profile load");
      // }
    });
  }

  componentWillUnmount() {
    //Cache data back to localStorage if unmounted
    localStorage.setItem("userProfile", JSON.stringify(this.state.appSettings));
  }

  loadProfile() {
    // debugger;
    console.log("Loading user profile data from and authenticated user.");
    this.props.actions.loadProfile().catch(error => {
      alert("Loading Profile failed ..." + error);
    });
    // .then(console.log("Loaded profile"));
  }

  // async loadProfile() {
  //   console.log("Loading user profile data from and authenticated user.");
  //   var url = process.env["REACT_APP_PRICES_API"] + "/api/profile/user/";

  //   fetch(url, {
  //     method: "GET",
  //     headers: {
  //       Authorization: `Bearer ${this.auth.getAccessToken()}`,
  //       "Content-Type": "application/json"
  //     }
  //   })
  //     .then(response => {
  //       if (response.ok) return response;
  //       throw new Error("Network response was not ok.");
  //     })
  //     .then(response => response.json())
  //     .then(response => {
  //       // if (this._isMounted) {
  //       this.setState(
  //         {
  //           appSettings: response,
  //           watchList: response.watchList
  //         },
  //         () => {
  //           console.log("Back from api and state has been set!");
  //         }
  //       );
  //     })
  //     .catch(error => {
  //       this.setState({
  //         message: error.message
  //       });
  //     });
  // }

  async updateProfile() {
    var data = {
      currency: this.state.appSettings.currency,
      symbol: this.state.appSettings.symbol,
      refreshRate: this.state.appSettings.refreshRate,
      watchList: this.state.watchList
    };

    var url = process.env["REACT_APP_PRICES_API"] + "/api/profile/user/";
    fetch(url, {
      method: "PUT",
      body: JSON.stringify(data), // data can be `string` or {object}!
      headers: {
        Authorization: `Bearer ${this.auth.getAccessToken()}`,
        "Content-Type": "application/json"
      }
    })
      .then(response => {
        if (response.status) return response;
        throw new Error("Network response was not ok.");
      })
      // .then(response => response.json())
      .then(response => console.log("Success:", JSON.stringify(response)))
      .catch(error => console.error("Error:", error));
  }

  addTickerToWatchList = input => {
    if (input) {
      //Check it's not already in the list
      var resval = this.state.watchList.some(item => input === item);
      console.log("compare is ", resval);
      if (!resval) {
        this.setState(
          prevState => ({
            watchList: prevState.watchList.concat(input)
          }),
          () => {
            //Reload data in callback.
            console.log("Added ticker from watchlist", input);
            if (this.auth.isAuthenticated()) {
              this.updateProfile();
            }
          }
        );
      }
    }
  };

  removeTicker = input => {
    console.log("Removed ticker from watchlist", input);
    this.setState(
      prevState => ({
        watchList: prevState.watchList.filter(
          ticker => ticker.toLowerCase() !== input.toLowerCase()
        )
      }),
      () => {
        //Need to remove from the backend
        console.log("Removed ticker from watchlist" + input);
        if (this.auth.isAuthenticated()) {
          this.updateProfile();
        }
      }
    );
  };

  updateAppSettings = updatedAppSettings => {
    if (updatedAppSettings) {
      this.setState(
        prevState => ({
          appSettings: updatedAppSettings
        }),
        () => {
          //Reload data in callback.
          if (this.auth.isAuthenticated()) {
            this.updateProfile();
          }
        }
      );
    }
  };

  render() {
    const isLoggedIn = this.auth.isAuthenticated();

    if (this.state.hasError) {
      return <h1>Oops, there is an error!</h1>;
    }
    if (!this.state.tokenRenewalComplete) return <Loading />;

    return (
      <div>
        <Nav auth={this.auth} />

        <Switch>
          <Route
            exact
            path="/"
            render={props =>
              isLoggedIn ? (
                <WalletPage
                  auth={this.auth}
                  appSettings={this.state.appSettings}
                  {...props}
                />
              ) : (
                <HomePage auth={this.auth} {...props} />
              )
            }
          />
          <Route path="/about" component={AboutPage} />
          <Route path="/manage" render={() => <ManagePage />} />
          <Route
            path="/callback"
            render={props => <Callback auth={this.auth} {...props} />}
          />
          {/* <Route
            path="/product/:pid"
            render={props => (
              <ProductForm
                auth={this.auth}
                appSettings={this.state.appSettings}
                addTickerToWatchList={this.addTickerToWatchList}
                removeTickerFromWatchList={this.removeTicker}
                watchList={this.state.watchList}
                {...props}
              />
            )}
          /> */}
          {/* 
            <Route
              path="/transactions/:pid"
              render={props => <TransactionsPage auth={this.auth} {...props} />}
            /> */}
          <Route
            exact
            path="/transactions"
            render={props => <TransactionsPage auth={this.auth} {...props} />}
          />
          {/* <Route
            path="/transaction/:slug"
            render={props => (
              <ManageTransactionPage auth={this.auth} {...props} />
            )}
          /> */}
          <Route
            path="/transaction/:id"
            render={props => (
              <ManageTransactionPage auth={this.auth} {...props} />
            )}
          />
          <Route
            exact
            path="/transaction"
            render={props => (
              <ManageTransactionPage auth={this.auth} {...props} />
            )}
          />
          <Route
            path="/products"
            render={props => <ProductsPage auth={this.auth} {...props} />}
          />
          <Route
            path="/product/:ticker"
            render={props => <ManageProductPage auth={this.auth} {...props} />}
          />
          <Route
            path="/profile"
            render={props => (
              <ProfilePage
                auth={this.auth}
                appSettings={this.state.appSettings}
                updateProfile={this.updateAppSettings}
                {...props}
              />
            )}
          />
          <Route
            path="/wallet"
            render={props => (
              <WalletPage
                auth={this.auth}
                appSettings={this.state.appSettings}
                {...props}
              />
            )}
          />
          <Route
            path="/watching"
            render={props => (
              <WatchListPage
                auth={this.auth}
                appSettings={this.state.appSettings}
                watchList={this.state.watchList}
                onReload={this.reload}
                {...props}
              />
            )}
          />
          {/* <Route component={NotFound} /> */}
        </Switch>
        <ToastContainer autoClose={3000} hideProgressBar toas />
      </div>
    );
  }
}

App.propTypes = {
  actions: PropTypes.object.isRequired,
  loading: PropTypes.bool.isRequired
};

function mapStateToProps(state) {
  return {
    profile: state.profile,
    loading: state.apiCallsInProgress > 0
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: {
      loadProfile: bindActionCreators(profileActions.loadProfile, dispatch)
    }
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);
