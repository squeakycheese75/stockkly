import React from "react";
import { connect } from "react-redux";
import * as profileActions from "../../redux/actions/profileActions";
import * as walletActions from "../../redux/actions/walletActions";
import PropTypes from "prop-types";
import { bindActionCreators } from "redux";
import Loading from "../common/Loading";
import WalletTable from "./components/WalletTable";
import WalletSummary from "./components/WalletSummary";

class PortfolioPage extends React.Component {
  _isMounted = false;

  componentDidMount() {
    this._isMounted = true;
    const { wallet, profile, actions } = this.props;

    if (profile.length === 0) {
      actions.loadProfile().catch(error => {
        console.log("Loading Profile failed ..." + error);
      });
    }

    if (wallet.length === 0) {
      // debugger;
      actions.loadWallet().catch(error => {
        console.log("Loading Wallet failed ..." + error);
      });
    }

    var refreshRate = profile.refreshRate * 1000;

    setInterval(() => {
      if (this._isMounted) {
        actions.loadWallet().catch(error => {
          console.log("Loading Portfolio failed ..." + error);
        });
      }
    }, refreshRate);
  }

  componentWillUnmount() {
    this._isMounted = false;
    localStorage.setItem("wallet", JSON.stringify(this.props.wallet));
  }

  render() {
    return (
      <>
        {this.props.loading && !this._isMounted ? (
          <Loading />
        ) : (
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
        )}
      </>
    );
  }
}

PortfolioPage.propTypes = {
  actions: PropTypes.object.isRequired,
  wallet: PropTypes.array.isRequired,
  profile: PropTypes.object.isRequired,
  loading: PropTypes.bool.isRequired
};

function mapStateToProps(state) {
  return {
    profile: state.profile,
    wallet: state.wallet,
    loading: state.apiCallsInProgress > 0
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: {
      loadProfle: bindActionCreators(profileActions.loadProfile, dispatch),
      loadWallet: bindActionCreators(walletActions.loadWallet, dispatch)
    }
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PortfolioPage);
