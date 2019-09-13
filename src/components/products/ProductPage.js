import React from "react";
import { connect } from "react-redux";
import * as productActions from "../../redux/actions/productActions";
import * as transactionActions from "../../redux/actions/transactionActions";
import * as priceActions from "../../redux/actions/priceActions";
import PropTypes from "prop-types";
import { bindActionCreators } from "redux";
import Loading from "../common/Loading";
import ProductSummary from "./components/ProductSummary";

const newProduct = {
  id: null
};

class ProductPage extends React.Component {
  componentDidMount() {
    const { transactions, products, actions } = this.props;

    if (products.length === 0) {
      actions.loadProducts().catch(error => {
        console.log("Loading Products failed ..." + error);
      });
    }

    if (transactions.length === 0) {
      actions.loadTransactions().catch(error => {
        console.log("Loading Transactions failed ..." + error);
      });
    }

    const ticker = this.props.match.params.ticker;
    if (ticker) {
      actions.loadPrice(ticker).catch(error => {
        console.log("Loading Price failed ..." + error);
      });
    }
  }

  render() {
    return (
      <>
        {this.props.loading ? (
          <Loading />
        ) : (
          <>
            <ProductSummary
              product={this.props.product}
              price={this.props.price}
            />
          </>
        )}
      </>
    );
  }
}

ProductPage.propTypes = {
  product: PropTypes.object.isRequired,
  actions: PropTypes.object.isRequired,
  products: PropTypes.array.isRequired,
  transactions: PropTypes.array.isRequired,
  loading: PropTypes.bool.isRequired,
  price: PropTypes.object.isRequired
};

export function getProductByTicker(products, ticker) {
  return products.find(product => product.ticker === ticker) || null;
}

function mapStateToProps(state, ownProps) {
  const ticker = ownProps.match.params.ticker;
  const product =
    ticker && state.products.length > 0
      ? getProductByTicker(state.products, ticker)
      : newProduct;

  const filteredTransactions = state.transactions.filter(
    transaction => transaction.productId === product.id
  );

  return {
    products: state.products,
    transactions:
      filteredTransactions.length === 0
        ? []
        : filteredTransactions.map(transaction => {
            return {
              ...transaction,
              productName: state.products.find(
                p => p.id === transaction.productId
              ).name,
              ticker: state.products.find(p => p.id === transaction.productId)
                .ticker
            };
          }),
    loading: state.apiCallsInProgress > 0,
    product,
    price: state.price
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
      loadPrice: bindActionCreators(priceActions.loadPrice, dispatch)
    }
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ProductPage);
