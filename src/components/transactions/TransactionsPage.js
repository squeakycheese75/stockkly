import React from "react";
import { connect } from "react-redux";
import * as transactionActions from "../../redux/actions/transactionActions";
import * as productActions from "../../redux/actions/productActions";
import PropTypes from "prop-types";
import { bindActionCreators } from "redux";
import { LinkContainer } from "react-router-bootstrap";
import { Nav, Button } from "react-bootstrap";
import Loading from "../common/Loading";
import { toast } from "react-toastify";
import TransactionTable from "./components/TransactionTable";

class TransactionsPage extends React.Component {
  _isMounted = false;

  componentDidMount() {
    const { transactions, products, actions } = this.props;

    if (transactions.length === 0) {
      actions.loadTransactions().catch(error => {
        console.log("Loading Transactions failed ..." + error);
      });
    }

    if (products.length === 0) {
      actions.loadProducts().catch(error => {
        console.log("Loading Products failed ..." + error);
      });
    }
  }

  handleDelete = transaction => {
    toast.info("Transaction Deleted!");
    this.props.actions.deleteTransaction(transaction).catch(error => {
      toast.error("Transaction delete has Failed! " + error.message, {
        autoClose: false
      });
    });
  };

  render() {
    return (
      <>
        {this.props.loading ? (
          <Loading />
        ) : (
          <>
            <TransactionTable
              transactions={this.props.transactions}
              onDeleteClick={this.handleDelete}
            />
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

TransactionsPage.propTypes = {
  actions: PropTypes.object.isRequired,
  products: PropTypes.array.isRequired,
  transactions: PropTypes.array.isRequired,
  loading: PropTypes.bool.isRequired
};

function mapStateToProps(state) {
  return {
    products: state.products,
    transactions:
      state.products.length === 0
        ? []
        : state.transactions.map(transaction => {
            return {
              ...transaction,
              productName: state.products.find(function(item) {
                if (item.ticker === transaction.ticker) {
                  return item;
                }
              }).name
            };
          }),

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
)(TransactionsPage);
