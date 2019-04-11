import React from "react";
import Plot from "react-plotly.js";

class ProductChart extends React.Component {
  render() {
    const id = this.props;

    return (
      <Plot
        data={[
          {
            x: [
              "2013-10-04 22:23:00",
              "2013-11-04 22:23:00",
              "2013-12-04 22:23:00"
            ],
            y: [1, 3, 6],
            type: "scatter"
          }
        ]}
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
