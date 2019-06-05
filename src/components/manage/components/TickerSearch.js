import React, { Component } from "react";
import { Form } from "react-bootstrap";
// import DropdownList from "react-widgets/lib/DropdownList";
// import { DropdownList } from "react-widgets";
// import SearchNew from "./SearchNew";
import { DropdownList } from "react-widgets";
import "./SearchNew.css";

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
          {/* <SearchNew
            sectors={sectors}
            // onSelect={event => this.onTargetSelect(event)}
          /> */}
          <DropdownList
            className="dropdown_customized"
            data={sectors}
            value={this.state.selectedValue}
            // onChange={selectedValue => this.setState({ selectedValue })}
            onSelect={event => this.onTargetSelect(event)}
          />
          {/* <DropdownButton
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
          </DropdownButton> */}
          {/* <DropdownList data={colors} size="sm" /> */}
        </Form>
      </div>
    );
  }
}

export default TickerSearch;
