import React from "react";
import { connect } from "react-redux";
import * as transactionActions from "../../redux/actions/transactionActions";
import PropTypes from "prop-types";

class TransactionsPage extends React.Component {
  state = {
    transaction: {
      title: "",
      type: "Buy"
    }
  };

  handleChange = event => {
    const transaction = {
      ...this.state.transaction,
      title: event.target.value
    };
    this.setState({
      transaction: transaction
    });
  };

  handleSubmit = event => {
    event.preventDefault();
    // alert(this.state.transaction.title);
    // debugger;
    this.props.dispatch(
      transactionActions.createTransaction(this.state.transaction)
    );
  };

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <h2>Transactions</h2>
        <h3>Add Transaction</h3>
        <input
          type="text"
          onChange={this.handleChange}
          value={this.state.transaction.title}
        />
        <input type="submit" value="Save" />

        {this.props.transactions.map(transaction => (
          <div>
            {transaction.title}, {transaction.type}
          </div>
        ))}
      </form>
    );
  }
}

TransactionsPage.propTypes = {
  dispatch: PropTypes.func.isRequired,
  transactions: PropTypes.array.isRequired
};

function mapStateToProps(state) {
  return {
    transactions: state.transactions
  };
}

export default connect(mapStateToProps)(TransactionsPage);
