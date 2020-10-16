import React from 'react';
import { connect } from 'react-redux';
import * as watchlistActions from '../../redux/actions/watchlistActions';
import * as profileActions from '../../redux/actions/profileActions';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import Loading from '../common/Loading';
import WatchListTable from './components/WatchListTable';
import HowToWatchlist from '../common/HowToWatchlist';
import { setItem } from '../../localStorageWrapper';
import { Helmet } from 'react-helmet';

class WatchlistPage extends React.Component {
  _isMounted = false;

  componentDidMount() {
    const { profile, actions } = this.props;

    if (profile.length === 0) {
      actions.loadProfile().catch((error) => {
        console.error('Loading Profile failed ...' + error);
      });
    }

    actions
      .loadWatchlist(profile.watchList)
      .then(setItem('watchlist', JSON.stringify(this.props.watchlist)))
      .catch((error) => {
        console.error('Loading Watchlist failed ...' + error);
      });

    const refreshRate = profile.refreshRate * 1000;

    setInterval(() => {
      if (this._isMounted) {
        actions
          .loadWatchlist(profile.watchList)
          .then(setItem('watchlist', JSON.stringify(this.props.watchlist)))
          .catch((error) => {
            console.error('Loading Watchlist failed ...' + error);
          });
      }
    }, refreshRate);
    this._isMounted = true;
  }

  componentWillUnmount() {
    this._isMounted = false;
    setItem('watchlist', JSON.stringify(this.props.watchlist));
  }

  render() {
    return (
      <div>
      <Helmet>
        <title>Watchlist - Free, Real-Time, Wealth Tracker for the modern portfolio. (Crypto, Stocks, etc).</title>
        <meta name="description" content="Track your portfolio value in near real-time!
                    Add shares (FTSE, NASDAQ), Crypto, Gold, Silver, composites (FAANG)
                    Supports valuations in EUR, USD or GBP.
                    Includes up-to-date forex prices, so you can get a single valuation in the currency of you choice." />
      </Helmet>
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
  loading: PropTypes.bool.isRequired,
};

function mapStateToProps(state) {
  return {
    profile: state.profile,
    watchlist: state.watchlist,
    loading: state.apiCallsInProgress > 0,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: {
      loadProfile: bindActionCreators(profileActions.loadProfile, dispatch),
      loadWatchlist: bindActionCreators(
        watchlistActions.loadWatchlistWithTickers,
        dispatch
      ),
    },
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(WatchlistPage);
