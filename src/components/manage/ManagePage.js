import React from "react";
import TickerSearch from "./components/TickerSearch";
import { Card } from "react-bootstrap";
import TickerSearchResultsTable from "./components/TickerSearchResultsTable";

class ManagePage extends React.Component {
  _isMounted = false;

  constructor(props) {
    super(props);
    this.state = {
      appSettings: this.props.appSettings,
      sectors: localStorage.getItem("sectors")
        ? JSON.parse(localStorage.getItem("sectors"))
        : []
    };
    this.auth = this.props.auth;
  }

  async loadSectors() {
    // var url = process.env["REACT_APP_PRICES_API"] + "/api/private/holdings/";
    var url = process.env["REACT_APP_PRICES_API"] + "/api/products/sectors/";

    fetch(url, {
      method: "GET",
      headers: {
        // Authorization: `Bearer ${this.auth.getAccessToken()}`,
        "Content-Type": "application/json"
      }
    })
      .then(response => {
        if (response.ok) return response;
        throw new Error("Network response was not ok.");
      })
      .then(response => response.json())
      .then(response => {
        if (this._isMounted) {
          this.setState({
            sectors: response
          });
        }
      })
      .catch(error => {
        this.setState({
          message: error.message
        });
      });
  }

  componentDidMount() {
    this._isMounted = true;
    this.loadSectors();
  }

  componentWillUnmount() {
    this._isMounted = false;
    //Cache data back to localStorage if unmounted
    localStorage.setItem("sectors", JSON.stringify(this.state.sectors));
  }

  addTicker = event => {
    //console.log("In ManagePage.addNewTicker with ", event);
    this.props.addNewTicker(event);
  };

  filteredTickers = event => {
    //console.log("In ManagePage.removeTicker with ", event);
    this.props.filteredTickers(event);
  };

  render() {
    // const sectors = this.props.sectors;
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
        <Card border="dark">
          <TickerSearch
            sectors={this.state.sectors}
            filterExchanges={this.filteredTickers}
          />
          {activeComponent}
        </Card>
      </div>
    );
  }
}

export default ManagePage;
