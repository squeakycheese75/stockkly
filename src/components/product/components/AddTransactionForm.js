import { Form, Button } from "react-bootstrap";
import React from "react";
import NumericInput from "react-numeric-input";
import Moment from "moment";
import momentLocalizer from "react-widgets-moment";
import { DateTimePicker } from "react-widgets";
import "react-widgets/dist/css/react-widgets.css";

Moment.locale("en");
momentLocalizer();

class AddTransaction extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      t_date: new Date(),
      t_type: "BUY",
      t_qty: 1,
      t_price: 1,
      t_pid: this.props.product
    };
    this.auth = this.props.auth;
    // this.pid = this.props.product;
  }

  handleDateTimeChange = event => {
    this.setState({ t_date: event });
  };

  handleTransactionTypeChange = event => {
    this.setState({ t_type: event.target.value });
  };

  handleQuantityChange = event => {
    this.setState({ t_qty: event });
  };

  handlePriceChange = event => {
    this.setState({ t_price: event });
  };

  handleSubmit = event => {
    console.log("in handleSubmit");
    console.log("pid is " + this.state.t_pid);

    var data = {
      ticker: this.state.t_pid,
      transdate: this.state.t_date,
      transtype: this.state.t_type,
      quantity:
        this.state.t_type === "SELL" ? this.state.t_qty * -1 : this.state.t_qty,
      price: this.state.t_price
    };
    console.log("constructed data");

    var url = process.env["REACT_APP_PRICES_API"] + "/api/private/transactions";
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
  };

  render() {
    return (
      <div>
        <Form className="form-horizontal">
          <Form.Group controlId="addTransaction">
            <Form.Label>Transaction date:</Form.Label>
            <Form.Text>
              <div className="col-sm-offset-2 col-xs-8 col-sm-6 col-md-4 col-lg-2">
                <DateTimePicker
                  defaultValue={this.state.t_date}
                  time={false}
                  format="DD MMM YYYY"
                  onChange={event => this.handleDateTimeChange(event)}
                />
              </div>
            </Form.Text>
          </Form.Group>
          <Form.Group>
            <Form.Label>Type:</Form.Label>
            <Form.Text>
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
            </Form.Text>
          </Form.Group>
          <Form.Group>
            <Form.Label>Quantity:</Form.Label>
            <Form.Text>
              <div className="col-sm-offset-2 col-xs-8 col-sm-6 col-md-4 col-lg-2">
                <NumericInput
                  className="form-control-qty"
                  value={this.state.t_qty}
                  min={1}
                  precision={2}
                  size={5}
                  onChange={event => this.handleQuantityChange(event)}
                />
              </div>
            </Form.Text>
          </Form.Group>
          <Form.Group>
            <Form.Label>Price:</Form.Label>
            <Form.Text>
              <div className="col-sm-offset-2 col-xs-8 col-sm-6 col-md-4 col-lg-2">
                <NumericInput
                  className="form-control-price"
                  value={this.state.t_price}
                  min={1}
                  precision={2}
                  size={5}
                  onChange={event => this.handlePriceChange(event)}
                />
              </div>
            </Form.Text>
          </Form.Group>
          <Form.Group>
            <Form.Label> </Form.Label>
            <div className="col-sm-offset-2 col-xs-8 col-sm-6 col-md-4 col-lg-2">
              <Button
                className="btn btn-default"
                size="sm"
                onClick={event => this.handleSubmit(event)}
              >
                Submit
              </Button>
            </div>
          </Form.Group>
        </Form>
      </div>
    );
  }
}

export default AddTransaction;
