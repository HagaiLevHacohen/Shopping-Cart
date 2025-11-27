import { Outlet, Link, useOutletContext, useNavigate } from "react-router";
import PropTypes from "prop-types";
import styles from "../styles/Cart.module.css";
import OrderCard from "./OrderCard";

function Cart() {
  const [itemsList, cartItems, setCartItems] = useOutletContext();
  const navigate = useNavigate();
  const itemsCounter = Object.values(cartItems).reduce(
    (sum, qty) => sum + qty,
    0,
  );
  const isCartEmpty = itemsCounter == 0;

  let subtotal = 0;
  for (const [key, value] of Object.entries(cartItems)) {
    subtotal += itemsList.find((item) => item.id == key).price * value;
  }
  subtotal = Number(subtotal.toFixed(2));

  const shipping = subtotal >= 50 ? 0 : 20;
  const tax = Number((subtotal * 0.1).toFixed(2));

  const total = Number((subtotal + shipping + tax).toFixed(2));

  return (
    <div className={styles.cart}>
      <h2 className={styles.title}>Shopping Cart</h2>
      {isCartEmpty ? (
        <div className={styles.cartEmptyContainer}>
          <p>Your cart is empty!</p>
          <button onClick={() => navigate("/Shop")}>Continue Shopping</button>
        </div>
      ) : (
        <div className={styles.orderContainer}>
          <div className={styles.orderProducts}>
            {itemsList.map((item) =>
              item.id in cartItems ? (
                <OrderCard
                  key={item.id}
                  image={item.image}
                  title={item.title}
                  price={item.price}
                  amount={cartItems[item.id]}
                  SetAmount={(amount) =>
                    setCartItems({ ...cartItems, [item.id]: amount })
                  }
                  handleRemove={() => {
                    const copy = { ...cartItems };
                    delete copy[item.id];
                    setCartItems(copy);
                  }}
                ></OrderCard>
              ) : (
                ""
              ),
            )}
          </div>

          <div className={styles.orderSummary}>
            <h3>Order Summary</h3>
            <div className={styles.summaryItem}>
              <p>Subtotal:</p>
              <p>${subtotal}</p>
            </div>
            <div className={styles.summaryItem}>
              <p>Shipping:</p>
              <p>{shipping == 0 ? "Free" : `$${shipping}`}</p>
            </div>
            <div className={styles.summaryItem}>
              <p>Tax:</p>
              <p>${tax}</p>
            </div>
            <div className={`${styles.summaryItem} ${styles.summaryTotal}`}>
              <p>Total:</p>
              <p>${total}</p>
            </div>
            <button className={styles.checkoutBtn}>Proceed to Checkout</button>
            <button
              className={styles.continueShoppingBtn}
              onClick={() => navigate("/Shop")}
            >
              Continue Shopping
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default Cart;
