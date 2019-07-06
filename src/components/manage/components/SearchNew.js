import React, { Component } from "react";
import { Form } from "react-bootstrap";
// import DropdownList from "react-widgets/lib/DropdownList";
import { DropdownList } from "react-widgets";
import "./SearchNew.css";

class SearchNew extends Component {
  state = {
    value: "Select:"
  };

  // onTargetSelect = event => {
  //   //event.preventDefault();
  //   this.setState({ selectedValue: event });
  //   this.props.filterExchanges(event);
  // };

  render() {
    // eslint-disable-next-line
    const sectors = this.props.sectors || [];
    return (
      <div>
        <Form onSubmit={this.handleSubmit}>
          <DropdownList
            className="dropdown_customized"
            data={sectors}
            value={this.state.value}
            onChange={value => this.setState({ value })}
          />
        </Form>
      </div>
    );
  }
}

export default SearchNew;
