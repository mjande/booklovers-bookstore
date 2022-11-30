import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import Book from "../Book";

describe("Book", () => {
  it("renders book with image, title, author", () => {
    const { container } = render(
      <Book title="Test Title" author="Test Author" image="#" />
    );

    const imageElement = screen.getByRole("img", { name: "Book cover" });
    const titleElement = screen.getByRole("heading", { name: "Test Title" });
    const authorElement = screen.getByRole("heading", {
      name: "by Test Author",
    });

    expect(imageElement).toBeInTheDocument();
    expect(titleElement).toBeInTheDocument();
    expect(authorElement).toBeInTheDocument();

    expect(container).toMatchSnapshot();
  });
});
