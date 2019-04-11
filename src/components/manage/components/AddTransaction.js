import { Form, Row, Col } from "react-bootstrap";
import React, { Component } from "react";
import NumericInput from "react-numeric-input";

const today = new Date();

class AddTransaction extends Component {
  render() {
    return (
      // <div>
      <Form>
        <Form.Group controlId="addTransaction">
          <Row>
            <Col>
              <Form.Label>Select Transaction date:</Form.Label>
              <Form.Control type="date" defaultValue={today} />
            </Col>
            <Col>
              <Form.Text>Buy or Sell</Form.Text>
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
            </Col>
          </Row>
        </Form.Group>
        {/* 
        <Form.Group controlId="addTransaction">
          <Form.Label>Select Transaction date:</Form.Label>
          <Form.Control type="date" />
        </Form.Group> */}
        <Form.Group />
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
      </Form>
      // </div>
    );
  }
}

export default AddTransaction;
