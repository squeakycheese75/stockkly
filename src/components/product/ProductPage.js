import React from "react";
import ProductChart from "./components/ProductChart";
import TransactionHistory from "./components/TransactionHistory";
import { Card, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import ProductInfo from "./components/ProductInfo";

class ProductForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      pid: props.match.params.pid
      // transactionHistoryData: [],
      // productData: [],
      // message: ""
      // x: [],
      // y: []
    };
    this.auth = this.props.auth;
  }

  render() {
    return (
      <div>
        <ProductInfo productId={this.state.pid} />
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
