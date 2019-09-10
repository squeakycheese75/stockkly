import React from "react";
import { connect } from "react-redux";
import * as transactionActions from "../../redux/actions/transactionActions";
import * as productActions from "../../redux/actions/productActions";
import PropTypes from "prop-types";
import { bindActionCreators } from "redux";
import TransactionList from "./TransactionsList";
import { LinkContainer } from "react-router-bootstrap";
import { Nav, Button } from "react-bootstrap";
import Loading from "../common/Loading";
import { toast } from "react-toastify";

class AssetPage extends React.Component {
  componentDidMount() {
    const { transactions, products, actions } = this.props;

    if (transactions.length === 0) {
      actions.loadTransactions().catch(error => {
        alert("Loading Transactions failed ..." + error);
      });
    }

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
        {this.props.loading ? (
          <Loading />
        ) : (
          <>
            Product details
            <table>
              <tr>
                <td>slug</td>
                <td>{state.product.slug}</td>
              </tr>
              <tr>
                <td>name</td>
                <td>{state.product.name}</td>
              </tr>
              <tr>
                <td>id</td>
                <td>{state.product.id}</td>
              </tr>
            </table>
            <LinkContainer to="/transaction">
              <Nav.Link>
                <Button>Add new transaction</Button>
              </Nav.Link>
            </LinkContainer>
          </>
        )}
      </>
    );
  }
}

AssetPage.propTypes = {
  actions: PropTypes.object.isRequired,
  product: PropTypes.object.isRequired,
  products: PropTypes.array.isRequired,
  transactions: PropTypes.array.isRequired,
  loading: PropTypes.bool.isRequired
};

export function getTransactionBySlug(products, slug) {
  return products.find(product => product.slug === slug) || null;
}

function mapStateToProps(state) {
  // const slug = ownProps.match.params.slug;
  const id = ownProps.match.params.slug;
  const product =
    id && state.products.length > 0
      ? getProductsBySlug(state.products, id)
      : {};
  return {
    product,
    transactions:
      state.products.length === 0
        ? []
        : state.transactions.map(transaction => {
            return {
              ...transaction,
              productName: state.products.find(
                p => p.id === transaction.productId
              ).name,
              ticker: state.products.find(p => p.id === transaction.productId)
                .ticker
            };
          }),
    products: state.products,
    loading: state.apiCallsInProgress > 0
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: {
      loadTransactions: bindActionCreators(
        transactionActions.loadTransactions,
        dispatch
      ),
      loadProducts: bindActionCreators(productActions.loadProducts, dispatch),
      deleteTransaction: bindActionCreators(
        transactionActions.deleteTransaction,
        dispatch
      )
    }
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AssetPage);
