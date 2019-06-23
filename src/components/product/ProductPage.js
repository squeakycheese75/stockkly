import React from "react";
// import ProductChart from "./components/ProductChart";
import TransactionHistory from "./components/TransactionHistory";
import { Card, Button, Toast } from "react-bootstrap";
import { Link } from "react-router-dom";
import ProductInfo from "./components/ProductInfo";
import ProductSummary from "./components/ProductSummary";
// import Loading from "../common/Loading";
import "./ProductPage.css";

class ProductForm extends React.Component {
  _isMounted = false;
  // _isLoaded = false;

  constructor(props) {
    super(props);
    this.state = {
      pid: props.match.params.pid,
      appSettings: this.props.appSettings,
      // open: false,
      // transactionHistoryData: [],
      // product: [],
      // productHoldings: localStorage.getItem("productHoldings")
      //   ? JSON.parse(localStorage.getItem("productHoldings"))
      //   : []
      productHoldings: {},
      productSummary: {},
      watchList: this.props.watchList,
      showToast: false
    };
    this.auth = this.props.auth;
    this.history = this.props.history;
  }

  async loadProductSummary() {
    // console.log("calling loadProductSummary with " + this.state.pid);
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
    // this._isLoaded = true;
    // if ((this.state.product = [])) this.loadProductSummary();
  }

  componentWillUnmount() {
    this._isMounted = false;
    // this._isLoaded = false;
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.watchList !== this.props.watchList) {
      console.log("Watchlist needs updating");
      this.setState({
        watchList: nextProps.watchList
      });
    }
  }

  handleSubmit = event => {
    this.props.addTickerToWatchList(event);
    this.setState({ showToast: true });
    // () => {
    //   this.setState({ showToast: true })
    // );
    //show toast
  };

  render() {
    const { showToast } = this.state;
    // if (!this._isLoaded) return <Loading />;
    const handleClose = () => this.setState({ showToast: false });
    // const handleShow = () => this.setState({ show: true });

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
        <Toast
          onClose={handleClose}
          show={showToast}
          delay={3000}
          autohide
          style={{
            position: "absolute",
            top: 100,
            right: 25
          }}
        >
          <Toast.Header>
            <img
              src="holder.js/20x20?text=%20"
              className="rounded mr-2"
              alt=""
            />
            <strong className="mr-auto">Stockkly</strong>
            {/* <small>11 mins ago</small> */}
          </Toast.Header>
          <Toast.Body>Added {this.state.pid} to watchList!</Toast.Body>
        </Toast>

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
                {this.state.watchList.includes(this.state.pid) ? (
                  <></>
                ) : (
                  <Button
                    className="btn"
                    variant="outline-dark"
                    size="sm"
                    onClick={event => this.handleSubmit(this.state.pid)}
                  >
                    Add to Watchlist
                  </Button>
                )}
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
              {this.state.watchList.includes(this.state.pid) ? (
                <></>
              ) : (
                <Button
                  className="btn"
                  variant="outline-dark"
                  size="sm"
                  onClick={event => this.handleSubmit(this.state.pid)}
                >
                  Add to Watchlist
                </Button>
              )}
            </Card.Body>
          </Card>
        )}
      </div>
    );
  }
}

export default ProductForm;
