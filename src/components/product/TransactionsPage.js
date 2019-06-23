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
      message: "",
      showToast: false
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
    const { showToast } = this.state;

    const handleClose = () => this.setState({ showToast: false });
    const handleOpen = () => this.setState({ showToast: true });

    return (
      <div>
        <Card key="addTransaction">
          <Card.Header as="h5">
            Add Transaction for {this.state.pid}
          </Card.Header>
          <Card.Body>
            <AddTransaction
              auth={this.auth}
              product={this.state.pid}
              onSubmit={handleOpen}
            />
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
            {/* <small>11 mins ago</small> */}
          </Toast.Header>
          <Toast.Body>Added {this.state.pid} to watchList!</Toast.Body>
        </Toast>
      </div>
    );
  }
}

export default TransactionPage;
