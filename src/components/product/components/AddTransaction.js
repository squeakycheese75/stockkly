import { Form, Button } from "react-bootstrap";
import React, { Component } from "react";
import NumericInput from "react-numeric-input";
import Moment from "moment";
import momentLocalizer from "react-widgets-moment";
import { DateTimePicker } from "react-widgets";
import "react-widgets/dist/css/react-widgets.css";

Moment.locale("en");
momentLocalizer();

class AddTransaction extends Component {
  render() {
    return (
      <div>
        <Form className="form-horizontal">
          <Form.Group controlId="addTransaction">
            <Form.Label>Transaction date:</Form.Label>
            <Form.Text>
              <div className="col-sm-offset-2 col-xs-8 col-sm-6 col-md-4 col-lg-2">
                <DateTimePicker
                  defaultValue={new Date()}
                  time={false}
                  format="DD MMM YYYY"
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
              </div>
            </Form.Text>
          </Form.Group>
          <Form.Group maxLength={255}>
            <Form.Label>Quantity:</Form.Label>
            <Form.Text>
              <div className="col-sm-offset-2 col-xs-8 col-sm-6 col-md-4 col-lg-2">
                <NumericInput
                  className="form-control"
                  value="1"
                  min={1}
                  precision={2}
                  size={5}
                />
              </div>
            </Form.Text>
          </Form.Group>
          <Form.Group>
            <Form.Label> </Form.Label>
            <div className="col-sm-offset-2 col-xs-8 col-sm-6 col-md-4 col-lg-2">
              <Button type="submit" class="btn btn-default" size="sm">
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
