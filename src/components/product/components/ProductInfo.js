import React from "react";
import { Jumbotron } from "react-bootstrap";

class ProductInfo extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      pid: this.props.productId,
      productData: "",
      message: ""
    };
  }

  loadProductInfo() {
    console.log("Loading product info data from api");
    var url =
      process.env["REACT_APP_PRICES_API"] + "/api/products/" + this.state.pid;

    console.log(url);

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
        this.setState({
          productData: response.message
        });
      })
      .catch(error => {
        this.setState({
          message: error.message
        });
      });
  }

  componentDidMount() {
    this.loadProductInfo();
  }

  render() {
    return (
      <Jumbotron>
        <h5 className="text-center">
          <b>{this.state.productData.displayTicker}</b> -{" "}
          {this.state.productData.name}
        </h5>
        <p>{this.state.productData.desc}</p>
      </Jumbotron>
    );
  }
}

export default ProductInfo;
