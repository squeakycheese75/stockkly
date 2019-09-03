import React from "react";
import { connect } from "react-redux";
import * as productActions from "../../redux/actions/productActions";
import * as transactionActions from "../../redux/actions/transactionActions";
import PropTypes from "prop-types";
import { bindActionCreators } from "redux";
import Loading from "../common/Loading";
import ProductTable from "./ProductTable";

class ProductsPage extends React.Component {
  componentDidMount() {
    const { transactions, products, actions } = this.props;
    if (products.length === 0) {
      actions.loadProducts().catch(error => {
        alert("Loading Products failed ..." + error);
      });
    }

    if (transactions.length === 0) {
      actions.loadTransactions().catch(error => {
        alert("Loading Transactions failed ..." + error);
      });
    }
  }

  render() {
    return (
      <>
        {this.props.loading}
        <h2>Products</h2>
        {this.props.loading ? (
          <Loading />
        ) : (
          <>
            {/* <ProductList products={this.props.products} />} */}
            <ProductTable data={this.props.products} />
          </>
        )}
      </>
    );
  }
}

ProductsPage.propTypes = {
  actions: PropTypes.object.isRequired,
  products: PropTypes.array.isRequired,
  transactions: PropTypes.array.isRequired,
  loading: PropTypes.bool.isRequired
};

function mapStateToProps(state) {
  return {
    // transactions:
    //   state.products.length === 0
    //     ? []
    //     : state.transactions.map(transaction => {
    //         return {
    //           ...transaction,
    //           productName: state.products.find(
    //             p => p.id === transaction.productId
    //           ).name,
    //           ticker: state.products.find(p => p.id === transaction.productId)
    //             .ticker
    //         };
    //       }),
    products: state.products,
    // price: state.products.map(product => {
    //   return {
    //     ...product,
    //     price: state.prices.find(p => p.ticker === product.ticker)
    //   };
    // }),
    // transactions: state.transactions.map(product => {
    //   return {
    //     ...product,
    //     price: state.prices.find(p => p.ticker === product.ticker)
    //   };
    // }),
    // transactions: state.products.map(product => {
    //   return {
    //     ...product,
    //     price: state.transactions.find(t => t.ticker === product.ticker)
    //   };
    // }),
    transactions: state.transactions,
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
      )
    }
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ProductsPage);
