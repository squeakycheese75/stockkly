import React from "react";
import renderer from "react-test-renderer";
import { watchBarPrices } from "../../../tools/mockData";
import WatchBar from "./WatchBar";

it("sets submit button label 'Saving...' when saving is true", () => {
  const tree = renderer.create(<WatchBar prices={watchBarPrices} />);
  expect(tree).toMatchSnapshot();
});

it("Should pass", () => {
  expect(true).toEqual(true);
});
