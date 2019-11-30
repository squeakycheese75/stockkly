import React from "react";
import { connect } from "react-redux";
import * as profileActions from "../../redux/actions/profileActions";
import * as walletActions from "../../redux/actions/walletActions";
import * as watchbarActions from "../../redux/actions/watchBarActions";
import PropTypes from "prop-types";
import { bindActionCreators } from "redux";
import Loading from "../common/Loading";
import WalletTable from "./components/WalletTable";
import WalletSummary from "./components/WalletSummary";
import HowToWallet from "../common/HowToWallet";
import { Helmet } from "react-helmet";
import WatchBar from "../common/WatchBar";

class WalletPage extends React.Component {
  componentDidMount() {
    const { profile, actions } = this.props;
    // const watchBarList = ["BTC:USD", "FTSE:100"];
    // const watchBarList = ["BTC:USD", "FTSE:100", "GBP:USD", "GBP:EUR"];
    const watchBarList = ["BTC:USD", "LTC:USD", "GBP:USD", "GBP:EUR"];

    if (profile.length === 0) {
      actions.loadProfile().catch(error => {
        console.log("Loading Profile failed ..." + error);
      });
    }

    //Force wallet load because we default to cache
    actions
      .loadWallet()
      .then(localStorage.setItem("wallet", JSON.stringify(this.props.wallet)))
      .catch(error => {
        console.log("Loading Wallet failed ..." + error);
      });

    actions.loadWatchbar(watchBarList).catch(error => {
      console.log("Loading WatchBarList failed ..." + error);
    });

    var refreshRate = profile.refreshRate * 1000;

    setInterval(() => {
      if (this._isMounted) {
        actions
          .loadWallet()
          .then(
            localStorage.setItem("wallet", JSON.stringify(this.props.wallet))
          )
          .catch(error => {
            console.log("Loading Portfolio failed ..." + error);
          });

        actions.loadWatchbar(watchBarList).catch(error => {
          console.log("Loading WatchBarList failed ..." + error);
        });
      }
    }, refreshRate);

    this._isMounted = true;
  }

  componentWillUnmount() {
    this._isMounted = false;
    localStorage.setItem("wallet", JSON.stringify(this.props.wallet));
  }

  render() {
    return (
      <div>
        <Helmet>
          <title>Stockkly wealth tracker</title>
          <meta
            name="description"
            content="Wealth tracker for live tracking your Stocks, Funds, Crypto, Fx, Gold, Silver and composite prices."
          />
        </Helmet>
        {this.props.profile.devmode ? (
          <WatchBar prices={this.props.watchbar} />
        ) : null}
        {this.props.loading && !this._isMounted ? (
          <Loading />
        ) : this.props.wallet.length > 0 ? (
          <>
            <WalletSummary
              data={this.props.wallet}
              profile={this.props.profile}
            />
            <WalletTable
              data={this.props.wallet}
              profile={this.props.profile}
            />
          </>
        ) : (
          <>
            <HowToWallet />
          </>
        )}
      </div>
    );
  }
}

WalletPage.propTypes = {
  actions: PropTypes.object.isRequired,
  wallet: PropTypes.array.isRequired,
  watchbar: PropTypes.array.isRequired,
  profile: PropTypes.object.isRequired,
  loading: PropTypes.bool.isRequired
};

function mapStateToProps(state) {
  return {
    profile: state.profile,
    wallet: state.wallet,
    watchbar: state.watchbar,
    loading: state.apiCallsInProgress > 0
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: {
      loadProfle: bindActionCreators(profileActions.loadProfile, dispatch),
      loadWallet: bindActionCreators(walletActions.loadWallet, dispatch),
      loadWatchbar: bindActionCreators(watchbarActions.loadWatchbar, dispatch)
    }
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(WalletPage);
