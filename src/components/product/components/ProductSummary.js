import React from "react";
import { Jumbotron } from "react-bootstrap";
import "./ProductSummary.css";
// import t from "typy";

function priceChangeFormatter(change, movement) {
  return (
    <div>
      <ul>
        {change > 0 ? (
          <>
            <li className="name up">
              {parseFloat(change).toFixed(2)}
              <i className="material-icons vertical-align-middle up">
                arrow_drop_up
              </i>
            </li>
          </>
        ) : (
          <>
            <li className="name down">
              {parseFloat(change).toFixed(2)}
              <i className="material-icons vertical-align-middle down">
                arrow_drop_down
              </i>
            </li>
          </>
        )}
        <li className="details">({parseFloat(movement).toFixed(2)}%)</li>
      </ul>
    </div>
  );
}

function priceFormatter(price) {
  return (
    <div>
      <ul>
        {price > 0 ? (
          <>
            <li className="price-large up">
              {parseFloat(price).toFixed(2)}
              <i className="material-icons vertical-align-middle up">
                arrow_drop_up
              </i>
            </li>
          </>
        ) : (
          <>
            <li className="price-large down">
              {parseFloat(price).toFixed(2)}
              <i className="material-icons vertical-align-middle down">
                arrow_drop_down
              </i>
            </li>
          </>
        )}
      </ul>
    </div>
  );
}

function changeFormatter(change) {
  return (
    <div>
      <ul>
        <li className="details-large">({parseFloat(change).toFixed(2)}%)</li>
      </ul>
    </div>
  );
}

function isEmpty(obj) {
  for (var key in obj) {
    if (obj.hasOwnProperty(key)) return false;
  }
  return true;
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
    const { appSettings } = this.props;
    // const total =t(this.state.productData, "total").safeObject;

    function totalFormatter(cell) {
      return `${appSettings.symbol}` + cell;
    }

    return (
      <div>
        <Jumbotron>
          <h1 className="text-center">
            <table align="center">
              <tbody>
                <tr>
                  <td>{this.state.pid}</td>
                  <td>{this.state.productSummary.name}</td>
                </tr>
                <tr>
                  {isEmpty(this.state.productHoldings) ? (
                    <>
                      <td>{priceFormatter(this.state.productPrice.price)}</td>
                      <td>{changeFormatter(this.state.productPrice.change)}</td>
                    </>
                  ) : (
                    <>
                      <td>{totalFormatter(this.state.productSummary.price)}</td>
                      <td>
                        {priceChangeFormatter(
                          this.state.productSummary.price,
                          this.state.productSummary.change
                        )}
                      </td>
                    </>
                  )}
                </tr>
              </tbody>
            </table>
          </h1>
          {/* <h3>
            <ul align="center">
              {data["spot"] > 0 ? (
                <li className="name">
                  {data["qty"]} @ {data["price"]} ({data["spot"]})
                </li>
              ) : (
                <li className="name">
                  {data["qty"]} @ {data["price"]}
                </li>
              )}
            </ul>
          </h3> */}
        </Jumbotron>
      </div>
    );
  }
}

export default ProductSummary;
