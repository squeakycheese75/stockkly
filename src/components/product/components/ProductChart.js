import React from "react";
// import Plot from "react-plotly.js";
import Plotly from "plotly.js-basic-dist";

import createPlotlyComponent from "react-plotly.js/factory";
const Plot = createPlotlyComponent(Plotly);

class ProductChart extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      pid: this.props.productId,
      x: [],
      y: [],
      start_date: "2000-01-01",
      end_date: "2001-02-01",
      message: ""
    };
    // this.auth = this.props.auth;
  }

  loadProductChartData() {
    var uri =
      process.env["REACT_APP_PRICES_API"] +
      "/api/historical/data/" +
      this.state.pid;
    console.log(uri);
    var url = new URL(uri),
      params = {
        start_date: this.state.start_date,
        end_date: this.state.end_date
      };
    Object.keys(params).forEach(key =>
      url.searchParams.append(key, params[key])
    );

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
          y: Object.values(JSON.parse(response.message)),
          x: Object.keys(JSON.parse(response.message))
        });
      })
      .catch(error => {
        this.setState({
          message: error.message
        });
      });
  }

  componentDidMount() {
    this.loadProductChartData();
  }

  render() {
    var trace1 = {
      type: "scatter",
      mode: "lines",
      name: this.state.pid + " Open",
      x: this.state.x,
      y: this.state.y,
      line: { color: "#17BECF" }
    };

    return (
      <div className="container-fluid">
        <Plot
          data={[trace1]}
          layout={{ title: this.state.pid + " Chart", height: 480 }}
          useResizeHandler={true}
          style={{ width: "100%", height: "100%" }}
        />
      </div>
    );
  }
}

export default ProductChart;
