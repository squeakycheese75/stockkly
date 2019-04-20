import React from "react";

class ProductInfo extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      pid: this.props.productId,
      message: ""
    };
  }

  loadProductInfo() {
    console.log("Loading product info data from api");
    // var uri =
    //   process.env["REACT_APP_PRICES_API"] +
    //   "/api/historical/data/" +
    //   this.state.pid;

    // // console.log(uri);
    // var url = new URL(uri),
    //   params = {
    //     start_date: this.state.start_date,
    //     end_date: this.state.end_date
    //   };
    // Object.keys(params).forEach(key =>
    //   url.searchParams.append(key, params[key])
    // );

    // fetch(url, {
    //   method: "GET",
    //   headers: {
    //     "Content-Type": "application/json"
    //   }
    // })
    //   .then(response => {
    //     if (response.ok) return response;
    //     throw new Error("Network response was not ok.");
    //   })
    //   .then(response => response.json())
    //   .then(response => {
    //     this.setState({
    //       y: Object.values(JSON.parse(response.message)),
    //       x: Object.keys(JSON.parse(response.message))
    //     });
    //   })
    //   .catch(error => {
    //     this.setState({
    //       message: error.message
    //     });
    //   });
  }

  componentDidMount() {
    this.loadProductInfo();
  }

  render() {
    return <h5>Product Info: {this.state.pid}</h5>;
  }
}

export default ProductInfo;
