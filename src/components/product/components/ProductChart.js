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
  }

  componentDidMount() {
    // this.loadProductChartData();
  }

  render() {
    const { x, y } = this.props;

    var trace1 = {
      type: "scatter",
      mode: "lines",
      name: this.state.pid + " Open",
      x: x,
      y: y,
      line: { color: "#428bca" }
    };

    return (
      <div className="container-fluid">
        {!Array.isArray(x) || !x.length ? (
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
