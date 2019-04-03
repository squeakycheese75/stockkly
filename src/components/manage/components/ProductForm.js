import React from "react";

const ProductForm = props => {
  const {
    match: { params }
  } = props;
  return (
    <div className="container-fluid">
      <h1>Product Info: {params["pid"]}</h1>
    </div>
  );
};

export default ProductForm;
