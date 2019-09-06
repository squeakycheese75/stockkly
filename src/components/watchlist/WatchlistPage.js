import React from "react";
import { connect } from "react-redux";
import * as watchlistActions from "../../redux/actions/watchlistActions";
import * as profileActions from "../../redux/actions/profileActions";
import PropTypes from "prop-types";
import { bindActionCreators } from "redux";
import Loading from "../common/Loading";
import WatchListTable from "./components/WatchListTable";

class WatchlistPage extends React.Component {
  _isMounted = false;

  componentDidMount() {
    this._isMounted = true;
    const { watchlist, profile, actions } = this.props;

    if (watchlist.length === 0) {
      actions.loadWatchlist().catch(error => {
        console.log("Loading Watchlist failed ..." + error);
      });
    }

    if (profile.length === 0) {
      actions.loadProfile().catch(error => {
        console.log("Loading Profile failed ..." + error);
      });
    }

    var refreshRate = profile.refreshRate * 1000;

    setInterval(() => {
      if (this._isMounted) {
        actions.loadWatchlist().catch(error => {
          // alert("Loading Watchlist failed ..." + error);
          console.log("Loading Watchlist failed ..." + error);
        });
      }
    }, refreshRate);
  }

  componentWillUnmount() {
    this._isMounted = false;
    localStorage.setItem("watchlist", JSON.stringify(this.props.watchlist));
  }

  render() {
    return (
      <>
        {this.props.loading && !this._isMounted ? (
          <Loading />
        ) : (
          <>
            <WatchListTable data={this.props.watchlist} />
          </>
        )}
      </>
    );
  }
}

WatchlistPage.propTypes = {
  actions: PropTypes.object.isRequired,
  watchlist: PropTypes.array.isRequired,
  profile: PropTypes.object.isRequired,
  loading: PropTypes.bool.isRequired
};

function mapStateToProps(state) {
  return {
    profile: state.profile,
    watchlist: state.watchlist,
    loading: state.apiCallsInProgress > 0
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: {
      loadProfle: bindActionCreators(profileActions.loadProfile, dispatch),
      loadWatchlist: bindActionCreators(
        watchlistActions.loadWatchlist,
        dispatch
      )
    }
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(WatchlistPage);
