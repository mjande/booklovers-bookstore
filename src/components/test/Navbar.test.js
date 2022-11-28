import React from "react";
import { render } from "@testing-library/react";
import Navbar from "../Navbar";

describe("Navbar", () => {
  it("renders navbar without errors", () => {
    const { container } = render(<Navbar />);
    expect(container).toMatchSnapshot();
  });
});
