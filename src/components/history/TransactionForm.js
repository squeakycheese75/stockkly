import React from "react";
import PropTypes from "prop-types";
import TextInput from "../common/TextInput";
import SelectInput from "../common/SelectInput";

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
        label="product"
        value={transaction.productId || ""}
        defaultOption="Select product"
        options={products.map(product => ({
          value: product.id,
          text: product.name
        }))}
        onChange={onChange}
        error={errors.product}
      />

      <TextInput
        name="category"
        label="Category"
        value={transaction.category}
        onChange={onChange}
        error={errors.category}
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
