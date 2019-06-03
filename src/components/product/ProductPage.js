import React from "react";
import ProductChart from "./components/ProductChart";
import TransactionHistory from "./components/TransactionHistory";
import { Card, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import ProductInfo from "./components/ProductInfo";

class ProductForm extends React.Component {
  _isMounted = false;

  constructor(props) {
    super(props);
    this.state = {
      pid: props.match.params.pid,
      transactionHistoryData: []
    };
    this.auth = this.props.auth;
  }

  async loadTransactionHistory() {
    // console.log("calling loadTransactionHistory with " + this.state.pid);
    var url =
      process.env["REACT_APP_PRICES_API"] +
      "/api/wallet/transactions/" +
      this.state.pid;
    fetch(url, {
      headers: {
        Authorization: `Bearer ${this.auth.getAccessToken()}`,
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
            transactionHistoryData: response
          });
        }
      })
      .catch(error => {
        this.setState({
          message: error.message
        });
      });
  }

  async loadProductSummary() {
    // console.log("calling loadTransactionHistory with " + this.state.pid);
    var url =
      process.env["REACT_APP_PRICES_API"] +
      "/api/wallet/holdings/" +
      this.state.pid;
    fetch(url, {
      headers: {
        Authorization: `Bearer ${this.auth.getAccessToken()}`,
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
            transactionHistoryData: response
          });
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

    this.loadTransactionHistory();
  }

  componentWillUnmount() {
    this._isMounted = false;
  }

  render() {
    return (
      <div>
        {/* <ProductSummary
          data={this.state.holdingsData}
          settings={this.state.appSettings}
        /> */}
        <ProductInfo
          productId={this.state.pid}
          data={this.state.transactionHistoryData}
        />
        <Card border="info" key="productChart">
          <Card.Header as="h5">Chart</Card.Header>
          <Card.Body>
            <ProductChart productId={this.state.pid} />
          </Card.Body>
        </Card>
        {this.auth.isAuthenticated() ? (
          <>
            <Card border="info" key="transactionHistory">
              <Card.Header as="h5">Transaction History:</Card.Header>
              <Card.Body>
                <TransactionHistory
                  auth={this.auth}
                  productId={this.state.pid}
                  data={this.state.transactionHistoryData}
                />
                <Link to={`/transactions/${this.state.pid}`}>
                  <Button className="btn outline">Add Transaction</Button>
                </Link>
              </Card.Body>
            </Card>
          </>
        ) : (
          <Card>
            <Card.Header as="h5">**Note**</Card.Header>
            <Card.Body>
              <Card.Text>
                Need to be logged in to manage transactions.
              </Card.Text>
            </Card.Body>
          </Card>
        )}
      </div>
    );
  }
}

export default ProductForm;
