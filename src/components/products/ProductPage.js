import React from "react";
import { connect } from "react-redux";
import * as productActions from "../../redux/actions/productActions";
import * as transactionActions from "../../redux/actions/transactionActions";
import * as priceActions from "../../redux/actions/priceActions";
import * as pricesHistoricalActions from "../../redux/actions/pricesHistoricalActions";
import PropTypes from "prop-types";
import { bindActionCreators } from "redux";
import Loading from "../common/Loading";
import ProductSummary from "./components/ProductSummary";
import ProductChart from "./components/ProductChart";
// import ProductInfo from "./components/ProductInfo";
import TransactionTable from "../transactions/components/TransactionTable";
import { LinkContainer } from "react-router-bootstrap";
import { Nav, Button } from "react-bootstrap";
import { toast } from "react-toastify";

class ProductPage extends React.Component {
  handleDelete = transaction => {
    toast.info("Transaction Deleted!");
    this.props.actions.deleteTransaction(transaction).catch(error => {
      toast.error("Transaction delete has Failed! " + error.message, {
        autoClose: false
      });
    });
  };

  componentDidMount() {
    // debugger;
    const { transactions, products, actions } = this.props;
    console.log("in componentDidMount");
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
    // console.log(this.props.match.params);
    let ticker = this.props.match.params.ticker;
    if (ticker) {
      actions.loadPrice(ticker).catch(error => {
        console.log("Loading Price failed ..." + error);
      });

      actions.loadPricesHistorical(ticker).catch(error => {
        console.log("Loading PricesHistorical failed ..." + error);
      });
    }
  }

  render() {
    return (
      <>
        {this.props.loading || !this.props.product ? (
          <Loading />
        ) : (
          <>
            <ProductSummary
              product={this.props.product}
              price={this.props.price}
            />
            <br />
            {/* <ProductInfo product={this.props.product} />
            <br /> */}
            <ProductChart
              pid={this.props.match.params.ticker}
              chartData={{
                x: Object.keys(this.props.pricesHistorical.data),
                y: Object.values(this.props.pricesHistorical.data),
                pid: this.props.match.params.ticker
              }}
            />
            <br />
            <h5>Transactions:</h5>
            <TransactionTable
              transactions={this.props.transactions}
              onDeleteClick={this.handleDelete}
            />
            <br />
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

ProductPage.propTypes = {
  product: PropTypes.object.isRequired,
  actions: PropTypes.object.isRequired,
  products: PropTypes.array.isRequired,
  transactions: PropTypes.array.isRequired,
  loading: PropTypes.bool.isRequired,
  price: PropTypes.object.isRequired,
  pricesHistorical: PropTypes.object.isRequired
};

export function getProductByTicker(products, ticker) {
  return products.find(product => product.ticker === ticker) || null;
}

function mapStateToProps(state, ownProps) {
  const ticker = ownProps.match.params.ticker;
  const product =
    ticker && state.products.length > 0
      ? getProductByTicker(state.products, ticker)
      : null;

  const filteredTransactions = state.transactions.filter(
    transaction => transaction.productId === product.id
  );

  return {
    products: state.products,
    transactions:
      filteredTransactions.length === 0
        ? []
        : filteredTransactions.map(transaction => {
            return {
              ...transaction,
              productName: state.products.find(
                p => p.id === transaction.productId
              ).name,
              ticker: state.products.find(p => p.id === transaction.productId)
                .ticker
            };
          }),
    product,
    price: state.price,
    pricesHistorical: state.pricesHistorical,
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
      ),
      loadPrice: bindActionCreators(priceActions.loadPrice, dispatch),
      deleteTransaction: bindActionCreators(
        transactionActions.deleteTransaction,
        dispatch
      ),
      loadPricesHistorical: bindActionCreators(
        pricesHistoricalActions.loadPricesHistorical,
        dispatch
      )
    }
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ProductPage);
