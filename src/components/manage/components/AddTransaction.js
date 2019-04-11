import { Form, Button } from "react-bootstrap";
import React, { Component } from "react";
import NumericInput from "react-numeric-input";
import Moment from "moment";
import momentLocalizer from "react-widgets-moment";
import { DateTimePicker } from "react-widgets";
import "react-widgets/dist/css/react-widgets.css";

//const today = new Date();
Moment.locale("en");
momentLocalizer();

class AddTransaction extends Component {
  render() {
    return (
      <div className="container-fluid">
        <Form>
          <Form.Group controlId="addTransaction">
            <Form.Label>Select Transaction date:</Form.Label>
            <DateTimePicker
              defaultValue={new Date()}
              time={false}
              format="DD MMM YYYY"
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>Transaction Type:</Form.Label>
            <Form.Check
              inline
              label="Buy"
              type="radio"
              id="inline-radio-buy"
              name="groupOptions"
              value="buy"
              defaultChecked
            />
            <Form.Check
              inline
              label="Sell"
              type="radio"
              id="inline-radio-sell"
              name="groupOptions"
              value="sell"
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>Enter Quantity:</Form.Label>
            <NumericInput
              className="form-control"
              value="1"
              min={1}
              precision={2}
              size={5}
            />
          </Form.Group>
          <Button>Submit</Button>
        </Form>
      </div>
    );
  }
}

export default AddTransaction;
