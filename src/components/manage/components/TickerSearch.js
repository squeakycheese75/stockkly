import React, { Component } from "react";
import { Form, DropdownButton, Dropdown } from "react-bootstrap";
// import DropdownList from "react-widgets/lib/DropdownList";
// import { DropdownList } from "react-widgets";

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
    // eslint-disable-next-line
    const sectors = this.props.sectors || [];
    // let colors = ["orange", "red", "blue", "purple"];
    return (
      <div>
        <Form onSubmit={this.handleSubmit}>
          {/* <DropdownList
            data={colors}
            value={this.state.value}
            onChange={value => this.setState({ value })}
          /> */}
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
          {/* <DropdownList data={colors} size="sm" /> */}
        </Form>
      </div>
    );
  }
}

export default TickerSearch;
