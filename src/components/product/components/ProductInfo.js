import React from "react";
// import { Jumbotron } from "react-bootstrap";
import "./ProductInfo.css";
import JSONPretty from "react-json-pretty";
import "react-json-pretty/themes/monikai.css";
// import t from "typy";

class ProductInfo extends React.Component {
  _isMounted = false;

  constructor(props) {
    super(props);
    this.state = {
      pid: this.props.productId,
      message: "",
      productData: {}
    };
  }

  loadProductInfo() {
    var url =
      process.env["REACT_APP_PRICES_API"] + "/api/products/" + this.state.pid;

    fetch(url, {
      method: "GET",
      headers: {
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
            productData: response
          });
        }
      })
      .catch(error => {
        this.setState({
          message: error.message
        });
      });
  }

  // loadPriceInfo() {
  //   var url =
  //     process.env["REACT_APP_PRICES_API"] +
  //     "/api/product/" +
  //     this.state.pid;

  //   fetch(url, {
  //     method: "GET",
  //     headers: {
  //       "Content-Type": "application/json"
  //     }
  //   })
  //     .then(response => {
  //       if (response.ok) return response;
  //       throw new Error("Network response was not ok.");
  //     })
  //     .then(response => response.json())
  //     .then(response => {
  //       if (this._isMounted) {
  //         this.setState({
  //           productData: response
  //         });
  //       }
  //     })
  //     .catch(error => {
  //       this.setState({
  //         message: error.message
  //       });
  //     });
  // }

  componentDidMount() {
    this._isMounted = true;
    this.loadProductInfo();
  }

  componentWillUnmount() {
    this._isMounted = false;
  }

  render() {
    // const url = t(this.state.productData, "company.url").safeObject;
    var JSONPrettyMon = require("react-json-pretty/dist/monikai");

    return (
      <div>
        <JSONPretty data={this.state.productData} theme={JSONPrettyMon} />
      </div>
    );
  }
}

export default ProductInfo;
