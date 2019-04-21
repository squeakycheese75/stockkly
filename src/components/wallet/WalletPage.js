import React from "react";
import SortTable from "./SortTable";
import LoginReminder from "./LoginReminder";

class WalletPage extends React.Component {
  removeTicker = event => {
    console.log("In TickerPage.removeTicker with ", event);
    this.props.removeTicker(event);
  };

  render() {
    const { data } = this.props;
    const { isAuthenticated } = this.props.auth;

    return (
      <div>
        {/* <SortTable data={data} onSubmit={this.removeTicker} />
        {!isAuthenticated() && <LoginReminder />} */}
        {/* <Summary /> */}
        {/* <WalletTable /> */}
      </div>
    );
  }
}

export default WalletPage;
