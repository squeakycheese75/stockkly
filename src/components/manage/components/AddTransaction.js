import { Form } from "react-bootstrap";
import React, { Component } from "react";
import NumericInput from "react-numeric-input";

class AddTransaction extends Component {
  render() {
    return (
      <div>
        <Form>
          <Form.Group controlId="formBasicEmail">
            <Form.Label>Transaction History</Form.Label>
            {/* <Form.Control type="email" placeholder="Enter email" /> */}
            <Form.Text className="text-muted">placeholder</Form.Text>
          </Form.Group>

          <Form.Group controlId="addTransaction">
            <Form.Label>Add Transaction</Form.Label>
            <Form.Control type="date" />
            <NumericInput
              className="form-control"
              value="1"
              min={1}
              precision={2}
              size={5}
            />
          </Form.Group>
        </Form>
      </div>
    );
  }
}

export default AddTransaction;
