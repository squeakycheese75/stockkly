import React from "react";
import Plot from "react-plotly.js";

class ProductChart extends React.Component {
  render() {
    const id = this.props;
    // var trace1 = {
    //   type: "scatter",
    //   mode: "lines",
    //   name: "AAPL High",
    //   x: unpack(rows, "Date"),
    //   y: unpack(rows, "AAPL.High"),
    //   line: { color: "#17BECF" }
    // };

    // var trace2 = {
    //   type: "scatter",
    //   mode: "lines",
    //   name: "AAPL Low",
    //   x: unpack(rows, "Date"),
    //   y: unpack(rows, "AAPL.Low"),
    //   line: { color: "#7F7F7F" }
    // };

    return (
      <Plot
        data={[
          {
            x: [4, 8, 9],
            y: [2, 6, 3],
            type: "scatter",
            mode: "lines+points",
            marker: { color: "red" }
          }
          //   { type: "bar", x: [1, 2, 3], y: [2, 5, 3] }
        ]}
        // data={[trace1, trace2]}
        layout={{
          width: 320,
          height: 240,
          title: "A Fancy Plot for " + id.value
        }}
      />
    );
  }
}

export default ProductChart;
