import React from "react";
import PropTypes from "prop-types";
import ProductSummary from "./components/ProductSummary";
import TransactionList from "../history/TransactionsList";
import ProductChart from "./components/ProductChart";

const SHOWDELETE = false;

const ProductForm = ({
  transactions,
  product,
  price = { current: 1.22 },
  chartData = {
    x: ["2016-01-01", "2017-01-01", "2018-01-01"],
    y: [1, 2, 3],
    pid: product.name
  },
  errors = {}
}) => {
  return (
    <div>
      <ProductSummary product={product} price={price} />
      <br />
      <ProductChart chartData={chartData} />
      <br />
      <TransactionList
        transactions={transactions}
        showDelete={SHOWDELETE}
        // onDeleteClick={this.handleDelete}
      />
    </div>
  );
};

ProductForm.propTypes = {
  product: PropTypes.object.isRequired,
  price: PropTypes.object.isRequired,
  transactions: PropTypes.array.isRequired,
  showDelete: PropTypes.bool.isRequired,
  errors: PropTypes.object
};

export default ProductForm;
