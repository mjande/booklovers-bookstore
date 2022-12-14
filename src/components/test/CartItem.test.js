import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import CartItem from "../CartItem";

describe("CartItem", () => {
  it("renders with title, author, quantity, price, and total price", () => {
    const book = {
      title: "Test Book",
      author: "Test Author",
      quantity: 2,
      price: 10,
      coverSrc: "#",
    };

    render(
      <table>
        <tbody>
          <CartItem book={book} />
        </tbody>
      </table>
    );

    const coverElement = screen.getByRole("img");
    expect(coverElement).toBeInTheDocument();

    const titleElement = screen.getByTestId("item-title");
    expect(titleElement.textContent).toBe("Test Book");

    const authorElement = screen.getByTestId("item-author");
    expect(authorElement.textContent).toBe("Test Author");

    const quantityElement = screen.getByTestId("item-quantity");
    expect(quantityElement.value).toBe("2");

    const priceElement = screen.getByTestId("item-price");
    expect(priceElement.textContent).toBe("$10.00");

    const totalPrice = screen.getByTestId("item-total-price");
    expect(totalPrice.textContent).toBe("$20.00");
  });
});
