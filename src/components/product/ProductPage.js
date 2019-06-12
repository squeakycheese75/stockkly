import React from "react";
// import ProductChart from "./components/ProductChart";
import TransactionHistory from "./components/TransactionHistory";
import { Card, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import ProductInfo from "./components/ProductInfo";
import ProductSummary from "./components/ProductSummary";
import Loading from "../common/Loading";

class ProductForm extends React.Component {
  _isMounted = false;
  _isLoaded = false;

  constructor(props) {
    super(props);
    this.state = {
      pid: props.match.params.pid,
      appSettings: this.props.appSettings,
      open: false,
      // transactionHistoryData: [],
      // product: [],
      // productHoldings: localStorage.getItem("productHoldings")
      //   ? JSON.parse(localStorage.getItem("productHoldings"))
      //   : []
      productHoldings: {},
      productSummary: {}
    };
    this.auth = this.props.auth;
  }

  async loadProductSummary() {
    // console.log("calling loadTransactionHistory with " + this.state.pid);
    var url =
      process.env["REACT_APP_PRICES_API"] + "/api/products/" + this.state.pid;
    fetch(url, {
      headers: {
        // Authorization: `Bearer ${this.auth.getAccessToken()}`,
        "Content-Type": "application/json"
      }
    })
      .then(response => {
        if (response.ok) return response;
        throw new Error("Network response was not ok.");
      })
      .then(response => response.json())
      .then(response => {
        if (this._isMounted) {
          this.setState({
            productSummary: response
          });
          this._isLoaded = false;
        }
      })
      .catch(error => {
        this.setState({
          message: error.message
        });
      });
  }

  componentDidMount() {
    this._isMounted = true;
    // if (this.auth.isAuthenticated) {
    //   this.loadTransactionHistory();
    // }

    // this.loadProductHoldings();
    this.loadProductSummary();
    this._isLoaded = true;
    // if ((this.state.product = [])) this.loadProductSummary();
  }

  componentWillUnmount() {
    this._isMounted = false;
    this._isLoaded = false;
  }

  handleSubmit = event => {
    console.log("in handleSubmit from add to watch list.");
  };

  render() {
    if (!this._isLoaded) return <Loading />;

    return (
      <div>
        <ProductSummary
          appSettings={this.state.appSettings}
          auth={this.auth}
          productId={this.state.pid}
        />

        <ProductInfo productId={this.state.pid} />

        {/* <Card border="info" key="productChart">
          <Card.Header as="h5" className="text-dark">
            Chart
          </Card.Header>
          <Card.Title>Chart</Card.Title>
          <Card.Subtitle className="mb-2 text-muted">
            {this.state.pid} Open 6m
          </Card.Subtitle>
          <Card.Body className="text-secondary">
            <Collapse in={this.state.open}>
              <ProductChart productId={this.state.pid} />
            </Collapse>
          </Card.Body>
        </Card> */}

        {this.auth.isAuthenticated() ? (
          <>
            <Card key="transactionHistory">
              <Card.Header as="h5">Transaction History:</Card.Header>
              <Card.Body>
                <TransactionHistory auth={this.auth} pid={this.state.pid} />
                <Link to={`/transactions/${this.state.pid}`}>
                  <Button className="btn" variant="outline-info">
                    Add Transaction
                  </Button>
                </Link>{" "}
                {/* <Link to={`/watcher/${this.state.pid}`}>
                  <Button className="btn outline">Add to Watchlist</Button>
                </Link> */}
                <Button
                  className="btn"
                  variant="outline-dark"
                  size="sm"
                  onClick={event => this.handleSubmit(event)}
                >
                  Add to Watchlist
                </Button>
              </Card.Body>
            </Card>
          </>
        ) : (
          <Card>
            <Card.Header as="h5">**Note**</Card.Header>
            <Card.Body>
              <Card.Text>
                You need to be logged in to manage transactions but you can add
                to you watch list!
              </Card.Text>
              <Button
                className="btn btn-default"
                variant="outline-dark"
                size="sm"
                onClick={event => this.handleSubmit(event)}
              >
                Add to Watchlist
              </Button>
            </Card.Body>
          </Card>
        )}
      </div>
    );
  }
}

export default ProductForm;
