import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, test, expect, vi } from "vitest";
import OrderCard from "../components/OrderCard";

describe("OrderCard Component", () => {
  function setup(props = {}) {
    const defaultProps = {
      title: "Sample Item",
      image: "/sample.png",
      price: 10,
      amount: 2,
      SetAmount: vi.fn(),
      handleRemove: vi.fn(),
    };

    const utils = render(<OrderCard {...defaultProps} {...props} />);
    return { ...utils, props: { ...defaultProps, ...props } };
  }

  // -----------------------------------------------------------
  // RENDERING
  // -----------------------------------------------------------
  test("renders product info correctly", () => {
    setup();

    expect(screen.getByRole("img", { name: "Sample Item" })).toHaveAttribute(
      "src",
      "/sample.png"
    );

    expect(screen.getByText("Sample Item")).toBeInTheDocument();
    expect(screen.getByText("$10")).toBeInTheDocument();

    expect(screen.getByText("Total: $20.00")).toBeInTheDocument();
  });

  // -----------------------------------------------------------
  // REMOVE BUTTON
  // -----------------------------------------------------------
  test("calls handleRemove when clicking the Remove button", async () => {
    const { props } = setup();
    const user = userEvent.setup();

    await user.click(screen.getByRole("button", { name: "Remove" }));

    expect(props.handleRemove).toHaveBeenCalledTimes(1);
  });

  // -----------------------------------------------------------
  // SUBTRACT BUTTON
  // -----------------------------------------------------------
  test("subtract button decreases amount when > 1", async () => {
    const { props } = setup({ amount: 3 });
    const user = userEvent.setup();

    const subtractBtn = screen.getByRole("button", { name: "-" });

    await user.click(subtractBtn);

    expect(props.SetAmount).toHaveBeenCalledWith(2);
    expect(props.handleRemove).not.toHaveBeenCalled();
  });

  test("subtract button removes item when amount is 1", async () => {
    const { props } = setup({ amount: 1 });
    const user = userEvent.setup();

    const subtractBtn = screen.getByRole("button", { name: "-" });

    await user.click(subtractBtn);

    expect(props.handleRemove).toHaveBeenCalled();
    expect(props.SetAmount).not.toHaveBeenCalled();
  });

  // -----------------------------------------------------------
  // ADD BUTTON
  // -----------------------------------------------------------
  test("add button increases amount", async () => {
    const { props } = setup({ amount: 2 });
    const user = userEvent.setup();

    const addBtn = screen.getByRole("button", { name: "+" });

    await user.click(addBtn);

    expect(props.SetAmount).toHaveBeenCalledWith(3);
  });

  // -----------------------------------------------------------
  // INPUT FIELD
  // -----------------------------------------------------------
  test("typing a new number updates SetAmount", async () => {
    const { props } = setup({ amount: 0 });
    const user = userEvent.setup();

    const input = screen.getByRole("spinbutton");

    await user.clear(input);
    await user.type(input, "5");

    expect(props.SetAmount).toHaveBeenCalledWith(5);
  });

  test("typing 0 triggers handleRemove", async () => {
    const { props } = setup({ amount: 2 });
    const user = userEvent.setup();

    const input = screen.getByRole("spinbutton");

    await user.clear(input);
    await user.type(input, "0");

    expect(props.handleRemove).toHaveBeenCalled();
    expect(props.SetAmount).not.toHaveBeenCalledWith(0);
  });

  // -----------------------------------------------------------
  // TOTAL PRICE
  // -----------------------------------------------------------
  test("displays correct total price", () => {
    setup({ price: 12.5, amount: 3 });

    expect(screen.getByText("Total: $37.50")).toBeInTheDocument();
  });
});
