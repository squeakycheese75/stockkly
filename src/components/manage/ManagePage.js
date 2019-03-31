import React from "react";
import TickerSearch from "./components/TickerSearch";
// import PreferencesForm from "./components/PreferencesForm";
import TickerSearchResultsTable from "./components/TickerSearchResultsTable";

class ManagePage extends React.Component {
  addTicker = event => {
    //console.log("In ManagePage.addNewTicker with ", event);
    this.props.addNewTicker(event);
  };

  filteredTickers = event => {
    //console.log("In ManagePage.removeTicker with ", event);
    this.props.filteredTickers(event);
  };

  render() {
    const sectors = this.props.sectors;
    let activeComponent = null;

    if (
      this.props.filteredTickersData &&
      this.props.filteredTickersData.length
    ) {
      activeComponent = (
        <TickerSearchResultsTable
          onSubmit={this.addTicker}
          data={this.props.filteredTickersData}
        />
      );
    }

    return (
      <div>
        <br />
        <p>Find new tickers:</p>
        <TickerSearch
          sectors={sectors}
          filterExchanges={this.filteredTickers}
        />
        {activeComponent}
        <br />
        {/* <h4>Preferences:</h4>
                <PreferencesForm /> */}
      </div>
    );
  }
}

export default ManagePage;
