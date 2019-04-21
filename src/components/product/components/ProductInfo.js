import React from "react";
import { Jumbotron } from "react-bootstrap";
import "./ProductInfo.css";

class ProductInfo extends React.Component {
  _isMounted = false;

  constructor(props) {
    super(props);
    this.state = {
      pid: this.props.productId,
      productData: "",
      message: "",
      price: 123.44,
      movement: 0.9
    };
  }

  loadProductInfo() {
    // console.log("Loading product info data from api");
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
        if (this._isMounted) {
          this.setState({
            productData: response.message
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
    this.loadProductInfo();
  }

  componentWillUnmount() {
    this._isMounted = false;
  }

  render() {
    return (
      <Jumbotron>
        <h5 className="text-center">
          <span>
            <b>{this.state.productData.displayTicker}</b> -{" "}
            {this.state.productData.name}
            <div>
              <ul>
                <li className="name">
                  {this.state.price}
                  {this.state.price > 0 ? (
                    <i className="material-icons vertical-align-middle">
                      arrow_drop_up
                    </i>
                  ) : (
                    <i className="material-icons vertical-align-middle">
                      arrow_drop_down
                    </i>
                  )}
                </li>
                <li className="details">({this.state.movement}%)</li>
              </ul>
            </div>
          </span>
        </h5>
        <p>{this.state.productData.desc}</p>
        {/* <Table size="sm">
          <tbody>
            <tr>
              <td>
                <b>{this.state.productData.displayTicker}</b> -{" "}
                {this.state.productData.name}
              </td>
              <td>
                {" "}
                <ul>
                  <li className="name">
                    {this.state.price}
                    {this.state.price > 0 ? (
                      <i className="material-icons vertical-align-middle">
                        arrow_drop_up
                      </i>
                    ) : (
                      <i className="material-icons vertical-align-middle">
                        arrow_drop_down
                      </i>
                    )}
                  </li>
                  <li className="details">({this.state.movement}%)</li>
                </ul>
              </td>
            </tr>
          </tbody>
        </Table> */}
      </Jumbotron>
    );
  }
}

export default ProductInfo;
