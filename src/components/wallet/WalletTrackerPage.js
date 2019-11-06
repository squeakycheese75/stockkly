import React from "react";
import { connect } from "react-redux";
// / import * as profileActions from "../../redux/actions/profileActions";
import * as walletHistoricalActions from "../../redux/actions/walletHistoricalActions";
import PropTypes from "prop-types";
import { bindActionCreators } from "redux";
import Loading from "../common/Loading";
import WalletChart from "./components/WalletChart";

class WalletTrackerPage extends React.Component {
  componentDidMount() {
    const { actions } = this.props;

    // if (profile.length === 0) {
    //   actions.loadProfile().catch(error => {
    //     console.log("Loading Profile failed ..." + error);
    //   });
    // }

    //Force wallet load because we default to cache
    actions
      .loadWalletChart()
      //   .then(localStorage.setItem("wallet", JSON.stringify(this.props.wallet)))
      .catch(error => {
        console.log("Loading WalletChart failed ..." + error);
      });

    this._isMounted = true;
  }

  componentWillUnmount() {
    this._isMounted = false;
    // localStorage.setItem("wallet", JSON.stringify(this.props.wallet));
  }

  render() {
    return this.props.loading && !this._isMounted ? (
      <Loading />
    ) : (
      <>
        <WalletChart
          chartData={{
            x: this.props.walletChart
              ? Object.keys(this.props.walletChart)
              : [],
            y: this.props.walletChart
              ? Object.values(this.props.walletChart)
              : []
          }}
        />
      </>
    );
  }
}

WalletTrackerPage.propTypes = {
  actions: PropTypes.object.isRequired,
  walletChart: PropTypes.object.isRequired,
  loading: PropTypes.bool.isRequired
};

function mapStateToProps(state) {
  return {
    walletChart: state.walletChart,
    loading: state.apiCallsInProgress > 0
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: {
      loadWalletChart: bindActionCreators(
        walletHistoricalActions.loadWalletChart,
        dispatch
      )
    }
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(WalletTrackerPage);
