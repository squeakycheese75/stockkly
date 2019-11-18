import React from "react";
import { connect } from "react-redux";
import * as productActions from "../../redux/actions/productActions";
import * as transactionActions from "../../redux/actions/transactionActions";
import PropTypes from "prop-types";
import { bindActionCreators } from "redux";
import Loading from "../common/Loading";
import ProductTable from "./components/ProductTable";
import { Helmet } from "react-helmet";

class ProductsPage extends React.Component {
  componentDidMount() {
    const { transactions, products, actions, auth } = this.props;

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
  }

  render() {
    return (
      <div>
        <Helmet>
          <title>Stockkly Wealth tracker - Products</title>
          <meta
            name="description"
            content="Search for you favourite Stocks, Funds, Crypto, Fx, Gold, Silver and derived prices to track live."
          />
        </Helmet>
        {this.props.loading ? (
          <Loading />
        ) : (
          <>
            <ProductTable data={this.props.products} />
          </>
        )}
      </div>
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

export default connect(mapStateToProps, mapDispatchToProps)(ProductsPage);
