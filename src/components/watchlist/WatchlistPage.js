import React from "react";
import { connect } from "react-redux";
import * as productActions from "../../redux/actions/productActions";
import * as priceActions from "../../redux/actions/priceActions";
import * as profileActions from "../../redux/actions/profileActions";
import PropTypes from "prop-types";
import { bindActionCreators } from "redux";
import Loading from "../common/Loading";
import WatchListTable from "./components/WatchListTable";

class WatchlistPage extends React.Component {
  componentDidMount() {
    debugger;
    const { profile, products, prices, actions } = this.props;
    if (products.length === 0) {
      actions.loadProducts().catch(error => {
        alert("Loading Products failed ..." + error);
      });
    }
    if (prices.length === 0) {
      actions.loadPrices().catch(error => {
        alert("Loading Prices failed ..." + error);
      });
    }
    if (profile.length === 0) {
      actions.loadProfle.catch(error => {
        alert("Loading Profile failed ..." + error);
      });
    }
  }

  render() {
    return (
      <>
        {this.props.loading}
        <h2>Watchlist</h2>
        {this.props.loading ? (
          <Loading />
        ) : (
          <>
            <WatchListTable data={watchData} />
          </>
        )}
      </>
    );
  }
}

WatchlistPage.propTypes = {
  actions: PropTypes.object.isRequired,
  products: PropTypes.array.isRequired,
  prices: PropTypes.array.isRequired,
  profile: PropTypes.object.isRequired,
  watchData: PropTypes.array.isRequired,
  loading: PropTypes.bool.isRequired
};

function mapStateToProps(state) {
  return {
    profile: state.profile,
    products: state.products,
    prices: state.prices,
    // watchData: [{}, {}],
    watchData:
      state.profile.watchList.length === 0
        ? []
        : state.profile.watchList.map(item => {
            return {
              ...item,
              price: state.price.find(p => p.ticker == item).price
              // productName: state.products.find(
              //   p => p.id === transaction.productId
              // ).name,
              // ticker: state.products.find(p => p.id === transaction.productId)
              //   .ticker
            };
          }),
    loading: state.apiCallsInProgress > 0
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: {
      loadProfle: bindActionCreators(profileActions.loadProfile, dispatch),
      loadProducts: bindActionCreators(productActions.loadProducts, dispatch),
      loadPrices: bindActionCreators(priceActions.loadPrices, dispatch)
    }
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(WatchlistPage);
