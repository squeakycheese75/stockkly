import { Form, Button, Row, Col } from "react-bootstrap";
import React from "react";
import { DateTimePicker, NumberPicker } from "react-widgets";
import "react-widgets/dist/css/react-widgets.css";
import Moment from "moment";
import momentLocalizer from "react-widgets-moment";
import simpleNumberLocalizer from "react-widgets-simple-number";
import "./AddTransaction.css";

Moment.locale("en");
momentLocalizer();
simpleNumberLocalizer();

class AddTransaction extends React.Component {
  constructor(props) {
    super(props);
    // Default
    this.state = {
      t_date: new Date(),
      t_type: "BUY",
      t_qty: 1,
      t_price: 1,
      t_total: 1,
      t_pid: this.props.product,
      t_details: "Trade info"
    };
    this.auth = this.props.auth;
  }

  handleDateTimeChange = event => {
    this.setState({ t_date: event });
  };

  handleTransactionTypeChange = event => {
    this.setState({ t_type: event.target.value });
  };

  handleQuantityChange = event => {
    this.setState({ t_qty: event, t_total: this.state.t_price * event });
  };

  handlePriceChange = event => {
    this.setState({ t_price: event, t_total: this.state.t_qty * event });
  };

  async insertTransaction() {
    // console.log("In InsertTransaction");
    var data = {
      ticker: this.state.t_pid,
      transdate: this.state.t_date,
      transtype: this.state.t_type,
      quantity:
        this.state.t_type === "SELL" ? this.state.t_qty * -1 : this.state.t_qty,
      price: this.state.t_price,
      details: this.state.t_details
    };

    var url = process.env["REACT_APP_PRICES_API"] + "/api/wallet/transactions/";
    fetch(url, {
      method: "POST",
      body: JSON.stringify(data), // data can be `string` or {object}!
      headers: {
        Authorization: `Bearer ${this.auth.getAccessToken()}`,
        "Content-Type": "application/json"
      }
    })
      .then(response => {
        if (response.status) return response;
        throw new Error("Network response was not ok.");
      })
      .then(response => response.json())
      .then(response => console.log("Success:", JSON.stringify(response)))
      .catch(error => console.error("Error:", error));
    console.log("Done!");
  }

  handleSubmit = event => {
    console.log("Inserting Transaction");
    this.insertTransaction();
    this.props.onSubmit(event);
    // Reset the Transaction
    this.setState({
      t_type: "BUY",
      t_date: new Date(),
      t_qty: 1,
      t_price: 1,
      t_total: 1,
      t_pid: this.props.product,
      t_details: "Trade info"
    });

    // this.props.history.push(`/product/${this.state.t_pid}`);
    // history.push(`/product/${row.ticker}`);
  };

  render() {
    return (
      <div className="addTransaction">
        <Form className="form-horizontal">
          <Form.Group as={Row} controlId="formPlaintextEmail">
            <Form.Label column sm="4" xs="4" md="2">
              Transaction date:
            </Form.Label>
            <Col sm="8" xs="8">
              <div className="col-sm-offset-2 col-xs-8 col-sm-6 col-md-4 col-lg-2">
                <DateTimePicker
                  defaultValue={this.state.t_date}
                  time={false}
                  format="DD MMM YYYY"
                  onChange={event => this.handleDateTimeChange(event)}
                />
              </div>
            </Col>
          </Form.Group>
          <Form.Group as={Row} controlId="formPlaintextEmail">
            <Form.Label column sm="4" xs="4" md="2">
              Type:
            </Form.Label>
            <Col sm="8" xs="8">
              <div className="col-sm-offset-2 col-xs-8 col-sm-6 col-md-4 col-lg-2">
                <Form.Check
                  inline
                  label="Buy"
                  type="radio"
                  id="inline-radio-buy"
                  name="groupOptions"
                  value="BUY"
                  defaultChecked
                  onChange={event => this.handleTransactionTypeChange(event)}
                />
                <Form.Check
                  inline
                  label="Sell"
                  type="radio"
                  id="inline-radio-sell"
                  name="groupOptions"
                  value="SELL"
                  onChange={event => this.handleTransactionTypeChange(event)}
                />
              </div>
            </Col>
          </Form.Group>
          <Form.Group as={Row} controlId="formPlaintextEmail">
            <Form.Label column sm="4" xs="4" md="2">
              Quantity:
            </Form.Label>
            <Col sm="8" xs="8">
              <div className="col-sm-offset-2 col-xs-8 col-sm-6 col-md-4 col-lg-2">
                <NumberPicker
                  onChange={event => this.handleQuantityChange(event)}
                  precision={0}
                  format="-#,###"
                  value={this.state.t_qty}
                />
              </div>
            </Col>
          </Form.Group>
          <Form.Group as={Row} controlId="formPlaintextEmail">
            <Form.Label column sm="4" xs="4" md="2">
              Price:
            </Form.Label>
            <Col sm="8" xs="8">
              <div className="col-sm-offset-2 col-xs-8 col-sm-6 col-md-4 col-lg-2">
                <NumberPicker
                  onChange={event => this.handlePriceChange(event)}
                  precision={2}
                  value={this.state.t_price}
                  format="-#,###.00"
                  step={0.01}
                />
              </div>
            </Col>
          </Form.Group>
          <Form.Group as={Row} controlId="formPlaintextEmail">
            <Form.Label column sm="4" xs="4" md="2">
              Bookcost:
            </Form.Label>
            <Col sm="8" xs="8">
              <div className="col-sm-offset-2 col-xs-8 col-sm-6 col-md-4 col-lg-2">
                <NumberPicker
                  defaultValue={this.state.t_total}
                  readOnly
                  value={this.state.t_total}
                  precision={2}
                  step={0.01}
                  disabled
                  format="-#,###.00"
                />
              </div>
            </Col>
          </Form.Group>
          <br />
          {/* <Form.Group>
            <div>
              <ButtonToolbar>
                <Button
                  variant="primary"
                  size="lg"
                  onClick={event => this.handleSubmit(event)}
                >
                  Submit
                </Button>
                <Button variant="warning" size="lg">
                  Cancel
                </Button>
              </ButtonToolbar>
            </div>
          </Form.Group> */}
        </Form>

        <Button
          variant="primary"
          size="lg"
          onClick={event => this.handleSubmit(event)}
        >
          Submit
        </Button>
      </div>
    );
  }
}

export default AddTransaction;
