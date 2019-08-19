import React from "react";
import PropTypes from "prop-types";
import TextInput from "../common/TextInput";
import SelectInput from "../common/SelectInput";
import NumberInput from "../common/NumberInput";
import DateInput from "../common/DateInput";

const ttype = [
  {
    value: "Buy",
    text: "Buy"
  },
  {
    value: "Sell",
    text: "Sell"
  }
];

const TransactionForm = ({
  transaction,
  products,
  onSave,
  onChange,
  saving = false,
  errors = {}
}) => {
  return (
    <form onSubmit={onSave}>
      <h2>{transaction.id ? "Edit" : "Add"} transaction</h2>
      {errors.onSave && (
        <div className="alert alert-danger" role="alert">
          {errors.onSave}
        </div>
      )}
      <TextInput
        name="title"
        label="Title"
        value={transaction.title}
        onChange={onChange}
        error={errors.title}
      />

      <SelectInput
        name="productId"
        label="Product"
        value={transaction.productId || ""}
        defaultOption="Select product"
        options={products.map(product => ({
          value: product.id,
          text: product.name
        }))}
        onChange={onChange}
        error={errors.product}
      />

      <SelectInput
        name="type"
        label="Type"
        value={transaction.type || ""}
        defaultOption="Select transaction type"
        options={ttype}
        onChange={onChange}
        error={errors.type}
      />

      <DateInput
        name="trandate"
        label="Date"
        value={transaction.trandate || ""}
        onChange={onChange}
        error={errors.trandate}
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
    </form>
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
