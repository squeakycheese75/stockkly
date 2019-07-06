import React, { Component } from "react";
import { Form, Row, Col } from "react-bootstrap";
import { DropdownList } from "react-widgets";

class WalletSettings extends Component {
  state = {
    value: this.props.appSettings.currency,
    appSettings: this.props.appSettings,
    selectedValue: ""
  };

  onTargetSelect = input => {
    this.setState({ value: input });
    let appSettingsCopy = JSON.parse(JSON.stringify(this.state.appSettings));
    appSettingsCopy.currency = input;

    if (input === "GBP") {
      appSettingsCopy.symbol = "£";
    } else if (input === "USD") {
      appSettingsCopy.symbol = "$";
    } else if (input === "EUR") {
      appSettingsCopy.symbol = "€";
    }

    this.props.updateProfile(appSettingsCopy);
  };

  render() {
    const walletCcyList = ["GBP", "USD", "EUR"];
    return (
      <div>
        <Form onSubmit={this.updateProfile}>
          <Form.Group as={Row} controlId="formPlaintextEmail">
            <Form.Label column sm="4" xs="4" md="2">
              Wallet Currency:
            </Form.Label>
            <Col sm="8" xs="8">
              <div className="col-sm-offset-2 col-xs-8 col-sm-6 col-md-4 col-lg-2">
                <DropdownList
                  className="dropdown_customized"
                  data={walletCcyList}
                  value={this.state.value}
                  onChange={this.onTargetSelect}
                />
              </div>
            </Col>
          </Form.Group>
        </Form>
      </div>
    );
  }
}

export default WalletSettings;
