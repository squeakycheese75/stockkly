import React from "react";
import { connect } from "react-redux";
// import * as transactionActions from "../../redux/actions/transactionActions";
import * as productActions from "../../redux/actions/productActions";
import PropTypes from "prop-types";
import { bindActionCreators } from "redux";
// import TransactionList from "./TransactionsList";
// import { LinkContainer } from "react-router-bootstrap";
// import { Nav, Button } from "react-bootstrap";
import Loading from "../common/Loading";
// import { toast } from "react-toastify";
// import ProductList from "./ProductList";
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

  // handleDelete = transaction => {
  //   toast.info("Transaction Deleted!");
  //   this.props.actions.deleteTransaction(transaction).catch(error => {
  //     toast.error("Transaction delete has Failed! " + error.message, {
  //       autoClose: false
  //     });
  //   });
  // };

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
            {/* <LinkContainer to="/product">
              <Nav.Link>
                <Button>Add new transaction</Button>
              </Nav.Link>
            </LinkContainer> */}
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
