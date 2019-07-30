import React from "react";
import ProductChart from "./components/ProductChart";
import TransactionHistory from "../transactions/components/TransactionHistory";
import { Card, Button, Toast } from "react-bootstrap";
import { Link } from "react-router-dom";
import ProductInfo from "./components/ProductInfo";
import ProductSummary from "./components/ProductSummary";
import Loading from "../common/Loading";
import "./ProductPage.css";

class ProductForm extends React.Component {
  _isMounted = false;

  constructor(props) {
    super(props);
    this.state = {
      pid: props.match.params.pid,
      appSettings: this.props.appSettings,
      productHoldings: {},
      productSummary: {},
      watchList: this.props.watchList,
      showToast: false,
      toastMsg: "Added",
      loading: true,
      x: [],
      y: []
    };
    this.auth = this.props.auth;
    this.handleClick = this.handleClick.bind(this);
    this.handleRemove = this.handleRemove.bind(this);
  }

  async loadProductSummary() {
    var url =
      process.env["REACT_APP_PRICES_API"] + "/api/products/" + this.state.pid;
    fetch(url, {
      headers: {
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
            productSummary: response,
            loading: false
          });
        }
      })
      .catch(error => {
        this.setState({
          message: error.message
        });
      });
  }

  async loadProductChartData() {
    console.log("Loading data form chart from api");
    var uri =
      process.env["REACT_APP_PRICES_API"] +
      "/api/products/prices/historical/" +
      this.state.pid;
    // console.log(uri);
    var url = new URL(uri),
      params = {
        start_date: this.state.start_date,
        end_date: this.state.end_date
      };
    Object.keys(params).forEach(key =>
      url.searchParams.append(key, params[key])
    );

    fetch(uri, {
      method: "GET",
      headers: {
        "Content-Type": "application/json"
      }
    })
      .then(response => {
        if (response.ok) return response;
        throw new Error("Network response was not ok.");
      })
      .then(response => response.json())
      .then(response => {
        this.setState({
          // y: Object.values(JSON.parse(response)),
          // x: Object.keys(JSON.parse(response)),
          y: Object.values(response),
          x: Object.keys(response),
          d: response
        });
      })
      .catch(error => {
        this.setState({
          message: error.message
        });
      });
  }

  componentDidMount() {
    this._isMounted = true;
    this.loadProductChartData();
    this.loadProductSummary();
  }

  componentWillUnmount() {
    this._isMounted = false;
    this.setState({ loading: false });
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.watchList !== this.props.watchList) {
      // console.log("Watchlist needs updating");
      this.setState({
        watchList: nextProps.watchList
      });
    }
  }

  handleClick() {
    // console.log("handle click pressed");
    this.props.addTickerToWatchList(this.state.pid);
    this.setState({ toastMsg: "Added" }, () => {
      this.setState({ showToast: true });
    });
  }

  handleRemove() {
    console.log("handleRemoveFromWatchlist");
    this.props.removeTickerFromWatchList(this.state.pid);
    // this.props.removeTicker(event);
    this.setState({ toastMsg: "Removed" }, () => {
      this.setState({ showToast: true });
    });
  }

  render() {
    const { showToast } = this.state;
    const handleClose = () => this.setState({ showToast: false });

    if (this.state.loading) return <Loading />;
    return (
      <div className="card">
        <ProductSummary
          appSettings={this.state.appSettings}
          auth={this.auth}
          productId={this.state.pid}
          userProfile={this.userProfile}
        />

        <ProductInfo productId={this.state.pid} />
        {/* 
        <Card key="productChart">
          <Card.Header as="h5" className="text-dark">
            30 day open
          </Card.Header> */}
        {/* <Card.Subtitle className="mb-2 text-muted">
            {this.state.pid} Open 6m
          </Card.Subtitle> */}
        <ProductChart
          productId={this.state.pid}
          x={this.state.x}
          y={this.state.y}
        />
        {/* </Card> */}

        <Toast
          onClose={handleClose}
          show={showToast}
          delay={3000}
          autohide
          style={{
            position: "absolute",
            bottom: 20,
            right: 20
          }}
        >
          <Toast.Header>
            <img
              src="holder.js/20x20?text=%20"
              className="rounded mr-2"
              alt=""
            />
            <strong className="mr-auto">Stockkly</strong>
          </Toast.Header>
          <Toast.Body>
            {this.state.toastMsg} {this.state.pid} to watchList!
          </Toast.Body>
        </Toast>

        {this.auth.isAuthenticated() ? (
          <>
            <Card key="transactionHistory">
              <Card.Header as="h5">Transaction History:</Card.Header>
              {/* <Card.Body> */}
              <TransactionHistory auth={this.auth} pid={this.state.pid} />
              {/* </Card.Body> */}
            </Card>
            <Link to={`/transactions/${this.state.pid}`}>
              <Button className="btn">Add Transaction</Button>
            </Link>{" "}
            {this.state.watchList.includes(this.state.pid) ? (
              <Button
                className="btn"
                variant="danger"
                onClick={this.handleRemove}
              >
                Remove from Watchlist
              </Button>
            ) : (
              <Button
                // className="btn"
                variant="primary"
                onClick={this.handleClick}
              >
                Add to Watchlist
              </Button>
            )}
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
                <Button
                  // className="btn"
                  variant="danger"
                  onClick={this.handleRemove}
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
            </Card.Body>
          </Card>
        )}
      </div>
    );
  }
}

export default ProductForm;
