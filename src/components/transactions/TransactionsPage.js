import React from 'react';
import { connect } from 'react-redux';
import * as transactionActions from '../../redux/actions/transactionActions';
import * as productActions from '../../redux/actions/productActions';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { LinkContainer } from 'react-router-bootstrap';
import { Nav, Button } from 'react-bootstrap';
import Loading from '../common/Loading';
import { toast } from 'react-toastify';
import TransactionTable from './components/TransactionTable';
import HowToWallet from '../common/HowToWallet';

class TransactionsPage extends React.Component {
  _isMounted = false;

  componentDidMount() {
    const { products, actions } = this.props;

    // if (transactions.length === 0) {
    // console.log("Loading transactions");
    actions.loadTransactions().catch((error) => {
      console.error('Loading Transactions failed ...' + error);
    });
    // }

    if (products.length === 0) {
      actions.loadProducts().catch((error) => {
        console.error('Loading Products failed ...' + error);
      });
    }
  }

  handleDelete = (transaction) => {
    toast.info('Transaction Deleted!');
    this.props.actions.deleteTransaction(transaction).catch((error) => {
      toast.error('Transaction delete has Failed! ' + error.message, {
        autoClose: false,
      });
    });
  };

  render() {
    return (
      <div>
        {this.props.loading ? (
          <Loading />
        ) : (
          <>
            {this.props.transactions.length > 0 ? (
              <>
                <TransactionTable
                  transactions={this.props.transactions}
                  onDeleteClick={this.handleDelete}
                />
              </>
            ) : (
              <>
                <HowToWallet />
              </>
            )}
            <LinkContainer to="/transaction">
              <Nav.Link>
                <Button>Add new transaction</Button>
              </Nav.Link>
            </LinkContainer>
          </>
        )}
      </div>
    );
  }
}

TransactionsPage.propTypes = {
  actions: PropTypes.object.isRequired,
  products: PropTypes.array.isRequired,
  transactions: PropTypes.array.isRequired,
  loading: PropTypes.bool.isRequired,
};

function mapStateToProps(state) {
  return {
    // transactions: state.transactions,
    transactions:
      state.products.length === 0
        ? []
        : state.transactions
            .filter((value) => JSON.stringify(value) !== '{}')
            .map((t) => {
              return {
                ...t,
                productName: state.products.find((a) => a.ticker === t.ticker)
                  .name,
              };
            }),
    products: state.products,
    loading: state.apiCallsInProgress > 0,
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
      ),
    },
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(TransactionsPage);
