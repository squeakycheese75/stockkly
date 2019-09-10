// import React from "react";
// import React from "react";
import { cleanup, render } from "@testing-library/react";
import TransactionForm from "./TransactionForm";
import React from "react";
// import { cleanup, render } from "react-testing-library";
// import CourseForm from "./CourseForm";

afterEach(cleanup);

function renderTransactionForm(args) {
  let defaultProps = {
    products: [],
    transaction: {},
    saving: false,
    errors: {},
    onSave: () => {},
    onChange: () => {}
  };

  const props = { ...defaultProps, ...args };
  return render(<TransactionForm {...props} />);
  //   return render(<CourseForm {...props} />);
  //   const { getByText, getByTestId } = render(<Fetch url={url} />);
}

it("should render Add Transaction header", () => {
  const { getByText } = renderTransactionForm();
  getByText("Add Transaction");
});

it('should label save button as "Save" when not saving', () => {
  const { getByText } = renderTransactionForm();
  getByText("Save");
});

it('should label save button as "Saving..." when saving', () => {
  const { getByText, debug } = renderTransactionForm({ saving: true });
  // debug();
  getByText("Saving...");
});
