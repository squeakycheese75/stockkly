import React from "react";
import ProductChart from "./components/ProductChart";
import AddTransaction from "./components/AddTransactionForm";
import TransactionHistory from "./components/TransactionHistory";
import { Card } from "react-bootstrap";
import ProductInfo from "./components/ProductInfo";

class ProductForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      pid: props.match.params.pid,
      transactionHistoryData: [],
      productData: [],
      message: "",
      x: [],
      y: []
    };
    this.auth = this.props.auth;
  }

  // loadTransactionHistory() {
  //   var url =
  //     process.env["REACT_APP_PRICES_API"] +
  //     "/api/private/transactions/" +
  //     this.state.pid;
  //   console.log("ProductForm.componentDidMount called" + this.state.pid);
  //   fetch(url, {
  //     headers: {
  //       Authorization: `Bearer ${this.auth.getAccessToken()}`,
  //       "Content-Type": "application/json"
  //     }
  //   })
  //     .then(response => {
  //       if (response.ok) return response;
  //       throw new Error("Network response was not ok.");
  //     })
  //     .then(response => response.json())
  //     .then(response => {
  //       this.setState({
  //         transactionHistoryData: response.message
  //       });
  //     })
  //     .catch(error => {
  //       this.setState({
  //         message: error.message
  //       });
  //     });
  // }

  // componentDidMount() {
  //   if (this.auth.isAuthenticated()) {
  //     this.loadTransactionHistory();
  //   }
  // }

  render() {
    return (
      <div>
        <Card key="productInfo">
          <Card.Header>
            <ProductInfo productId={this.state.pid} />
          </Card.Header>
          <ProductChart productId={this.state.pid} />
        </Card>

        {this.auth.isAuthenticated() ? (
          <>
            <br />
            <Card key="transactionHistory">
              <Card.Header>
                <h3>Transaction History:</h3>
              </Card.Header>
              <TransactionHistory auth={this.auth} productId={this.state.pid} />
            </Card>
            <br />
            <Card key="addTransaction">
              <Card.Header>
                <h3>Add Transaction:</h3>
              </Card.Header>
              <AddTransaction auth={this.auth} product={this.state.pid} />
            </Card>
          </>
        ) : (
          <Card>
            <Card.Header>
              <p>Need to be logged in to manage transactions.</p>
            </Card.Header>
          </Card>
        )}
      </div>
    );
  }
}

export default ProductForm;
