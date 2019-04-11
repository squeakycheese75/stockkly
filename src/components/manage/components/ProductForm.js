import React from "react";
import ProductChart from "./ProductChart";
// import { Button } from "react-bootstrap";
// import { Link } from "react-router-dom";
import AddTransaction from "./AddTransaction";
import { Card } from "react-bootstrap";

const ProductForm = props => {
  const {
    match: { params }
  } = props;
  return (
    <div>
      <Card>
        <Card.Header>
          <h5>Product Info: {params["pid"]}</h5>
        </Card.Header>
        <ProductChart productId={params["pid"]} />
      </Card>
      <br />
      <Card>
        <Card.Header>
          <h5>Transaction History:</h5>
        </Card.Header>{" "}
      </Card>
      <Card>
        <Card.Header>
          <h5>Add Transaction:</h5>
        </Card.Header>
        <AddTransaction />
      </Card>
    </div>
  );
};

export default ProductForm;
