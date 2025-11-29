import { render, screen, fireEvent } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { vi, describe, test, expect, beforeEach, afterEach } from "vitest";
import Card from "../components/Card";

// Mock getBoundingClientRect for animation calculations
const mockRect = (x, y, width = 100, height = 100) => ({
  left: x,
  top: y,
  width,
  height,
  right: x + width,
  bottom: y + height,
});

describe("Card Component", () => {
  let handleAddToCart;

  beforeEach(() => {
    handleAddToCart = vi.fn();

    // Create mock basket icon in DOM
    const basket = document.createElement("div");
    basket.setAttribute("id", "basket-icon");
    document.body.appendChild(basket);

    // Mock rect for basket
    basket.getBoundingClientRect = vi.fn(() => mockRect(500, 100));
  });

  afterEach(() => {
    document.body.innerHTML = "";
  });

  function setup() {
    const utils = render(
      <Card
        title="Test Item"
        image="/test.png"
        price={9.99}
        handleAddToCart={handleAddToCart}
      />
    );

    const card = utils.container.firstChild;
    // Mock card getBoundingClientRect
    card.getBoundingClientRect = vi.fn(() => mockRect(100, 100));

    return { ...utils, card };
  }

  // -----------------------------------------------------------
  // RENDER TEST
  // -----------------------------------------------------------
  test("renders title, image, and price", () => {
    setup();

    expect(screen.getByText("Test Item")).toBeInTheDocument();
    expect(screen.getByRole("img")).toHaveAttribute("src", "/test.png");
    expect(screen.getByText("$9.99")).toBeInTheDocument();
  });

  // -----------------------------------------------------------
  // INPUT BUTTONS
  // -----------------------------------------------------------
  test("increments and decrements input value", async () => {
    setup();
    const user = userEvent.setup();

    const input = screen.getByRole("spinbutton");
    const btnAdd = screen.getByText("+");
    const btnSub = screen.getByText("-");

    expect(input.value).toBe("1");

    await user.click(btnAdd);
    expect(input.value).toBe("2");

    await user.click(btnSub);
    expect(input.value).toBe("1");

    // stays at minimum 1
    await user.click(btnSub);
    expect(input.value).toBe("1");
  });

  // -----------------------------------------------------------
  // TYPING IN THE INPUT FIELD
  // -----------------------------------------------------------
  test("allows manual input change", async () => {
    setup();
    const user = userEvent.setup();

    const input = screen.getByRole("spinbutton");

    await user.clear(input);
    await user.type(input, "5");

    expect(input.value).toBe("5");
  });

  // -----------------------------------------------------------
  // ADD TO CART
  // -----------------------------------------------------------
  test("calls handleAddToCart with correct quantity", async () => {
    setup();
    const user = userEvent.setup();

    const input = screen.getByRole("spinbutton");
    await user.clear(input);
    await user.type(input, "3");

    await user.click(screen.getByText("Add to Cart"));

    expect(handleAddToCart).toHaveBeenCalledWith(3);
  });

  // -----------------------------------------------------------
  // ANIMATION TRIGGER
  // -----------------------------------------------------------
  test("adds animation class and resets after animation ends", async () => {
    const { card } = setup();
    const user = userEvent.setup();

    const addButton = screen.getByText("Add to Cart");

    // Before clicking
    expect(card.className).not.toMatch(/animate/);

    await user.click(addButton);

    // After clicking: animation should be applied
    expect(card.className).toMatch(/animate/);

    // Fire animation end event
    fireEvent.animationEnd(card);

    // Should remove animation class
    expect(card.className).not.toMatch(/animate/);
  });
});