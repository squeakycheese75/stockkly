import React from "react";
import AddTransaction from "./components/AddTransactionForm";
import { Card } from "react-bootstrap";
import TransactionHistory from "./components/TransactionHistory";

class TransactionPage extends React.Component {
  _isMounted = false;
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
      </div>
    );
  }
}

export default TransactionPage;
