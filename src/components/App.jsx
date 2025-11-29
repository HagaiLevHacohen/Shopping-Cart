import { useState, useEffect } from "react";
import PropTypes from "prop-types";
import styles from "../styles/App.module.css";
import { Outlet, Link } from "react-router";
import Spinner from "./Spinner";

const useItems = () => {
  const [itemsList, setItemsList] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("https://fakestoreapi.com/products", {})
      .then((response) => {
        if (!response.ok) {
          throw new Error("server error");
        }
        return response.json();
      })
      .then((response) => setItemsList(response))
      .catch((error) => setError(error))
      .finally(() => setLoading(false));
  }, []);

  return { itemsList, error, loading };
};

function App() {
  const { itemsList, error, loading } = useItems();
  const [cartItems, setCartItems] = useState({}); // Stores a mapping from Id to the amount

  const itemsCounter = Object.values(cartItems).reduce(
    (sum, qty) => sum + qty,
    0,
  );

  return (
    <>
      <header className={styles.header}>
        <h1 className={styles.title}>Shoppary</h1>
        <nav className={styles.nav}>
          <Link to="/" className={styles.link}>
            Home
          </Link>
          <Link to="Shop" className={styles.link}>
            Shop
          </Link>
          <Link to="Cart" className={`${styles.link} ${styles.cartLink}`}>
            Cart
            <div
              id="basket-icon"
              className={`${styles.cartCounter} ${itemsCounter === 0 ? styles.invisible : ""}`}
            >
              {itemsCounter}
            </div>
          </Link>
        </nav>
      </header>
      <main className={styles.main}>
        {loading ? (
          <div className={styles.spinnerContainer}>
            <Spinner />
          </div>
        ) : error ? (
          <p>A network error was encountered</p>
        ) : (
          <Outlet context={[itemsList, cartItems, setCartItems]} />
        )}
      </main>
    </>
  );
}

export default App;
