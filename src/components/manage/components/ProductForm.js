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
      <Card border="dark">
        <Card.Header>Product Info: {params["pid"]}</Card.Header>
        <Card.Text>
          <ProductChart productId={params["pid"]} />
        </Card.Text>
      </Card>
      <Card border="dark">
        <Card.Header>Transactions</Card.Header>
        <Card.Text>
          <AddTransaction />
        </Card.Text>
      </Card>
    </div>
  );
};

export default ProductForm;
