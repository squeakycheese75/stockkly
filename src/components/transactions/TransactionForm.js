import React from "react";
import PropTypes from "prop-types";
import TextInput from "../common/TextInput";
import SelectInput from "../common/SelectInput";
import NumberInput from "../common/NumberInput";
import DateInput from "../common/DateInput";
// import { Container } from "react-bootstrap";
import styles from "./TransactionForm.css";
// import { Container } from "react-bootstrap";

const ttype = [
  {
    value: "BUY",
    text: "Buy"
  },
  {
    value: "SELL",
    text: "Sell"
  }
];

const TransactionForm = ({
  transaction,
  products,
  onSave,
  onChange,
  saving = false,
  cancel,
  errors = {}
}) => {
  return (
    // <Container className="App">
    <>
      <br></br>
      <div className={styles} style={{ style: "background-color : #fff" }}>
        {/* <Container className="App"> */}
        <form onSubmit={onSave} className="form">
          <h2>{transaction.id ? "Edit" : "Add"} transaction</h2>
          {errors.onSave && (
            <div className="alert alert-danger" role="alert">
              {errors.onSave}
            </div>
          )}
          <SelectInput
            name="ticker"
            label="Product"
            value={transaction.ticker || ""}
            defaultOption="Select product"
            options={products.map(product => ({
              value: product.ticker,
              text: product.name
            }))}
            onChange={onChange}
            error={errors.ticker}
          />

          <SelectInput
            name="type"
            label="Type"
            value={transaction.transtype || ""}
            defaultOption="Select transaction type"
            options={ttype}
            onChange={onChange}
            error={errors.type}
          />

          <TextInput
            name="details"
            label="Details"
            onChange={onChange}
            value={transaction.details || ""}
            error={errors.details}
          />

          <DateInput
            name="transdate"
            label="Date"
            value={transaction.transdate || ""}
            onChange={onChange}
            error={errors.transdate}
          />

          <NumberInput
            name="quantity"
            label="Quantity"
            value={transaction.quantity}
            onChange={onChange}
            error={errors.quantity}
          />

          <button type="submit" disabled={saving} className="btn btn-primary">
            {saving ? "Saving..." : "Save"}
          </button>
          <button
            type="button"
            disabled={saving}
            className="btn btn-outline-danger"
            onClick={cancel}
            value="cancel"
          >
            Cancel
          </button>
        </form>
      </div>
    </>
  );
};

TransactionForm.propTypes = {
  products: PropTypes.array.isRequired,
  transaction: PropTypes.object.isRequired,
  errors: PropTypes.object,
  onSave: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired,
  saving: PropTypes.bool
};

export default TransactionForm;
