import React from "react";
import { connect } from "react-redux";
import * as productActions from "../../redux/actions/productActions";
import PropTypes from "prop-types";
import { bindActionCreators } from "redux";
import Loading from "../common/Loading";
import ProductTable from "./ProductTable";

class ProductsPage extends React.Component {
  componentDidMount() {
    const { products, actions } = this.props;
    if (products.length === 0) {
      actions.loadProducts().catch(error => {
        alert("Loading Products failed ..." + error);
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
    loading: state.apiCallsInProgress > 0
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: {
      loadProducts: bindActionCreators(productActions.loadProducts, dispatch)
    }
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ProductsPage);
