import React from "react";
import { connect } from "react-redux";
import * as productActions from "../../redux/actions/productActions";
import * as transactionActions from "../../redux/actions/transactionActions";
import * as priceActions from "../../redux/actions/priceActions";
import * as pricesHistoricalActions from "../../redux/actions/pricesHistoricalActions";
import * as profileActions from "../../redux/actions/profileActions";
import PropTypes from "prop-types";
import { bindActionCreators } from "redux";
import Loading from "../common/Loading";
import ProductSummary from "./components/ProductSummary";
import ProductChart from "./components/ProductChart";
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

  removeTicker = input => {
    console.log("Removing ticker from watchlist", input);
    // debugger;
    let newProfile = this.props.profile;
    newProfile.watchList.filter(
      ticker => ticker.toLowerCase() !== input.toLowerCase()
    );
    this.props.actions.saveProfile(newProfile).catch(error => {
      // toast.error("Profile update has Failed! " + error.message, {
      //   autoClose: false
      // });
      console.log("Removed ticker from watchlist" + input);
    });
  };

  componentDidMount() {
    const { transactions, products, actions, profile, auth } = this.props;

    if (profile.length === 0) {
      actions.loadProfile().catch(error => {
        console.log("Loading Products failed ..." + error);
      });
    }

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

    // console.log(this.props.match.params);
    let ticker = this.props.match.params.ticker;
    if (ticker) {
      actions.loadPrice(ticker).catch(error => {
        console.log("Loading Price failed ..." + error);
      });

      actions.loadPricesHistorical(ticker).catch(error => {
        console.log("Loading PricesHistorical failed ..." + error);
      });
      // !this.props.product ||
    }
  }

  componentWillUnmount() {
    const { actions } = this.props;
    actions.resetPrice();
    actions.resetPricesHistorical();
  }

  render() {
    return (
      <>
        {this.props.loading || Object.keys(this.props.product).length === 0 ? (
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
                x:
                  this.props.pricesHistorical &&
                  this.props.pricesHistorical.data
                    ? Object.keys(this.props.pricesHistorical.data)
                    : [],
                y:
                  this.props.pricesHistorical &&
                  this.props.pricesHistorical.data
                    ? Object.values(this.props.pricesHistorical.data)
                    : [],
                pid: this.props.match.params.ticker
              }}
            />

            {this.props.auth.isAuthenticated ? (
              <>
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
                {this.props.profile &&
                this.props.profile.watchList.includes(
                  this.props.match.params.ticker
                ) ? (
                  <Button
                    className="btn"
                    variant="danger"
                    onClick={this.removeTicker}
                  >
                    Remove from Watchlist
                  </Button>
                ) : (
                  <Button
                    className="btn"
                    variant="primary"
                    onClick={this.handleClick}
                  >
                    Add to Watchlist
                  </Button>
                )}
              </>
            ) : (
              <>
                <p>You need to be logged in for Transactions.</p>
              </>
            )}
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
  profile: PropTypes.object.isRequired,
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
      : {};

  const filteredTransactions = state.transactions.filter(
    transaction => transaction.ticker === product.ticker
  );

  return {
    products: state.products,
    transactions:
      filteredTransactions.length === 0
        ? []
        : filteredTransactions.map(transaction => {
            return {
              ...transaction,
              // productName: state.products.find(
              //   item => item.ticker === transaction.ticker
              // ).name
              productName: state.products.find(function(item) {
                if (item.ticker === transaction.ticker) return item;
                return {};
              }).name
              // ticker: state.products.find(p => p.id === transaction.productId)
              //   .ticker
            };
          }),
    product,
    price: state.price,
    profile: state.profile,
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
      loadProfile: bindActionCreators(profileActions.loadProfile, dispatch),
      loadPrice: bindActionCreators(priceActions.loadPrice, dispatch),
      deleteTransaction: bindActionCreators(
        transactionActions.deleteTransaction,
        dispatch
      ),
      loadPricesHistorical: bindActionCreators(
        pricesHistoricalActions.loadPricesHistorical,
        dispatch
      ),
      resetPrice: bindActionCreators(priceActions.resetPrice, dispatch),
      resetPricesHistorical: bindActionCreators(
        pricesHistoricalActions.resetPricesHistorical,
        dispatch
      ),
      saveProfile: bindActionCreators(profileActions.saveProfile, dispatch)
    }
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ProductPage);
