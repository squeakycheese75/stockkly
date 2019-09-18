import React from "react";
import { connect } from "react-redux";
import * as profileActions from "../../redux/actions/profileActions";
import * as walletActions from "../../redux/actions/walletActions";
import PropTypes from "prop-types";
import { bindActionCreators } from "redux";
import Loading from "../common/Loading";
import WalletTable from "./components/WalletTable";
import WalletSummary from "./components/WalletSummary";

class WalletPage extends React.Component {
  componentDidMount() {
    const { profile, actions } = this.props;

    if (profile.length === 0) {
      actions.loadProfile().catch(error => {
        console.log("Loading Profile failed ..." + error);
      });
    }

    //Force wallet load because we default to cache
    actions.loadWallet().catch(error => {
      console.log("Loading Wallet failed ..." + error);
    });

    var refreshRate = profile.refreshRate * 1000;

    setInterval(() => {
      if (this._isMounted) {
        actions.loadWallet().catch(error => {
          console.log("Loading Portfolio failed ..." + error);
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
      <>
        {!this._isMounted || this.props.loading ? (
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

WalletPage.propTypes = {
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
)(WalletPage);
