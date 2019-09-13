import React from "react";
import { connect } from "react-redux";
import * as productActions from "../../redux/actions/productActions";
import * as transactionActions from "../../redux/actions/transactionActions";
import PropTypes from "prop-types";
import { bindActionCreators } from "redux";
import Loading from "../common/Loading";
import ProductTable from "./components/ProductTable";

class ProductsPage extends React.Component {
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
  }

  render() {
    return (
      <>
        {this.props.loading ? (
          <Loading />
        ) : (
          <>
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
    products: state.products,
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
