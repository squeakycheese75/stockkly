import React, { Component } from "react";
import { connect } from "react-redux";
import { Route, Switch } from "react-router-dom";
import Nav from "./components/common/Header";
import AboutPage from "./components/about/AboutPage";
import Auth from "./components/auth/Auth";
import Loading from "./components/common/Loading";
import Callback from "./Callback";
import HomePage from "./components/home/HomePage";
import ProductsPage from "./components/products/ProductsPage";
import ManageProductPage from "./components/products/ProductPage";
import TransactionsPage from "./components/transactions/TransactionsPage";
import ManageTransactionPage from "./components/transactions/ManageTransactionPage";
import WalletPage from "./components/wallet/WalletPage";
import WatchListPage from "./components/watchlist/WatchlistPage";
import ProfilePage from "./components/profile/ProfilePage";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import PropTypes from "prop-types";
import * as profileActions from "./redux/actions/profileActions";
import { bindActionCreators } from "redux";
import styles from "./App.css";

class App extends Component {
  constructor(props) {
    super(props);
    this.auth = new Auth(this.props.history);
  }
  state = {
    isLoaded: false,
    hasError: false,
    tokenRenewalComplete: false
  };

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
      if (this.auth.isAuthenticated()) {
        this.props.actions.loadProfile().catch(error => {
          console.log("Loading profile failed" + error);
        });
      }
    });
  }

  componentWillUnmount() {
    //Cache data back to localStorage if unmounted
    localStorage.setItem("userProfile", JSON.stringify(this.state.appSettings));
  }

  loadProfile() {
    // console.log("Loading user profile data from and authenticated user.");
    this.props.actions.loadProfile().catch(error => {
      console.log("Loading Profile failed ..." + error);
    });
  }

  render() {
    const isLoggedIn = this.auth.isAuthenticated();

    if (this.state.hasError) {
      return <h1>Oops, there is an error!</h1>;
    }
    if (!this.state.tokenRenewalComplete) return <Loading />;

    return (
      <div className={styles}>
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
          <Route
            path="/callback"
            render={props => <Callback auth={this.auth} {...props} />}
          />

          <Route
            exact
            path="/transactions"
            render={props => <TransactionsPage auth={this.auth} {...props} />}
          />
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
            render={props => <ProfilePage auth={this.auth} {...props} />}
          />
          <Route
            path="/wallet"
            render={props => <WalletPage auth={this.auth} {...props} />}
          />
          <Route
            path="/watching"
            render={props => <WatchListPage auth={this.auth} {...props} />}
          />
        </Switch>
        <ToastContainer
          autoClose={3000}
          hideProgressBar
          position="bottom-right"
        />
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
