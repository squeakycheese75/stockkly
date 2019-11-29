import React from "react";
import { connect } from "react-redux";
import * as watchlistActions from "../../redux/actions/watchlistActions";
import * as profileActions from "../../redux/actions/profileActions";
import PropTypes from "prop-types";
import { bindActionCreators } from "redux";
import Loading from "../common/Loading";
import WatchListTable from "./components/WatchListTable";
import HowToWatchlist from "../common/HowToWatchlist";
import { Helmet } from "react-helmet";
// import WatchBar from "../common/WatchBar";

class WatchlistPage extends React.Component {
  _isMounted = false;

  componentDidMount() {
    const { profile, actions } = this.props;

    if (profile.length === 0) {
      actions.loadProfile().catch(error => {
        console.log("Loading Profile failed ..." + error);
      });
    }

    actions
      .loadWatchlist(profile.watchList)
      .then(
        localStorage.setItem("watchlist", JSON.stringify(this.props.watchlist))
      )
      .catch(error => {
        console.log("Loading Watchlist failed ..." + error);
      });

    const refreshRate = profile.refreshRate * 1000;

    setInterval(() => {
      if (this._isMounted) {
        actions
          .loadWatchlist(profile.watchList)
          .then(
            localStorage.setItem(
              "watchlist",
              JSON.stringify(this.props.watchlist)
            )
          )
          .catch(error => {
            console.log("Loading Watchlist failed ..." + error);
          });
      }
    }, refreshRate);
    this._isMounted = true;
  }

  componentWillUnmount() {
    this._isMounted = false;
    localStorage.setItem("watchlist", JSON.stringify(this.props.watchlist));
  }

  render() {
    return (
      <div>
        <Helmet>
          <title>Stockkly wealth tracker</title>
          <meta
            name="description"
            content="Watchlist for live tracking your favourite Stocks, Funds, Crypto, Fx, Gold, Silver and composite prices."
          />
        </Helmet>
        {/* {this.props.profile.devmode ? (
          <WatchBar prices={this.props.watchbar} />
        ) : null} */}
        {this.props.loading && !this._isMounted ? (
          <Loading />
        ) : this.props.watchlist.length > 0 ? (
          <>
            <WatchListTable data={this.props.watchlist} />
          </>
        ) : (
          <>
            <HowToWatchlist />
          </>
        )}
      </div>
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
      loadProfile: bindActionCreators(profileActions.loadProfile, dispatch),
      loadWatchlist: bindActionCreators(
        watchlistActions.loadWatchlistWithTickers,
        dispatch
      )
    }
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(WatchlistPage);
