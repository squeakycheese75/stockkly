import React from "react";
import { connect } from "react-redux";
import * as transactionActions from "../../redux/actions/transactionActions";
import * as productActions from "../../redux/actions/productActions";
import PropTypes from "prop-types";
import { bindActionCreators } from "redux";
import TransactionList from "./TransactionsList";
import { LinkContainer } from "react-router-bootstrap";
import { Nav, Button } from "react-bootstrap";

class TransactionsPage extends React.Component {
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

  render() {
    return (
      <>
        <h2>Transactions</h2>
        <TransactionList transactions={this.props.transactions} />
        {/* {this.props.transactions.map(transaction => (
          <div key={transaction.title}>{transaction.title}</div>
        ))} */}
        <LinkContainer to="/transaction">
          <Nav.Link>
            <Button>Add new transaction</Button>
          </Nav.Link>
        </LinkContainer>
      </>
    );
  }
}

TransactionsPage.propTypes = {
  // dispatch: PropTypes.func.isRequired,
  actions: PropTypes.object.isRequired,
  products: PropTypes.array.isRequired,
  transactions: PropTypes.array.isRequired
};

function mapStateToProps(state) {
  return {
    transactions:
      state.products.length === 0
        ? []
        : state.transactions.map(transaction => {
            return {
              ...transaction,
              productName: state.products.find(
                // p => p.id === parseInt(transaction.productId)
                p => p.id === transaction.productId
              ).name
            };
          }),
    products: state.products
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: {
      loadTransactions: bindActionCreators(
        transactionActions.loadTransactions,
        dispatch
      ),
      loadProducts: bindActionCreators(productActions.loadProducts, dispatch)
    }
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TransactionsPage);
