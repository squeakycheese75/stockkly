import React, { Component } from "react";
import { Form, DropdownButton, Dropdown } from "react-bootstrap";
// import signUpForm from "./style.js";

class TickerSearch extends Component {
  state = {
    selectedValue: "Select:"
  };

  onTargetSelect = event => {
    //event.preventDefault();
    this.setState({ selectedValue: event });
    this.props.filterExchanges(event);
  };

  render() {
    const sectors = this.props.sectors || [];
    return (
      <div>
        <Form onSubmit={this.handleSubmit}>
          {/* <FormGroup> */}
          <DropdownButton
            value={this.state.selectedValue}
            title={this.state.selectedValue}
            onSelect={event => this.onTargetSelect(event)}
            id={this.state.selectedValue}
            size="sm"
          >
            {sectors.map(sector => (
              <Dropdown.Item eventKey={sector} key={sector}>
                {sector}
              </Dropdown.Item>
            ))}
          </DropdownButton>
          {/* </FormGroup> */}
        </Form>
        {/* <Card border="primary">
          <Card.Header as="h5">Find new prices to watch:</Card.Header>
          <Card.Body>
            <Card.Title>Find new prices</Card.Title>
            <Card.Text>

            </Card.Text>
          </Card.Body>
        </Card> */}
      </div>
    );
  }
}

export default TickerSearch;
