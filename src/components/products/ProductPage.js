import React from "react";
import { connect } from "react-redux";
import * as productActions from "../../redux/actions/productActions";
import * as transactionActions from "../../redux/actions/transactionActions";
import * as priceActions from "../../redux/actions/priceActions";
import * as pricesHistoricalActions from "../../redux/actions/pricesHistoricalActions";
import * as profileActions from "../../redux/actions/profileActions";
import PropTypes from "prop-types";
import { bindActionCreators } from "redux";
import Loading from "../common/Loading";
import ProductForm from "./ProductForm";
import { toast } from "react-toastify";

class ProductPage extends React.Component {
  updateProfile = profile => {
    this.props.actions
      .saveProfile(profile)
      .then(toast.info("Watchlist updated"))
      .catch(error => {
        toast.error("Profile update has Failed! " + error.message, {
          autoClose: false
        });
      });
  };

  handleDelete = transaction => {
    toast.info("Transaction Deleted!");
    this.props.actions.deleteTransaction(transaction).catch(error => {
      toast.error("Transaction delete has Failed! " + error.message, {
        autoClose: false
      });
    });
  };

  componentDidMount() {
    const { transactions, products, actions, profile, auth } = this.props;

    if (profile.length === 0) {
      actions.loadProfile().catch(error => {
        console.log("Loading Products failed ..." + error);
      });
    }

    if (products.length === 0) {
      actions.loadProducts().catch(error => {
        console.log("Loading Products failed ..." + error);
      });
    }

    if (auth.isAuthenticated()) {
      if (transactions.length === 0) {
        actions.loadTransactions().catch(error => {
          console.log("Loading Transactions failed ..." + error);
        });
      }
    }

    // console.log(this.props.match.params);
    let ticker = this.props.match.params.ticker;
    if (ticker) {
      actions.loadPrice(ticker).catch(error => {
        console.log("Loading Price failed ..." + error);
      });

      actions.loadPricesHistorical(ticker).catch(error => {
        console.log("Loading PricesHistorical failed ..." + error);
      });
      // !this.props.product ||
    }
  }

  componentWillUnmount() {
    const { actions } = this.props;
    actions.resetPrice();
    actions.resetPricesHistorical();
  }

  render() {
    return (
      <>
        {this.props.loading || Object.keys(this.props.product).length === 0 ? (
          <Loading />
        ) : (
          <ProductForm
            profile={this.props.profile}
            transactions={this.props.transactions}
            product={this.props.product}
            price={this.props.price}
            ticker={this.props.match.params.ticker}
            pricesHistorical={this.props.pricesHistorical}
            onDelete={this.handleDelete}
            updateProfile={this.updateProfile}
            auth={this.props.auth}
          />
        )}
      </>
    );
  }
}

ProductPage.propTypes = {
  product: PropTypes.object.isRequired,
  actions: PropTypes.object.isRequired,
  products: PropTypes.array.isRequired,
  profile: PropTypes.object.isRequired,
  transactions: PropTypes.array.isRequired,
  loading: PropTypes.bool.isRequired,
  price: PropTypes.object.isRequired,
  pricesHistorical: PropTypes.object.isRequired
};

export function getProductByTicker(products, ticker) {
  return products.find(product => product.ticker === ticker) || null;
}

function mapStateToProps(state, ownProps) {
  const ticker = ownProps.match.params.ticker;
  const product =
    ticker && state.products.length > 0
      ? getProductByTicker(state.products, ticker)
      : {};

  const filteredTransactions = state.transactions.filter(
    transaction => transaction.ticker === product.ticker
  );

  return {
    products: state.products,
    transactions:
      filteredTransactions.length === 0
        ? []
        : filteredTransactions
            .filter(value => JSON.stringify(value) !== "{}")
            .map(transaction => {
              return {
                ...transaction,
                productName: state.products.find(
                  a => a.ticker === transaction.ticker
                ).name
              };
            }),
    product,
    price: state.price,
    profile: state.profile,
    pricesHistorical: state.pricesHistorical,
    loading: state.apiCallsInProgress > 0
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: {
      loadProducts: bindActionCreators(productActions.loadProducts, dispatch),
      loadTransactions: bindActionCreators(
        transactionActions.loadTransactions,
        dispatch
      ),
      loadProfile: bindActionCreators(profileActions.loadProfile, dispatch),
      loadPrice: bindActionCreators(priceActions.loadPrice, dispatch),
      deleteTransaction: bindActionCreators(
        transactionActions.deleteTransaction,
        dispatch
      ),
      loadPricesHistorical: bindActionCreators(
        pricesHistoricalActions.loadPricesHistorical,
        dispatch
      ),
      resetPrice: bindActionCreators(priceActions.resetPrice, dispatch),
      resetPricesHistorical: bindActionCreators(
        pricesHistoricalActions.resetPricesHistorical,
        dispatch
      ),
      saveProfile: bindActionCreators(profileActions.saveProfile, dispatch)
      // removeTicker: bindActionCreators(profileActions.removeTicker, dispatch)
    }
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ProductPage);
