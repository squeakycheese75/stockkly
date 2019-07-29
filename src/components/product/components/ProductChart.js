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
      // x: ["2018-06-30", "2018-07-31", "2018-08-31", "2019-04-30"],
      // y: [22.3, 22.4, 22.1, 20.9],
      x: [],
      y: [],
      d: {},
      start_date: "2000-01-01",
      end_date: "2001-02-01",
      message: ""
    };
  }

  loadProductChartData() {
    console.log("Loading data form chart from api");
    var uri =
      process.env["REACT_APP_PRICES_API"] +
      "/api/products/prices/historical/" +
      this.state.pid;
    // console.log(uri);
    // var url = new URL(uri),
    //   params = {
    //     start_date: this.state.start_date,
    //     end_date: this.state.end_date
    //   };
    // Object.keys(params).forEach(key =>
    //   url.searchParams.append(key, params[key])
    // );

    fetch(uri, {
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
      // .then(response => console.log(response))
      .then(response => {
        this.setState({
          // y: Object.values(JSON.parse(response)),
          // x: Object.keys(JSON.parse(response)),
          y: Object.values(response),
          x: Object.keys(response),
          d: response
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
      line: { color: "#428bca" }
    };

    return (
      <div className="container-fluid">
        {!Array.isArray(this.state.x) || !this.state.x.length ? (
          "No Data"
        ) : (
          <Plot
            data={[trace1]}
            layout={{ title: this.state.pid + " Chart", height: 320 }}
            useResizeHandler={true}
            style={{ width: "100%", height: "100%" }}
            config={{ displaylogo: false }}
          />
        )}
      </div>
    );
  }
}

export default ProductChart;
