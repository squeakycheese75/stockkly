import React from "react";
import TransactionForm from "./TransactionForm";
import renderer from "react-test-renderer";
import { transactions, products } from "../../../tools/mockData";

it("sets submit button label 'Saving...' when saving is true", () => {
  const tree = renderer.create(
    <TransactionForm
      transaction={transactions[0]}
      products={products}
      onSave={jest.fn()}
      onChange={jest.fn()}
      saving
    />
  );

  expect(tree).toMatchSnapshot();
});

it("sets submit button label 'Save' when saving is false", () => {
  const tree = renderer.create(
    <TransactionForm
      transaction={transactions[0]}
      products={products}
      onSave={jest.fn()}
      onChange={jest.fn()}
      saving={false}
    />
  );

  expect(tree).toMatchSnapshot();
});
