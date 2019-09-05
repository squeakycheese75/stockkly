import React from "react";
import { connect } from "react-redux";
// import * as productActions from "../../redux/actions/productActions";
// import * as watchlistActions from "../../redux/actions/watchlistActions";
import * as profileActions from "../../redux/actions/profileActions";
import * as portfolioActions from "../../redux/actions/portfolioActions";
import PropTypes from "prop-types";
import { bindActionCreators } from "redux";
import Loading from "../common/Loading";
// import WatchListTable from "./components/WatchListTable";

class WatchlistPage extends React.Component {
  _isMounted = false;

  componentDidMount() {
    this._isMounted = true;
    const { portfolio, profile, actions } = this.props;
    if (portfolio.length === 0) {
      actions.loadPortfolio().catch(error => {
        alert("Loading Portfolio failed ..." + error);
      });
    }

    if (profile.length === 0) {
      actions.loadProfile().catch(error => {
        alert("Loading Profile failed ..." + error);
      });
    }
  }

  render() {
    return (
      <>
        {this.props.loading && !this._isMounted ? (
          <Loading />
        ) : (
          <>
            {/* <WatchListTable data={this.props.watchlist} /> */}
            Portfolio
          </>
        )}
      </>
    );
  }
}

WatchlistPage.propTypes = {
  actions: PropTypes.object.isRequired,
  portfolio: PropTypes.array.isRequired,
  profile: PropTypes.object.isRequired,
  loading: PropTypes.bool.isRequired
};

function mapStateToProps(state) {
  return {
    profile: state.profile,
    portfolio: state.portfolio,
    loading: state.apiCallsInProgress > 0
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: {
      loadProfle: bindActionCreators(profileActions.loadProfile, dispatch),
      loadPortfolio: bindActionCreators(
        portfolioActions.loadPortfolio,
        dispatch
      )
    }
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(WatchlistPage);
