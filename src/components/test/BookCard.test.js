import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import BookCard from "../BookCard";
import userEvent from "@testing-library/user-event";

describe("BookCard", () => {
  const book = {
    key: "0",
    title: "Test Title",
    authors: [{ name: "Test Author" }],
    cover_edition_key: "0",
  };

  it("renders book with image, title, author, and add to cart button", () => {
    render(<BookCard book={book} isInCart={jest.fn()} />);

    const imageElement = screen.getByRole("img", { name: "Book cover" });
    const titleElement = screen.getByRole("heading", { name: "Test Title" });
    const authorElement = screen.getByRole("heading", {
      name: "by Test Author",
    });
    const buttonElement = screen.getByRole("button", { name: "Add to Cart" });

    expect(imageElement).toBeInTheDocument();
    expect(titleElement).toBeInTheDocument();
    expect(authorElement).toBeInTheDocument();
    expect(buttonElement).toBeInTheDocument();
  });

  it("calls addToCart and changes styles when clicking Add To Cart button", async () => {
    const addToCartMock = jest.fn();

    render(
      <BookCard book={book} addToCart={addToCartMock} isInCart={jest.fn()} />
    );

    let button = screen.getByRole("button", { name: "Add to Cart" });

    userEvent.click(button);

    expect(addToCartMock.mock.calls.length).toBe(1);

    button = await screen.findByRole("button", { name: "Remove from Cart" });
    expect(button).toBeInTheDocument();
    expect(button).toHaveClass("in-cart");
  });

  it("calls removeFromCart and changes styles when clicking Remove from Cart button", async () => {
    const removeFromCartMock = jest.fn();
    const addToCartMock = jest.fn();
    const isInCartMock = jest.fn().mockReturnValue(true);

    render(
      <BookCard
        book={book}
        addToCart={addToCartMock}
        removeFromCart={removeFromCartMock}
        isInCart={isInCartMock}
      />
    );

    let button = screen.getByRole("button", { name: "Remove from Cart" });
    userEvent.click(button);

    expect(removeFromCartMock.mock.calls.length).toBe(1);

    button = await screen.findByRole("button", { name: "Add to Cart" });
    expect(button).toBeInTheDocument();
    expect(button).toHaveClass("not-in-cart");
  });
});
