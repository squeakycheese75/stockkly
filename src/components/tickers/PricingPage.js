import React from "react";
import SortTable from "./SortTable";
import LoginReminder from "./LoginReminder";

class PricingPage extends React.Component {
  removeTicker = event => {
    console.log("In TickerPage.removeTicker with ", event);
    this.props.removeTicker(event);
  };

  render() {
    const { data } = this.props;
    const { isAuthenticated } = this.props.auth;
    // const { history } = this.history;

    return (
      <div>
        <SortTable data={data} onSubmit={this.removeTicker} />
        {!isAuthenticated() && <LoginReminder />}
      </div>
    );
  }
}

export default PricingPage;
