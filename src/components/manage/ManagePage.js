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
        : [],
      products: localStorage.getItem("products")
        ? JSON.parse(localStorage.getItem("products"))
        : [],
      filteredProducts: [],
      selectedSector: null
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

  async loadProducts() {
    // console.log("calling loadTransactionHistory with " + this.state.pid);
    var url = process.env["REACT_APP_PRICES_API"] + "/api/products/";
    fetch(url, {
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
            products: response
          });
        }
      })
      .catch(error => {
        this.setState({
          message: error.message
        });
      });
  }

  filteredTickers = input => {
    // console.log("In ManagePage.removeTicker with ", event);
    // const fProducts = this.state.products.filter(h => h.sector === input);
    // const filterSUbscribedTickers = filteredTickers.filter(
    //   id => !this.state.subscribedTickers.includes(id.ticker)
    // );
    this.setState({
      filteredProducts: this.state.products.filter(h => h.sector === input)
    });
    this.setState({ selectedSector: input });
  };

  componentDidMount() {
    this._isMounted = true;
    this.loadSectors();
    this.loadProducts();
  }

  componentWillUnmount() {
    this._isMounted = false;
    //Cache data back to localStorage if unmounted
    localStorage.setItem("sectors", JSON.stringify(this.state.sectors));
    localStorage.setItem("products", JSON.stringify(this.state.products));
  }

  addTicker = event => {
    //console.log("In ManagePage.addNewTicker with ", event);
    this.props.addNewTicker(event);
  };

  render() {
    let activeComponent = null;

    if (this.state.filteredProducts && this.state.filteredProducts.length) {
      activeComponent = (
        <TickerSearchResultsTable
          onSubmit={this.addTicker}
          data={this.state.filteredProducts}
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
