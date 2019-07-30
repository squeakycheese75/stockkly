import React from "react";
import { Jumbotron } from "react-bootstrap";
import "./ProductSummary.css";
import t from "typy";

function changeFormatter(change) {
  return (
    <>
      {change >= 0 ? (
        <>
          <div className="up_header pl">
            <i className="material-icons vertical-align-middle up_header">
              arrow_drop_up
            </i>
            {/* {change.toFixed(2).toLocaleString(undefined, {
              minimumFractionDigits: 2
            })} */}
            {change.toLocaleString(undefined, { minimumFractionDigits: 2 })}
          </div>
        </>
      ) : (
        <>
          <div className="down_header pl">
            <i className="material-icons vertical-align-middle down_header">
              arrow_drop_down
            </i>
            {Math.abs(change)
              .toFixed(2)
              .toLocaleString(undefined, {
                minimumFractionDigits: 2
              })}
          </div>
        </>
      )}
    </>
  );
}

function priceFormatter(price, symbol) {
  return (
    <>
      {symbol}
      {price.toLocaleString(undefined, { minimumFractionDigits: 2 })}
    </>
  );
}

class ProductSummary extends React.Component {
  _isMounted = false;
  _isHeld = false;

  constructor(props) {
    super(props);
    this.state = {
      pid: this.props.productId,
      message: "",
      productSummary: {},
      productPrice: {},
      productHoldings: {}
    };
    this.auth = this.props.auth;
  }

  async loadProductHoldings() {
    console.log("calling loadProductHoldings with " + this.state.pid);
    var url =
      process.env["REACT_APP_PRICES_API"] +
      "/api/wallet/holdings/" +
      this.state.pid;

    fetch(url, {
      headers: {
        Authorization: `Bearer ${this.auth.getAccessToken()}`,
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
            productHoldings: response
          });
        }
      })
      .catch(error => {
        this.setState({
          message: error.message
        });
      });
  }

  async loadProductPrice() {
    console.log("calling loadPrice with " + this.state.pid);
    var url =
      process.env["REACT_APP_PRICES_API"] +
      "/api/products/prices/" +
      this.state.pid;
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
            productPrice: response
          });
        }
      })
      .catch(error => {
        this.setState({
          message: error.message
        });
      });
  }

  async loadProductSummary() {
    // console.log("calling loadTransactionHistory with " + this.state.pid);
    var url =
      process.env["REACT_APP_PRICES_API"] + "/api/products/" + this.state.pid;
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
            productSummary: response
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
    if (this.auth.isAuthenticated()) {
      this.loadProductHoldings();
    }
    this.loadProductSummary();
    this.loadProductPrice();
  }

  componentWillUnmount() {
    this._isMounted = false;
  }

  render() {
    // const { appSettings } = this.props;
    // const total = t(this.state.productHoldings, "total").safeObject;
    const symbol = t(this.state.productSummary, "quote.symbol").safeObject;

    // function totalFormatter(cell) {
    //   return `${appSettings.symbol}` + cell;
    // }

    return (
      <div>
        <Jumbotron>
          <h1 className="text-center">
            <table align="center">
              <tbody>
                <tr>
                  <td colSpan="2" className="name-large">
                    {this.state.pid}
                  </td>
                </tr>
                <tr>
                  <td colSpan="2" className="details-med">
                    {this.state.productSummary.name}
                  </td>
                </tr>
                <tr />
                <tr>
                  {/* <td>
                    {priceFormatter(symbol, this.state.productPrice.price)}
                  </td>
                  <td>{changeFormatter(this.state.productPrice.change)}</td> */}
                  <td>
                    {priceFormatter(
                      parseFloat(this.state.productPrice.price),
                      symbol
                    )}
                  </td>
                  <td>
                    {changeFormatter(
                      parseFloat(this.state.productPrice.change)
                    )}
                  </td>
                </tr>
              </tbody>
            </table>
          </h1>
        </Jumbotron>
      </div>
    );
  }
}

export default ProductSummary;
