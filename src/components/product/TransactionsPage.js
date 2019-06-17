import React from "react";
import AddTransaction from "./components/AddTransactionForm";
import { Card, Toast } from "react-bootstrap";
import TransactionHistory from "./components/TransactionHistory";

class TransactionPage extends React.Component {
  _isMounted = false;
  _showToast = true;
  constructor(props) {
    super(props);
    this.state = {
      pid: props.match.params.pid,
      message: ""
    };
    this.auth = this.props.auth;
  }

  componentDidMount() {
    this._isMounted = true;
  }

  componentWillUnmount() {
    this._isMounted = false;
  }

  render() {
    return (
      <div>
        <Card key="addTransaction">
          <Card.Header as="h5">
            Add Transaction for {this.state.pid}
          </Card.Header>
          <Card.Body>
            <AddTransaction auth={this.auth} product={this.state.pid} />
          </Card.Body>
        </Card>
        <Card key="transactionHostory">
          <Card.Header as="h5">
            Transaction History {this.state.pid}
          </Card.Header>
          <Card.Body>
            <TransactionHistory auth={this.auth} pid={this.state.pid} />
          </Card.Body>
        </Card>
        <Toast
          show={true}
          onClose={true}
          style={{
            position: "absolute",
            top: 50,
            right: 50
          }}
        >
          <Toast.Header className="info">
            <img
              src="holder.js/20x20?text=%20"
              className="rounded mr-2"
              alt=""
            />
            <strong className="mr-auto">Bootstrap</strong>
            <small>11 mins ago</small>
          </Toast.Header>
          <Toast.Body>Woohoo, you're reading this text in a Toast!</Toast.Body>
        </Toast>
      </div>
    );
  }
}

export default TransactionPage;
