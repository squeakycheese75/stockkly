import React from "react";
import AddTransaction from "./components/AddTransactionForm";
import { Card, Toast } from "react-bootstrap";
import TransactionHistory from "./components/TransactionHistory";
// import AddTransaction2 from "./components/AddTransaction2";
// import Loading from "../common/Loading";
// import InsertedTransactionsForm from "./components/InsertedTransactionForm";

class TransactionPage extends React.Component {
  _isMounted = false;
  _showToast = true;

  constructor(props) {
    super(props);
    this.state = {
      pid: props.match.params.pid,
      message: "",
      showToast: false
      // loading: true,
      // transactionHistoryData: []
    };
    this.auth = this.props.auth;
    this.history = this.props.history;
  }

  componentDidMount() {
    this._isMounted = true;
    // this.loadTransactionHistory();
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
        {/* <Card key="transactionHostory">
          <Card.Header as="h5">
            Transaction History {this.state.pid}
          </Card.Header>
          <Card.Body>
         
          </Card.Body> 
        </Card>*/}
        <TransactionHistory
          auth={this.auth}
          pid={this.state.pid}
          // transactionHistoryData={this.state.transactionHistoryData}
        />
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
            Transaction inserted for {this.state.pid} complete!
          </Toast.Body>
        </Toast>
      </div>
    );
  }
}

export default TransactionPage;
